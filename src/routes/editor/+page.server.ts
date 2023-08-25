import { configSchema } from '$lib/editor/validation';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';


export const load = (async () => {
  const configForm = await superValidate(configSchema);

  return {
    configForm,
  };
}) satisfies PageServerLoad;


export const actions = {
  goto: async ({ request, url }) => {
    const configForm = await superValidate(request, configSchema);
    if (!configForm.valid) {
      console.error(configForm.errors);

      return {
        configForm
      };
    }

    // const message = configForm.data.message ?? 'BRB - Be Right Back!';
    // const img_url = configForm.data.img_url ?? 'https://i.imgur.com/removed.png';
    // const css_bg_style = configForm.data.css_bg_style ?? 'background-color: #000000; color: #ffffff;';

    // const screenUrl = url.origin + '/screen' + encodeEditorConfig(message, img_url, css_bg_style);

    // throw redirect(303, screenUrl);
  },
} as Actions;
