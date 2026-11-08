import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// content/ is also an Obsidian vault. Sources (.qmd/.Rmd) live next to their rendered .md
// and are ignored here; only .md/.mdx is loaded.

const writing = defineCollection({
  // One folder per post: content/writing/<slug>/<slug>.md (+ <slug>.qmd, <slug>_files/, images)
  loader: glob({
    base: './content/writing',
    pattern: '*/*.{md,mdx}',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './content/projects', pattern: ['*.{md,mdx}', '!_*'] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      org: z.string().optional(),
      role: z.string().optional(),
      years: z.string().optional(),
      url: z.url().optional(),
      repo: z.url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      status: z.enum(['active', 'past', 'idea']).default('active'),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const art = defineCollection({
  loader: glob({ base: './content/art', pattern: '*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().optional(),
      order: z.number().default(100),
      medium: z.array(z.string()).default([]),
      credits: z.array(z.string()).default([]),
      link: z.url().optional(),
      cover: image().optional(),
    }),
});

const org = z.object({ name: z.string(), url: z.url().optional() });

// Single pages; the id is the path (e.g. "about", "slides/hiwi"). "home" feeds the landing page.
const pages = defineCollection({
  loader: glob({ base: './content/pages', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Full <title> override (otherwise "<title> · Lennart Klein"). */
      seoTitle: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      portrait: image().optional(),
      /** schema.org Person data, emitted as JSON-LD on the home page. */
      person: z
        .object({
          jobTitle: z.string().optional(),
          worksFor: z.array(org).default([]),
          affiliation: z.array(org).default([]),
          alumniOf: z.array(org).default([]),
          knowsAbout: z.array(z.string()).default([]),
        })
        .optional(),
    }),
});

export const collections = { writing, projects, art, pages };
