import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Articles de la section « Conseils » — un fichier .md par article. */
const conseils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conseils' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { conseils };
