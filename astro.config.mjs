// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yanexpro.com',
  integrations: [
    sitemap({
      // Page de confirmation exclue des moteurs de recherche.
      filter: (page) => !page.includes('/merci'),
    }),
  ],
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
