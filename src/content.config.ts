import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    order: z.number().int().positive(),
    title: z.string(),
    summary: z.string(),
    text: z.string(),
    situation: z.string(),
    outcome: z.string(),
    scope: z.array(z.string()).min(1),
    scopeText: z.string(),
    entry: z.string(),
  }),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    order: z.number().int().positive(),
    publicationStatus: z.enum(['approved-internal', 'draft', 'blocked']),
    client: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    summary: z.string(),
    services: z.array(z.string()).min(1),
    assetStatus: z.enum(['approved', 'not-approved']),
    sourceNote: z.string(),
  }),
});

export const collections = { services, cases };
