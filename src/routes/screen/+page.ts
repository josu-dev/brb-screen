import { textAlign } from '$lib/editor/enums';
import { screenConfigSchema } from '$lib/editor/validation';
import { makeSearchParamsSchema } from '$lib/searchParams';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';


const defaultConfig = {
  msg: 'Custom message\n<3',
  msg_color: '#f0f0f0',
  msg_align: textAlign.center,
  img_url: `/img/test.svg`,
  img_width: '200px',
  img_height: '300px',
  img_obj_fit: textAlign.center,
  bg_style: `background-color: black;`,
  // bg_style: `background-image: radial-gradient(at right bottom, #4c0519, #500724);`,
  // bg_style: `background-image: radial-gradient(at left top, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42));`,
} as const;


const searchParamsSchema = makeSearchParamsSchema(screenConfigSchema);


export const load = (async ({ url }) => {
  const query = searchParamsSchema.safeParse(url.searchParams);
  if (!query.success) {
    console.error(JSON.stringify(query.error, null, 2));
    throw redirect(303, '/');
  }

  if (query.data.j) {
    const json = query.data.j;
    return {
      msg: json.m || defaultConfig.msg,
      msg_color: json.mc || defaultConfig.msg_color,
      msg_align: json.ma || defaultConfig.msg_align,
      img_url: json.iu,
      img_width: json.iw || defaultConfig.img_width,
      img_height: json.ih || defaultConfig.img_height,
      img_obj_fit: json.io || defaultConfig.img_obj_fit,
      bg_style: json.bs || defaultConfig.bg_style,
    };
  }

  return {
    msg: query.data.m || defaultConfig.msg,
    msg_color: query.data.mc || defaultConfig.msg_color,
    msg_align: query.data.ma || defaultConfig.msg_align,
    img_url: query.data.iu,
    img_width: query.data.iw || defaultConfig.img_width,
    img_height: query.data.ih || defaultConfig.img_height,
    img_obj_fit: query.data.io || defaultConfig.img_obj_fit,
    bg_style: query.data.bs,
  };
}) satisfies PageLoad;
