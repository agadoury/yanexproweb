/**
 * Audit d'accessibilité WCAG 2.1 AA (axe-core) sur le site construit.
 *
 * Prérequis : `npm run build`, puis `npx playwright install chromium`
 * (une seule fois par machine; ou définir CHROMIUM_PATH vers un Chromium
 * existant). Exécution : `node scripts/audit-a11y.mjs`
 * Le script échoue (code 1) à la moindre violation.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = new URL('../dist', import.meta.url).pathname;
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

const PAGES = [
  '/', '/garage', '/services', '/services/freins', '/rendez-vous',
  '/merci', '/contact', '/404', '/conseils', '/conseils/bien-choisir-ses-pneus-dhiver',
];

const server = createServer(async (req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  else if (!extname(p)) p += '.html';
  try {
    const d = await readFile(join(DIST, p));
    res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' });
    res.end(d);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(4321, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let violations = 0;
for (const path of PAGES) {
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  if (results.violations.length === 0) {
    console.log(`✓ ${path}`);
    continue;
  }
  for (const v of results.violations) {
    violations += 1;
    console.error(`\n✗ ${path} [${v.impact}] ${v.id}: ${v.help}`);
    for (const node of v.nodes.slice(0, 4)) {
      console.error(`   ${node.html.slice(0, 120)}`);
      if (node.any[0]?.message) console.error(`   → ${node.any[0].message.slice(0, 140)}`);
    }
  }
}

await browser.close();
server.close();

if (violations > 0) {
  console.error(`\n${violations} violation(s)`);
  process.exit(1);
}
console.log('\nAucune violation WCAG 2.1 AA.');
