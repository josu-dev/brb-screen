import { searchParamsSchema } from '$lib/searchParams';
import { redirect } from '@sveltejs/kit';
import z from 'zod';
import type { PageLoad } from './$types';


const jsonSchema = z.object({
  message: z.string().nonempty().optional(),
  img_url: z.string().url().optional(),
  css_bg_style: z.string().nonempty().optional(),
});

const querySchema = searchParamsSchema({
  message: z.string().nonempty().optional(),
  img_url: z.string().url().optional(),
  css_bg_style: z.string().nonempty().optional(),
  json: z.string().nonempty().transform(x => JSON.parse(atob(x))).pipe(jsonSchema).optional(),
});

export const load = (async ({ url }) => {
  const query = querySchema.safeParse(url.searchParams);
  if (!query.success) {
    console.error(JSON.stringify(query.error, null, 2));
    throw redirect(303, '/');
  }

  return {
    message: query.data.message,
    img_url: query.data.img_url,
    css_bg_style: query.data.css_bg_style,
    json: query.data.json,
  };
}) satisfies PageLoad;
