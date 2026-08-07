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
    detail: z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      seoTitle: z.string(),
      description: z.string(),
      kicker: z.string(),
      heading: z.string(),
      intro: z.string(),
      situations: z.array(z.object({
        title: z.string(),
        text: z.string(),
      })).min(1),
      capabilities: z.array(z.object({
        title: z.string(),
        text: z.string(),
      })).min(1),
      approach: z.array(z.object({
        title: z.string(),
        text: z.string(),
      })).min(1),
      entryHeading: z.string(),
      entryText: z.string(),
      faq: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).min(1),
      relatedLinks: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })).min(1),
      contactSubject: z.string(),
      contactTitle: z.string(),
      contactText: z.string(),
    }).optional(),
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
