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

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

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

function overlaySvg(team) {
  const primary = escapeXml(team.primary);
  const secondary = escapeXml(team.secondary);
  const accent = escapeXml(team.accent);
  const label = escapeXml(team.abbreviation);

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <linearGradient id="team-wash" x1="0%" y1="10%" x2="100%" y2="86%">
          <stop offset="0%" stop-color="${primary}" stop-opacity="0.34"/>
          <stop offset="50%" stop-color="${secondary}" stop-opacity="0.26"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.18"/>
        </linearGradient>
        <linearGradient id="ice-scrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42"/>
          <stop offset="42%" stop-color="#ffffff" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="corner-glow" cx="86%" cy="24%" r="64%">
          <stop offset="0%" stop-color="${secondary}" stop-opacity="0.36"/>
          <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="ice-grid" width="116" height="116" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path d="M0 58H116 M58 0V116" stroke="${accent}" stroke-width="2" stroke-opacity="0.13"/>
        </pattern>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#team-wash)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#corner-glow)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ice-grid)" opacity="0.35"/>
      <path d="M1090-120c216 94 383 266 502 516 84 178 126 356 126 534l-360 112c25-228-11-432-108-612-86-160-214-286-382-378z" fill="${primary}" opacity="0.44"/>
      <path d="M1296-34c152 87 268 216 346 386 53 115 81 233 85 354" fill="none" stroke="${secondary}" stroke-width="54" stroke-linecap="round" opacity="0.62"/>
      <path d="M116 790c196-69 380-93 552-72 134 17 264 54 390 113" fill="none" stroke="${primary}" stroke-width="66" stroke-linecap="round" opacity="0.34"/>
      <path d="M90 874c184-56 356-68 516-36" fill="none" stroke="${secondary}" stroke-width="24" stroke-linecap="round" opacity="0.72"/>
      <circle cx="486" cy="810" r="146" fill="none" stroke="${accent}" stroke-width="8" opacity="0.18"/>
      <circle cx="486" cy="810" r="54" fill="none" stroke="${secondary}" stroke-width="10" opacity="0.22"/>
      <g opacity="0.12" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="124" font-weight="800" letter-spacing="8">
        <text x="111" y="209">${label}</text>
      </g>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ice-scrim)"/>
    </svg>
  `);
}

async function writeHero(team) {
  await sharp(HERO_SOURCE)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.98, saturation: 0.72 })
    .composite([
      { input: overlaySvg(team), blend: 'over' }
    ])
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(OUTPUT_DIR, `${team.id}.webp`));
}

const teamSource = await fs.readFile(TEAM_SOURCE, 'utf8');
const teams = [defaultTheme, ...readTeams(teamSource)];

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await Promise.all(teams.map(writeHero));

console.log(`Generated ${teams.length} team hero images in ${path.relative(ROOT, OUTPUT_DIR)}`);
