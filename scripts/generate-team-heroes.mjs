import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const TEAM_SOURCE = path.join(ROOT, 'src/data/nhlTeams.ts');
const HERO_SOURCE = path.join(ROOT, 'public/images/heroes/premium-ice.webp');
const OUTPUT_DIR = path.join(ROOT, 'public/images/team-heroes');
const WIDTH = 1800;
const HEIGHT = 1050;

const defaultTheme = {
  id: 'default',
  name: 'Penguinscape Default',
  abbreviation: 'DEFAULT',
  primary: '#111111',
  secondary: '#f2c500',
  accent: '#ffffff'
};

function readTeams(source) {
  const teamRegex = /\{\s*id: '([^']+)'.*?name: '([^']+)'.*?abbreviation: '([^']+)'.*?primary: '([^']+)'.*?secondary: '([^']+)'.*?accent: '([^']+)'/gs;
  return Array.from(source.matchAll(teamRegex), ([, id, name, abbreviation, primary, secondary, accent]) => ({
    id,
    name,
    abbreviation,
    primary,
    secondary,
    accent
  }));
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16)
  };
}

function mixChannel(source, target, strength) {
  return Math.round(source * (1 - strength) + target * strength);
}

function tintPixel(data, offset, color, strength, lightBoost = 0) {
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const luma = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
  const shade = Math.max(0.24, Math.min(1.28, luma + lightBoost));

  data[offset] = mixChannel(r, Math.min(255, color.r * shade), strength);
  data[offset + 1] = mixChannel(g, Math.min(255, color.g * shade), strength);
  data[offset + 2] = mixChannel(b, Math.min(255, color.b * shade), strength);
}

function pointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const xi = points[i][0];
    const yi = points[i][1];
    const xj = points[j][0];
    const yj = points[j][1];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function isInUniformZone(x, y) {
  const torso = pointInPolygon(x, y, [[1302, 96], [1488, 76], [1608, 214], [1534, 368], [1340, 354], [1228, 218]]);
  const leadArm = pointInPolygon(x, y, [[1060, 238], [1310, 220], [1410, 326], [1160, 392]]);
  const backArm = pointInPolygon(x, y, [[1518, 130], [1660, 164], [1628, 326], [1538, 286]]);
  const leftLeg = pointInPolygon(x, y, [[1310, 380], [1484, 430], [1432, 642], [1212, 560]]);
  const rightLeg = pointInPolygon(x, y, [[1505, 360], [1718, 428], [1668, 648], [1450, 535]]);
  const helmet = ((x - 1414) / 86) ** 2 + ((y - 80) / 70) ** 2 < 1;
  const glove = ((x - 1215) / 82) ** 2 + ((y - 330) / 72) ** 2 < 1;
  return torso || leadArm || backArm || leftLeg || rightLeg || helmet || glove;
}

function isOriginalGold(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return r > 118 && g > 78 && b < 96 && max - min > 38 && r >= g * 0.82;
}

function isOriginalDarkUniform(r, g, b) {
  const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const channelSpread = Math.max(r, g, b) - Math.min(r, g, b);
  return luma < 116 && channelSpread < 82;
}

function isUniformWhite(r, g, b) {
  const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;
  return luma > 160 && Math.max(r, g, b) - Math.min(r, g, b) < 54;
}

async function createUniformVariant(team, baseBuffer) {
  const primary = hexToRgb(team.primary);
  const secondary = hexToRgb(team.secondary);
  const accent = hexToRgb(team.accent);
  const image = Buffer.from(baseBuffer);

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (!isInUniformZone(x, y)) continue;
      const offset = (y * WIDTH + x) * 4;
      const r = image[offset];
      const g = image[offset + 1];
      const b = image[offset + 2];

      if (isOriginalGold(r, g, b)) {
        tintPixel(image, offset, secondary, 0.94, 0.14);
      } else if (isOriginalDarkUniform(r, g, b)) {
        tintPixel(image, offset, primary, 0.84, 0.05);
      } else if (isUniformWhite(r, g, b)) {
        tintPixel(image, offset, accent, 0.38, 0.04);
      }
    }
  }

  await sharp(image, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .webp({ quality: 86, effort: 5 })
    .toFile(path.join(OUTPUT_DIR, `${team.id}.webp`));
}

const teamSource = await fs.readFile(TEAM_SOURCE, 'utf8');
const teams = [defaultTheme, ...readTeams(teamSource)];
const baseBuffer = await sharp(HERO_SOURCE)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
  .ensureAlpha()
  .raw()
  .toBuffer();

await fs.mkdir(OUTPUT_DIR, { recursive: true });
for (const team of teams) {
  await createUniformVariant(team, baseBuffer);
}

console.log(`Generated ${teams.length} jersey-recolored hero images in ${path.relative(ROOT, OUTPUT_DIR)}`);
