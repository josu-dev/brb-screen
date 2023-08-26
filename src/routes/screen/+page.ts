import { textAlign } from '$lib/editor/enums';
import { compactScreenConfigSchema, type SafeScreenConfig } from '$lib/editor/validation';
import { makeSearchParamsSchema } from '$lib/searchParams';
import type { PageLoad } from './$types';


const FALLBACK_CONFIG = {
  msg: 'no configuration\nprovided',
  msg_color: '#f0f0f0',
  msg_align: textAlign.center,
  img_url: '',
  img_width: '',
  img_height: '',
  img_obj_fit: textAlign.center,
  bg_style: `background-image: linear-gradient(rgb(0, 0, 0), rgb(2 6 23), rgb(0, 0, 0))`,
} as const;


const searchParamsSchema = makeSearchParamsSchema(compactScreenConfigSchema);


export const load = (async ({ url }) => {
  const query = searchParamsSchema.safeParse(url.searchParams);
  if (!query.success) {
    console.error(JSON.stringify(query.error, null, 2));

    return FALLBACK_CONFIG;
  }

  const config = query.data;

  if (config.j) {
    const json = config.j;
    if (!json.m && !json.iu && !json.bs) {
      return FALLBACK_CONFIG;
    }

    return {
      msg: json.m ?? '',
      msg_color: json.mc || FALLBACK_CONFIG.msg_color,
      msg_align: json.ma || FALLBACK_CONFIG.msg_align,
      img_url: json.iu,
      img_width: json.iw || FALLBACK_CONFIG.img_width,
      img_height: json.ih || FALLBACK_CONFIG.img_height,
      img_obj_fit: json.io || FALLBACK_CONFIG.img_obj_fit,
      bg_style: json.bs,
    };
  }

  if (!config.m && !config.iu && !config.bs) {
    return FALLBACK_CONFIG;
  }

  return {
    msg: config.m ?? '',
    msg_color: config.mc || FALLBACK_CONFIG.msg_color,
    msg_align: config.ma || FALLBACK_CONFIG.msg_align,
    img_url: config.iu,
    img_width: config.iw || FALLBACK_CONFIG.img_width,
    img_height: config.ih || FALLBACK_CONFIG.img_height,
    img_obj_fit: config.io || FALLBACK_CONFIG.img_obj_fit,
    bg_style: config.bs,
  };
}) satisfies PageLoad<SafeScreenConfig>;
