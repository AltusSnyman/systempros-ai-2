import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        /** Optional <title> override (≤60 chars) when the H1 is longer. */
        seoTitle: z.string().optional(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image(),
        author: z.string().default('System Pros AI Team'),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
    }),
});

export const collections = { blog };
