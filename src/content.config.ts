import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const reference = z.object({ title: z.string(), url: z.url() });
const image = z.object({ src: z.string(), alt: z.string().min(1) });
const common = {
  title: z.string(),
  description: z.string(),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z
    .object({
      ...common,
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.string().default('Notes'),
      language: z.enum(['en', 'tr']).default('en'),
      heroImage: image.optional(),
      canonicalURL: z.url().optional(),
      references: z.array(reference).default([]),
      relatedProjects: z.array(z.string()).default([]),
    })
    .refine(
      (entry) => !entry.updatedDate || entry.updatedDate >= entry.publishedDate,
      {
        message: 'updatedDate must not precede publishedDate',
        path: ['updatedDate'],
      },
    ),
});
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    ...common,
    kind: z
      .enum([
        'research',
        'thesis',
        'publication',
        'poster',
        'presentation',
        'dataset',
        'software',
      ])
      .default('research'),
    status: z.string(),
    institution: z.string().optional(),
    period: z.string().optional(),
    methods: z.array(z.string()).default([]),
    links: z.array(reference).default([]),
    order: z.number().default(0),
    role: z.string().optional(),
    question: z.string().optional(),
    contribution: z.string().optional(),
    outputs: z.array(z.string()).default([]),
    relatedWriting: z.array(z.string()).default([]),
    image: image
      .extend({
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        caption: z.string().optional(),
      })
      .optional(),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...common,
    category: z.string(),
    year: z.string().optional(),
    status: z.string().optional(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    image: image
      .extend({
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        caption: z.string().optional(),
      })
      .optional(),
    website: z.url().optional(),
    repository: z.url().optional(),
    order: z.number().default(0),
    contribution: z.string().optional(),
  }),
});
const credentials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/credentials' }),
  schema: z.object({
    ...common,
    issuer: z.string(),
    date: z.string(),
    credentialId: z.string().optional(),
    credentialUrl: z.url().optional(),
    category: z
      .enum(['certificate', 'training', 'award', 'workshop', 'professional'])
      .default('certificate'),
    description: z.string().optional(),
    image: image.optional(),
  }),
});
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      ...common,
      kind: z.literal('thought'),
      label: z.string().default('Research note'),
    }),
    z.object({
      ...common,
      kind: z.literal('quotation'),
      author: z.string(),
      source: reference,
      locator: z.string().min(1),
    }),
  ]),
});
export const collections = { writing, research, projects, credentials, notes };
