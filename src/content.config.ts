import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    order: z.number().int().positive(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    href: z.string().startsWith('/leistungen/'),
    linkLabel: z.string(),
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
      ctaLabel: z.string(),
      ctaMicrocopy: z.string(),
      contextHeading: z.string(),
      contextText: z.string(),
      capabilitiesHeading: z.string(),
      capabilities: z.array(z.object({
        title: z.string(),
        text: z.string().optional(),
      })).min(1),
      approach: z.array(z.object({
        title: z.string(),
        text: z.string().optional(),
      })).min(1).optional(),
      approachHeading: z.string().optional(),
      entry: z.object({
        heading: z.string(),
        text: z.string(),
      }).optional(),
      faq: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).min(2),
      relatedLinks: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })).min(1),
      contactSubject: z.string(),
      contactTitle: z.string().optional(),
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
