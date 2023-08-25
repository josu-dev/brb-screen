import { configSchema, encodeEditorConfig } from '$lib/editor/validation';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';


export const load = (async () => {
  const configForm = await superValidate(configSchema);

  return {
    configForm,
  };
}) satisfies PageServerLoad;


export const actions = {
  gotourl: async ({ request, url }) => {
    const configForm = await superValidate(request, configSchema);
    if (!configForm.valid) {
      console.error(configForm.errors);

      return {
        configForm,
      };
    }

    const generatedURL = url.origin + '/screen' + encodeEditorConfig(
      configForm.data.msg ?? '',
      configForm.data.msg_color ?? '',
      configForm.data.msg_align ?? '',
      configForm.data.img_url ?? '',
      configForm.data.img_width ?? '',
      configForm.data.img_height ?? '',
      configForm.data.img_obj_fit ?? '',
      configForm.data.bg_style ?? ''
    );

    throw redirect(303, generatedURL);
  },
} as Actions;
