import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import z from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { composeConfigParams } from '$lib/editor/functions';
import { textAlign } from '$lib/editor/config';


const screenConfigSchema = z.object({
  message: z.string().nonempty().optional(),
  message_color: z.string().nonempty().optional(),
  message_alignment: z.nativeEnum(textAlign).default('C').optional(),
  img_url: z.string().url().optional(),
  img_width: z.string().nonempty().optional(),
  img_height: z.string().nonempty().optional(),
  img_object_fit: z.string().nonempty().optional(),
  css_bg_style: z.string().nonempty().optional(),
  json: z.string().nonempty().optional(),
});

export const load = (async () => {
  const configForm = await superValidate(screenConfigSchema);

  return {
    configForm,
  };
}) satisfies PageServerLoad;


export const actions = {
  goto: async ({ request, url }) => {
    const configForm = await superValidate(request, screenConfigSchema);
    if (!configForm.valid) {
      console.error(configForm.errors);

      return {
        configForm
      };
    }

    if (configForm.data.json) {
      throw redirect(303, url.origin + '/screen' + configForm.data.json);
    }

    const message = configForm.data.message ?? 'BRB - Be Right Back!';
    const img_url = configForm.data.img_url ?? 'https://i.imgur.com/removed.png';
    const css_bg_style = configForm.data.css_bg_style ?? 'background-color: #000000; color: #ffffff;';

    const screenUrl = url.origin + '/screen' + composeConfigParams(message, img_url, css_bg_style);

    throw redirect(303, screenUrl);
  },
} as Actions;
