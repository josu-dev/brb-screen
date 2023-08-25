import { z } from 'zod';
import { objectFit, textAlign, type ObjectFit, type TextAlign } from './enums';


export const configSchema = z.object({
  msg: z.string().min(1),
  msg_color: z.string().min(1),
  msg_align: z.nativeEnum(textAlign).default(textAlign.center),
  img_url: z.string().url(),
  img_width: z.string().min(1),
  img_height: z.string().min(1),
  img_obj_fit: z.nativeEnum(objectFit).default(objectFit.cover),
  bg_style: z.string().min(1),
}).partial();

export const compressedConfigSchema = z.object({
  m: z.string().min(1),         // message
  mc: z.string().min(1),        // message_color
  ma: z.nativeEnum(textAlign),  // message_align
  iu: z.string().url(),         // image_url
  iw: z.string().min(1),        // image_width
  ih: z.string().min(1),        // image_height 
  io: z.nativeEnum(objectFit),  // image_obj_fit
  bs: z.string().min(1),        // bg_style
}).partial();

type CompressedScreenConfig = z.infer<typeof compressedConfigSchema>;


export function encodeEditorConfig(
  msg: string, msg_color: string, msg_align: TextAlign | '',
  img_url: string, img_width: string, img_height: string, img_obj_fit: ObjectFit | '',
  bg_style: string
) {
  let prefix = '?j=';

  const config: CompressedScreenConfig = {};

  if (msg) config.m = msg;

  msg_color = msg_color.trim();
  if (msg_color) config.mc = msg_color;

  if (msg_align) config.ma = msg_align;
  img_url = img_url.trim();

  if (img_url) config.iu = img_url;
  img_width = img_width.trim();

  if (img_width) config.iw = img_width;
  img_height = img_height.trim();

  if (img_height) config.ih = img_height;

  if (img_obj_fit) config.io = img_obj_fit;
  bg_style = bg_style.trim();

  if (bg_style) config.bs = bg_style;

  try {
    return prefix += btoa(JSON.stringify(config));
  } catch (e) {
    return '?';
  }
}


export function decodeEditorConfig(val: string, ctx: z.RefinementCtx) {
  try {
    const decoded = JSON.parse(atob(val));
    const result = compressedConfigSchema.safeParse(decoded);
    if (!result.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid config',
        path: [],
      });

      return z.NEVER;
    }

    return result.data;
  } catch (e) {
    console.error('Error decoding editor config at path:', ctx.path, 'with value:', val, 'and error:', e);

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid config',
      path: [],
    });

    return z.NEVER;
  }
}


export const screenConfigSchema = compressedConfigSchema.extend({
  j: z.optional(z.string().transform(decodeEditorConfig)),
});

type ScreenConfig = z.infer<typeof screenConfigSchema>;
