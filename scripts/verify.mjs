import fs from 'node:fs';
import path from 'node:path';
import products from '../data/products.json' assert { type: 'json' };

const root = process.cwd();
const expectedThemes = ['premium-ice', 'pro-shop', 'penguin-modern', 'penguin-classic'];
const expectedCategories = ['hockey', 'figure-skating', 'goalie', 'skates', 'accessories', 'apparel', 'skate-services'];
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(products.length === 146, `Expected exactly 146 products, found ${products.length}.`);

const ids = new Set();
const slugs = new Set();
let imageCount = 0;
for (const product of products) {
  assert(product.isPrototype === true, `${product.title} is missing isPrototype true.`);
  assert(product.featuredImage, `${product.title} missing featured image.`);
  assert(product.altText && product.altText.length > 18, `${product.title} missing useful alt text.`);
  assert(!ids.has(product.id), `Duplicate product id ${product.id}.`);
  assert(!slugs.has(product.slug), `Duplicate product slug ${product.slug}.`);
  ids.add(product.id);
  slugs.add(product.slug);
  for (const image of product.images || []) {
    imageCount += 1;
    assert(image.startsWith('/images/products/'), `${product.title} image is not a local catalog path: ${image}`);
    assert(fs.existsSync(path.join(root, 'public', image)), `Missing image ${image}`);
  }
  assert(product.images?.includes(product.featuredImage), `${product.title} featured image is not in image gallery.`);
  assert(Array.isArray(product.variants) && product.variants.length > 0, `${product.title} missing variants.`);
}

for (const theme of expectedThemes) {
  assert(fs.existsSync(path.join(root, 'public/images/heroes', `${theme}.webp`)), `Missing hero image for ${theme}.`);
}

for (const category of expectedCategories) {
  assert(fs.existsSync(path.join(root, 'public/images/categories', `${category}.webp`)), `Missing category image for ${category}.`);
}

const requiredFiles = [
  'src/App.tsx',
  'src/commerce/ProductRepository.ts',
  'src/commerce/CartContext.tsx',
  'src/themes/themes.ts',
  'docs/catalog-schema.md',
  'docs/shopify-migration.md',
  'docs/notification-architecture.md',
  'docs/aws-deployment.md'
];
for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `Missing required file ${file}.`);
}

if (failures.length) {
  console.error('Verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Feature/data/image verification passed.');
console.log(`Products: ${products.length}`);
console.log(`Product images: ${imageCount}`);
console.log(`Category images: ${expectedCategories.length}`);
console.log(`Hero images: ${expectedThemes.length}`);
