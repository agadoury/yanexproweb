/**
 * Vérifications de fumée après `npm run build` : le script échoue (code 1)
 * si une page attendue manque ou si un contenu essentiel a disparu.
 * Exécuté par l'intégration continue (.github/workflows/ci.yml) et
 * utilisable localement : `node scripts/smoke.mjs`
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;
let failures = 0;

async function check(file, ...mustContain) {
  let html;
  try {
    html = await readFile(join(DIST, file), 'utf-8');
  } catch {
    console.error(`✗ fichier manquant : ${file}`);
    failures += 1;
    return;
  }
  for (const needle of mustContain) {
    if (!html.includes(needle)) {
      console.error(`✗ ${file} : contenu manquant « ${needle} »`);
      failures += 1;
    }
  }
  console.log(`✓ ${file}`);
}

// Pages principales et leur contenu essentiel
await check('index.html', '(450) 652-2121', '"@type":"AutoRepair"', 'Prenez rendez-vous');
await check('garage.html', 'Bumper to Bumper');
await check('services.html', '"@type":"FAQPage"');
await check('rendez-vous.html', 'formsubmit.co/', 'name="Téléphone"');
await check('merci.html', 'noindex');
await check('contact.html', '772 Bd Lionel-Boulet');
await check('404.html', 'Erreur 404');

// Les 9 pages de services
for (const slug of [
  'freins', 'vehicules-electriques', 'silencieux-echappement', 'direction-suspension',
  'injection-electricite', 'refroidissement-air-climatise', 'alignement',
  'electronique-mise-au-point', 'pneus',
]) {
  await check(`services/${slug}.html`, '"@type":"Service"', '"@type":"FAQPage"');
}

// Fichiers de référencement
await check('robots.txt', 'Sitemap:');
await check('llms.txt', 'Garage Yanexpro');
await check('manifest.webmanifest', 'Garage Yanexpro');
await check('sitemap-0.xml', 'yanexpro.com/garage');

// La page de confirmation ne doit PAS être dans le sitemap
const sitemap = await readFile(join(DIST, 'sitemap-0.xml'), 'utf-8');
if (sitemap.includes('/merci')) {
  console.error('✗ sitemap-0.xml : /merci ne devrait pas y figurer');
  failures += 1;
}

if (failures > 0) {
  console.error(`\n${failures} échec(s)`);
  process.exit(1);
}
console.log('\nToutes les vérifications passent.');
