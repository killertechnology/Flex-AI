import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import products from '../data/products.json' assert { type: 'json' };

const root = process.cwd();
const productDir = path.join(root, 'public/images/products');
const categoryDir = path.join(root, 'public/images/categories');
const heroDir = path.join(root, 'public/images/heroes');
const serviceDir = path.join(root, 'public/images/services');

await Promise.all([productDir, categoryDir, heroDir, serviceDir].map((dir) => fs.mkdir(dir, { recursive: true })));

const palette = {
  ice: '#d7edf4',
  ink: '#182026',
  steel: '#7d8c94',
  blue: '#316d8f',
  red: '#b42b37',
  gold: '#c89b4f',
  white: '#f8fbfc',
  black: '#111315',
  navy: '#1c3554',
  plum: '#6d466f',
  mint: '#7ac6b8'
};

function slugFromImage(imagePath) {
  return path.basename(imagePath, '.webp');
}

function productSvg(product, imagePath, index) {
  const slug = slugFromImage(imagePath);
  const category = product.subcategory.toLowerCase();
  const accent = product.department === 'Figure Skating' ? palette.plum : product.department === 'Goalie' ? palette.red : product.department === 'Services' ? palette.gold : palette.blue;
  const title = product.title.replace(/&/g, '&amp;');
  const shape = category.includes('stick')
    ? stickShape(accent)
    : category.includes('helmet') || category.includes('mask')
      ? helmetShape(accent)
      : category.includes('glove')
        ? gloveShape(accent)
        : category.includes('pads') || category.includes('shoulder')
          ? padShape(accent)
          : category.includes('boot')
            ? bootShape(accent, false)
            : category.includes('skate')
              ? bootShape(accent, true)
              : category.includes('blade')
                ? bladeShape(accent)
                : category.includes('apparel') || category.includes('hood')
                  ? apparelShape(accent)
                  : category.includes('bag')
                    ? bagShape(accent)
                    : category.includes('tape')
                      ? tapeShape(accent)
                      : serviceShape(accent);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1100" viewBox="0 0 1400 1100">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="0.55" stop-color="#f2f6f8"/>
        <stop offset="1" stop-color="#e5edf1"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="32" stdDeviation="28" flood-color="#111827" flood-opacity="0.18"/>
      </filter>
      <linearGradient id="metal" x1="0" x2="1">
        <stop offset="0" stop-color="#dde7ec"/><stop offset="0.5" stop-color="#8a9ba5"/><stop offset="1" stop-color="#f7fafc"/>
      </linearGradient>
    </defs>
    <rect width="1400" height="1100" fill="url(#bg)"/>
    <ellipse cx="700" cy="890" rx="390" ry="62" fill="#20272d" opacity="0.1"/>
    <g filter="url(#shadow)" transform="translate(${index % 2 ? 25 : 0} ${index === 2 ? -12 : 0})">${shape}</g>
  </svg>`;
}

function bootShape(accent, hasBlade) {
  return `<g transform="translate(330 250)">
    <path d="M260 85 C390 40 540 85 610 180 C690 288 650 448 560 520 C455 604 270 600 170 515 C84 442 72 298 130 200 C160 150 205 112 260 85Z" fill="#161b21"/>
    <path d="M270 120 C380 92 505 124 555 200 C612 287 570 404 502 456 C425 514 286 512 213 450 C154 399 145 296 187 222 C209 178 236 144 270 120Z" fill="${accent}" opacity="0.9"/>
    <path d="M298 154 C383 138 474 164 508 222 C548 291 514 369 461 405 C406 444 310 444 258 400 C216 365 210 293 242 238 C257 208 275 178 298 154Z" fill="#f7fbfd" opacity="0.92"/>
    <path d="M558 433 C670 440 779 492 858 574 C890 607 885 642 840 652 L462 652 C382 650 324 618 288 558 C380 567 489 533 558 433Z" fill="#1d252d"/>
    <path d="M522 512 C640 521 720 560 789 613 L424 614 C390 614 360 604 335 584 C402 582 474 560 522 512Z" fill="${accent}" opacity="0.88"/>
    <g stroke="#f8fbfc" stroke-width="9" stroke-linecap="round" opacity="0.9">
      <path d="M288 220 L438 360"/><path d="M340 205 L474 332"/><path d="M255 278 L398 407"/>
    </g>
    ${hasBlade ? `<path d="M340 686 C500 710 690 704 870 672" stroke="url(#metal)" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M376 660 L376 710 M714 650 L714 695" stroke="#8da0a8" stroke-width="18" stroke-linecap="round"/>` : ''}
  </g>`;
}

function stickShape(accent) {
  return `<g transform="translate(250 220) rotate(-17 450 360)">
    <rect x="420" y="20" width="64" height="650" rx="18" fill="#15191d"/>
    <rect x="438" y="45" width="28" height="580" rx="10" fill="${accent}"/>
    <path d="M418 650 C530 704 638 760 765 816 C803 833 787 885 746 878 C610 856 501 800 390 728 C355 704 379 632 418 650Z" fill="#14181c"/>
    <path d="M455 698 C550 745 632 787 725 823" stroke="${accent}" stroke-width="22" stroke-linecap="round"/>
    <circle cx="452" cy="126" r="18" fill="#f7fafc" opacity="0.85"/>
  </g>`;
}

function gloveShape(accent) {
  return `<g transform="translate(260 280)">
    <g transform="rotate(-8 300 300)">
      <path d="M206 105 C294 38 425 60 505 135 C573 200 574 318 510 385 C433 466 286 469 206 392 C126 316 118 171 206 105Z" fill="#15191e"/>
      <path d="M234 138 C304 88 407 104 468 162 C520 212 520 303 470 354 C410 415 298 415 237 356 C178 300 174 188 234 138Z" fill="${accent}"/>
      <path d="M500 172 C610 190 674 270 654 366 C635 460 524 513 443 457 C515 393 548 283 500 172Z" fill="#1e252b"/>
      <rect x="154" y="360" width="250" height="122" rx="38" fill="#1e252b"/>
      <g stroke="#f8fbfc" stroke-width="10" stroke-linecap="round" opacity=".85"><path d="M260 150 L342 365"/><path d="M333 130 L386 354"/><path d="M407 160 L424 330"/></g>
    </g>
    <g transform="translate(425 90) rotate(12 300 300)" opacity=".96">
      <path d="M206 105 C294 38 425 60 505 135 C573 200 574 318 510 385 C433 466 286 469 206 392 C126 316 118 171 206 105Z" fill="#15191e"/>
      <path d="M234 138 C304 88 407 104 468 162 C520 212 520 303 470 354 C410 415 298 415 237 356 C178 300 174 188 234 138Z" fill="${accent}"/>
      <rect x="154" y="360" width="250" height="122" rx="38" fill="#1e252b"/>
    </g>
  </g>`;
}

function helmetShape(accent) {
  return `<g transform="translate(315 260)">
    <path d="M170 315 C155 175 254 70 414 70 C592 70 704 176 704 334 C704 412 659 484 590 520 L275 520 C213 480 178 414 170 315Z" fill="#15191e"/>
    <path d="M220 310 C210 198 290 118 420 118 C556 118 648 200 648 332 C648 389 615 436 560 462 L294 462 C248 432 225 382 220 310Z" fill="${accent}"/>
    <path d="M262 302 C270 225 330 174 424 174 C514 174 580 228 596 310 L262 302Z" fill="#f8fbfc" opacity=".9"/>
    <g stroke="#dce7ec" stroke-width="12" opacity=".95">
      <path d="M260 330 L615 330"/><path d="M286 382 L585 382"/><path d="M328 462 L328 330"/><path d="M410 462 L410 330"/><path d="M492 462 L492 330"/><path d="M574 442 L574 330"/>
    </g>
  </g>`;
}

function padShape(accent) {
  return `<g transform="translate(360 170)">
    <rect x="90" y="35" width="245" height="755" rx="66" fill="#f8fbfc"/>
    <rect x="382" y="35" width="245" height="755" rx="66" fill="#f8fbfc"/>
    <path d="M142 78 L292 78 L296 720 L126 720 Z" fill="${accent}" opacity=".9"/>
    <path d="M434 78 L584 78 L600 720 L430 720 Z" fill="${accent}" opacity=".9"/>
    <g stroke="#182026" stroke-width="18" opacity=".85"><path d="M208 90 L206 706"/><path d="M506 90 L508 706"/></g>
    <g stroke="#d6e1e7" stroke-width="14"><path d="M126 250 L298 250"/><path d="M428 250 L600 250"/><path d="M126 480 L298 480"/><path d="M428 480 L600 480"/></g>
  </g>`;
}

function bladeShape(accent) {
  return `<g transform="translate(235 420)">
    <path d="M110 250 C320 318 610 318 1010 202" stroke="url(#metal)" stroke-width="54" fill="none" stroke-linecap="round"/>
    <path d="M210 148 L840 92 L930 172 L304 228 Z" fill="#e7eef2"/>
    <path d="M260 146 L812 104" stroke="${accent}" stroke-width="22" stroke-linecap="round"/>
    <g fill="#9aaab2"><circle cx="344" cy="174" r="18"/><circle cx="548" cy="154" r="18"/><circle cx="750" cy="133" r="18"/></g>
  </g>`;
}

function apparelShape(accent) {
  return `<g transform="translate(430 170)">
    <path d="M170 72 C230 25 360 25 420 72 L560 145 L500 302 L440 275 L448 810 L142 810 L150 275 L90 302 L30 145 Z" fill="#15191e"/>
    <path d="M188 112 C242 82 348 82 402 112 L505 166 L470 248 L414 228 L420 760 L170 760 L176 228 L120 248 L85 166 Z" fill="${accent}"/>
    <path d="M246 83 C270 126 320 126 344 83" stroke="#f8fbfc" stroke-width="16" fill="none" opacity=".86"/>
  </g>`;
}

function bagShape(accent) {
  return `<g transform="translate(320 345)">
    <rect x="130" y="170" width="620" height="350" rx="70" fill="#15191e"/>
    <rect x="180" y="215" width="520" height="250" rx="46" fill="${accent}"/>
    <path d="M285 178 C300 72 580 72 596 178" stroke="#15191e" stroke-width="44" fill="none" stroke-linecap="round"/>
    <path d="M296 178 C320 112 558 112 584 178" stroke="#e6eef2" stroke-width="16" fill="none" opacity=".75"/>
    <path d="M440 215 L440 465" stroke="#f7fafc" stroke-width="14" opacity=".7"/>
  </g>`;
}

function tapeShape(accent) {
  return `<g transform="translate(330 300)">
    <g fill="#15191e"><ellipse cx="230" cy="180" rx="115" ry="70"/><rect x="115" y="180" width="230" height="180"/><ellipse cx="230" cy="360" rx="115" ry="70"/></g>
    <ellipse cx="230" cy="180" rx="72" ry="38" fill="#f8fbfc"/><ellipse cx="230" cy="180" rx="38" ry="18" fill="#dce7ec"/>
    <g transform="translate(260 80)"><ellipse cx="230" cy="180" rx="115" ry="70" fill="${accent}"/><rect x="115" y="180" width="230" height="180" fill="${accent}"/><ellipse cx="230" cy="360" rx="115" ry="70" fill="${accent}"/><ellipse cx="230" cy="180" rx="72" ry="38" fill="#f8fbfc"/><ellipse cx="230" cy="180" rx="38" ry="18" fill="#dce7ec"/></g>
    <path d="M650 435 C710 375 790 376 842 434 C780 490 704 490 650 435Z" fill="#f4efe6" stroke="#c89b4f" stroke-width="14"/>
  </g>`;
}

function serviceShape(accent) {
  return `<g transform="translate(300 310)">
    <rect x="120" y="430" width="660" height="92" rx="28" fill="#232a30"/>
    <path d="M170 370 C350 430 570 430 770 350" stroke="url(#metal)" stroke-width="36" fill="none" stroke-linecap="round"/>
    <path d="M290 120 L458 120 L500 420 L250 420 Z" fill="${accent}"/>
    <path d="M506 90 L640 150 L532 382 L416 335 Z" fill="#15191e"/>
    <g stroke="#f8fbfc" stroke-width="14"><path d="M320 170 L452 170"/><path d="M334 235 L466 235"/><path d="M348 300 L480 300"/></g>
  </g>`;
}

function categorySvg(name, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${accent}"/><stop offset="1" stop-color="#111827"/></linearGradient></defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="940" cy="160" r="220" fill="#ffffff" opacity=".12"/>
    <path d="M90 600 C300 520 520 620 760 508 C880 452 998 452 1110 492" stroke="#ffffff" stroke-width="26" opacity=".32" fill="none"/>
    <rect x="74" y="76" width="1052" height="648" rx="46" fill="#ffffff" opacity=".07"/>
    <text x="90" y="650" font-family="Inter, Arial, sans-serif" font-size="86" font-weight="800" fill="#ffffff">${name}</text>
  </svg>`;
}

function heroSvg(theme) {
  const settings = {
    'premium-ice': ['#eef8fb', '#d4edf4', '#25313a', 'BUILT FOR THE ICE'],
    'pro-shop': ['#0e1116', '#27313c', '#f4f7f9', 'GEAR UP'],
    'penguin-modern': ['#f6fbfd', '#8ed6d1', '#16242b', 'EVERYTHING FOR THE ICE'],
    'penguin-classic': ['#ffffff', '#f2c500', '#111111', 'GEAR UP']
  }[theme];
  const [a, b, text, label] = settings;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1050" viewBox="0 0 1800 1050">
    <defs><linearGradient id="hero" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="1800" height="1050" fill="url(#hero)"/>
    <path d="M0 810 C360 690 692 770 1010 662 C1300 562 1540 588 1800 650 L1800 1050 L0 1050Z" fill="${text}" opacity=".12"/>
    <g transform="translate(1070 220)" opacity=".86">${bootShape(theme === 'pro-shop' ? palette.red : theme === 'penguin-modern' ? palette.mint : theme === 'penguin-classic' ? palette.gold : palette.blue, true)}</g>
    <g transform="translate(1130 390) scale(.62)" opacity=".7">${stickShape(theme === 'pro-shop' ? palette.red : theme === 'penguin-classic' ? palette.gold : palette.blue)}</g>
    <text x="96" y="920" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="800" fill="${text}" opacity=".55">${label}</text>
  </svg>`;
}

async function writeWebp(filePath, svg, width = 1400) {
  await sharp(Buffer.from(svg)).resize({ width }).webp({ quality: 82 }).toFile(filePath);
}

for (const product of products) {
  for (const [index, image] of product.images.entries()) {
    if (image.includes('-official-') || image.includes('-source-')) continue;
    if (product.department === 'Services' && image.includes('service-')) continue;
    await writeWebp(path.join(root, 'public', image), productSvg(product, image, index), 1400);
  }
}

const categories = [
  ['hockey', 'Hockey', '#174d73'],
  ['figure-skating', 'Figure Skating', '#6d466f'],
  ['goalie', 'Goalie', '#9f2630'],
  ['skates', 'Skates', '#327f97'],
  ['accessories', 'Accessories', '#55706e'],
  ['apparel', 'Apparel', '#46505a'],
  ['skate-services', 'Skate Services', '#a97b2b']
];

if (process.env.REGENERATE_MARKETING_ASSETS === '1') {
  for (const [slug, label, accent] of categories) {
    await writeWebp(path.join(categoryDir, `${slug}.webp`), categorySvg(label, accent), 1200);
  }

  for (const theme of ['premium-ice', 'pro-shop', 'penguin-modern', 'penguin-classic']) {
    await writeWebp(path.join(heroDir, `${theme}.webp`), heroSvg(theme), 1800);
  }

  await writeWebp(path.join(serviceDir, 'skate-services.webp'), categorySvg('Service Bench', '#5f6f78'), 1200);
}

console.log(`Generated ${products.reduce((count, product) => count + product.images.length, 0)} product images, 7 category images, 4 hero images, and 1 service image.`);
