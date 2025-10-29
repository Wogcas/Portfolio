import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        img: z.string().default('/images/default-no-image.jpg'),
        imageScale: z.number().optional(),
        techs: z.array(z.string()).optional(),
        'git-repository': z.string().url().optional(),

        date: z.object({
            start: z.string(),
            end: z.string()
        }).optional(),
    }),
});

export const collections = { projects };
