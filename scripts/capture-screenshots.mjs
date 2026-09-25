import fs from 'node:fs/promises';
import path from 'node:path';
import fsSync from 'node:fs';
import { chromium } from 'playwright';

const themes = [
  ['premium-ice', 'http://localhost:8088'],
  ['pro-shop', 'http://localhost:8089'],
  ['penguin-modern', 'http://localhost:8090'],
  ['penguin-classic', 'http://localhost:8091']
];

const shots = [
  ['desktop-homepage', '/', { width: 1440, height: 1100 }],
  ['mobile-homepage', '/', { width: 390, height: 1100 }],
  ['desktop-collection', '/collections/hockey', { width: 1440, height: 1100 }],
  ['desktop-product', '/products/bauer-vapor-flylite-skate-senior', { width: 1440, height: 1100 }],
  ['desktop-cart', '/cart', { width: 1440, height: 1000 }]
];

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({
  executablePath: fsSync.existsSync(chromePath) ? chromePath : undefined
});
for (const [theme, baseUrl] of themes) {
  const dir = path.join(process.cwd(), 'screenshots', theme);
  await fs.mkdir(dir, { recursive: true });
  const page = await browser.newPage();
  for (const [name, route, viewport] of shots) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log('Screenshots captured for all themes.');
