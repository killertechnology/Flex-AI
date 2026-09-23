import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const catalogPath = path.join(root, 'data/products.json');
const products = JSON.parse(await fs.readFile(catalogPath, 'utf8'));

const scene7 = (id) => `https://s7d2.scene7.com/is/image/CCM/${id}?wid=1400&fmt=png-alpha`;

const imageSources = {
  'bauer-vapor-flylite-skate-senior': {
    source: 'Bauer official product page',
    page: 'https://www.bauer.com/products/bauer-vapor-flylite-skate-senior',
    images: [
      'https://www.bauer.com/cdn/shop/files/1064920_BTH25_SKATE_VAPOR_FLYLITE_SR_catalog-pair-FlyTi.png?v=1750101292',
      'https://www.bauer.com/cdn/shop/files/1064920_BTH25_SKATE_VAPOR_FLYLITE_SR_rear-threequarter.png?v=1750101292'
    ]
  },
  'bauer-vapor-hyperlite-2-red-stick-senior': {
    source: 'Sports Excellence listing for Bauer product imagery',
    page: 'https://sportsexcellence.com/products/bauer-vapor-hyperlite-2-hockey-stick-red-senior',
    images: [
      'https://sportsexcellence.com/cdn/shop/files/VAPORHL2_B_RED_7da83545-e6cf-42b1-8888-187838e116a7.jpg?v=1750244456',
      'https://sportsexcellence.com/cdn/shop/files/VAPORHL2_B_RED-2_5c82f637-c3a1-4451-b658-389352416163.jpg?v=1750244456'
    ]
  },
  'warrior-covert-qr7-pro-senior-hockey-gloves': {
    source: 'Warrior official product page',
    page: 'https://www.warrior.com/en/product/qr7-pro-sr-glove',
    images: [
      'https://cdn.warrior.com/cdn-cgi/image/width=1400,quality=86,format=png,fit=contain/production/image/Products/Hockey/QR7PGJ6_BRD_A_2.png',
      'https://cdn.warrior.com/cdn-cgi/image/width=1400,quality=86,format=png,fit=contain/production/image/Products/Hockey/QR7PGJ6_BRD_A_1.png'
    ]
  },
  'ccm-tacks-720-helmet-senior': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Tacks-Helmets/HT720-SR.html',
    images: [scene7('HT720-RY')]
  },
  'ccm-jetspeed-ft8-pro-shoulder-pads-senior': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Protective/Shop-By-Collection/JetSpeed-Protective/SPFT8PRO-SR.html',
    images: [scene7('SPFT8PRO'), scene7('SPFT8PRO-SR_01')]
  },
  'ccm-eflex-7-9-goalie-pads-senior': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Goalie/Shop-All-Goalie/EFLEX/GPE7.9-SR.html',
    images: [scene7('GPE7.9-WH.WH.WH.WH'), scene7('GPE7.9-SR-WWWW_01')]
  },
  'ccm-eflex-7-goalie-glove-senior': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Goalie/Shop-All-Goalie/EFLEX/GMEFX7-SR.html',
    images: [scene7('GMEFX7-WH.WH.WH.WH'), scene7('GMEFX7TPSP-SR-WWWW_01')]
  },
  'jackson-ultima-freestyle-fusion-fs2192-figure-skates': {
    source: 'Jackson Ultima official product page',
    page: 'https://jacksonultima.com/products/freestyle-2192',
    images: [
      'https://jacksonultima.com/cdn/shop/files/FS2192-AngleOut.jpg?v=1750105502',
      'https://jacksonultima.com/cdn/shop/files/FS2192-Outside.jpg?v=1750105502'
    ]
  },
  'edea-ice-fly-figure-skating-boot': {
    source: 'Skates US Edea product page',
    page: 'https://skatesus.com/product/edea-ice-fly-figure-skating-boot/',
    images: ['https://skatesus.com/wp-content/uploads/2023/03/EDEA-Ice-Fly-Ice-Boot.webp']
  },
  'jackson-ultima-matrix-legacy-figure-skate-blades': {
    source: 'Jackson Ultima official product page',
    page: 'https://jacksonultima.com/products/matrix-legacy-1',
    images: [
      'https://jacksonultima.com/cdn/shop/files/Matrix-silver-legacy-0.png?v=1752517913',
      'https://jacksonultima.com/cdn/shop/products/MatrixLegacyLilac.jpg?v=1752517913'
    ]
  },
  'bauer-elite-carry-bag-senior-s24': {
    source: 'Bauer official product page',
    page: 'https://www.bauer.com/products/bauer-elite-carry-bag-s24',
    images: ['https://www.bauer.com/cdn/shop/files/bauerelitecarrybagsenior__black_1.png?v=1721154582']
  },
  'ccm-waxed-molded-tip-laces': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Accessories/683978009574.html',
    images: [scene7('LWXLACE-WH.BK'), scene7('LWXLACE-01')]
  },
  'ccm-canada-hoodie-adult': {
    source: 'CCM official product page',
    page: 'https://us.ccmhockey.com/Apparel/Apparel/Men%27s/FHO26CA-AD.html',
    images: [scene7('FHO26CA-LGM'), scene7('FHO26CA-CANADA_01')]
  },
  'edea-piano-figure-skating-boot': {
    source: 'Skates US Edea product page',
    page: 'https://skatesus.com/product/edea-piano-figure-skating-boot/',
    images: ['https://skatesus.com/wp-content/uploads/2023/03/EDEA-Piano-Ice-Boot-1.webp']
  }
};

function cleanUrl(url) {
  return url.replace(/^\/\//, 'https://').replace(/&amp;/g, '&');
}

async function download(url) {
  const res = await fetch(cleanUrl(url), { headers: { 'user-agent': 'Mozilla/5.0 Penguin POC image fetcher' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function writeCatalogImage(input, outputPath) {
  await sharp(input)
    .resize(1400, 1100, { fit: 'contain', background: '#ffffff', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 84 })
    .toFile(outputPath);
}

for (const product of products) {
  const source = imageSources[product.slug];
  if (!source) continue;
  const localImages = [];
  for (const [index, remoteUrl] of source.images.entries()) {
    const localPath = `/images/products/${product.slug}-official-${index + 1}.webp`;
    const absolutePath = path.join(root, 'public', localPath);
    const input = await download(remoteUrl);
    await writeCatalogImage(input, absolutePath);
    localImages.push(localPath);
    console.log(`${product.title}: ${localPath}`);
  }
  product.featuredImage = localImages[0];
  product.images = localImages;
  product.altText = `${product.title} official product image for proof-of-concept storefront.`;
  product.specifications = {
    ...product.specifications,
    'Image source': source.source,
    'Image source URL': source.page
  };
}

await fs.writeFile(catalogPath, JSON.stringify(products, null, 2) + '\n');
console.log('Downloaded product imagery and updated data/products.json.');
