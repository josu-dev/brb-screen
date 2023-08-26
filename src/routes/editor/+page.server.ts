import { DEFAULT_EDITOR_CONFIG } from '$lib/config';
import { encodeEditorConfig, screenConfigSchema, type ScreenConfig } from '$lib/editor/validation';
import { makeSearchParamsSchema } from '$lib/searchParams';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';


const DEFAULT_SCREEN_CONFIG = DEFAULT_EDITOR_CONFIG.screenConfig;

const SCREEN_CONFIG_NONE = {
  msg_align: DEFAULT_SCREEN_CONFIG.msg_align,
  img_obj_fit: DEFAULT_SCREEN_CONFIG.img_obj_fit,
};
const SCREEN_CONFIG_MINIMAL = {
  msg: DEFAULT_SCREEN_CONFIG.msg,
  msg_align: DEFAULT_SCREEN_CONFIG.msg_align,
  msg_color: DEFAULT_SCREEN_CONFIG.msg_color,
  bg_style: DEFAULT_SCREEN_CONFIG.bg_style,
};
const SCREEN_CONFIG_FULL = DEFAULT_SCREEN_CONFIG;


const editorConfigSchema = makeSearchParamsSchema(z.object({
  d: z.union([
    z.literal('none'),
    z.literal('minimal'),
    z.literal('full')
  ]).catch(DEFAULT_EDITOR_CONFIG.preset).optional()
}));


export const load = (async ({ url }) => {
  const editorConfig = editorConfigSchema.safeParse(url.searchParams);

  const preset = (editorConfig.success && editorConfig.data.d) || DEFAULT_EDITOR_CONFIG.preset;

  let screenConfig: ScreenConfig | undefined;

  if (preset === 'none') {
    screenConfig = SCREEN_CONFIG_NONE;
  }
  else if (preset === 'minimal') {
    screenConfig = SCREEN_CONFIG_MINIMAL;
  }
  else {
    screenConfig = { ...SCREEN_CONFIG_FULL };
    screenConfig.img_url = url.origin + screenConfig.img_url;
  }

  const configForm = await superValidate(screenConfig, screenConfigSchema);

  return {
    configForm: configForm,
  };
}) satisfies PageServerLoad;


export const actions = {
  gotourl: async ({ request, url }) => {
    const configForm = await superValidate(request, screenConfigSchema);
    if (!configForm.valid) {
      console.error(configForm.errors);

      return {
        configForm,
      };
    }

    const generatedURL = url.origin + '/screen?' + encodeEditorConfig(
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
