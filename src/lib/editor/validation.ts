import { z } from 'zod';
import { objectFit, textAlign, type ObjectFit, type TextAlign } from './enums';


type ResolveType<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
};

// using .catch(undefined) on optional schemas makes superforms to ignore .optional() and treat it as required
// the following breaks the form field:
const catchInSchemaBreaksOptional = z.string().trim().min(1).optional().catch(undefined);

const optionalStringSchema = z.string().trim().transform(val => val.length ? val : undefined).optional();

const optionalURLSchema = z.string().trim().url().optional();
const safeOptionalURLSchema = z.string().trim().url().catch(undefined as any).optional();

const optionalTextAlignSchema = z.nativeEnum(textAlign).optional();
const safeOptionalTextAlignSchema = z.nativeEnum(textAlign).catch(undefined as any).optional();

const optionalObjectFitSchema = z.nativeEnum(objectFit).optional();
const safeOptionalObjectFitSchema = z.nativeEnum(objectFit).catch(undefined as any).optional();


export const screenConfigSchema = z.object({
  msg: optionalStringSchema,
  msg_color: optionalStringSchema,
  msg_align: optionalTextAlignSchema,
  img_url: optionalURLSchema,
  img_width: optionalStringSchema,
  img_height: optionalStringSchema,
  img_obj_fit: optionalObjectFitSchema,
  bg_style: optionalStringSchema,
});

export type ScreenConfig = z.infer<typeof screenConfigSchema>;

export type SafeScreenConfig = ResolveType<
  Required<Omit<ScreenConfig, 'img_url' | 'bg_style'>> &
  Pick<ScreenConfig, 'img_url' | 'bg_style'>
>;


export const baseCompactScreenConfigSchema = z.object({
  m: optionalStringSchema,           // msg
  mc: optionalStringSchema,          // msg_color
  ma: safeOptionalTextAlignSchema,   // msg_align
  iu: safeOptionalURLSchema,         // img_url
  iw: optionalStringSchema,          // img_width
  ih: optionalStringSchema,          // img_height 
  io: safeOptionalObjectFitSchema,   // img_obj_fit
  bs: optionalStringSchema,          // bg_style
});

export type BaseCompactScreenConfig = z.infer<typeof baseCompactScreenConfigSchema>;


export function encodeEditorConfig(
  msg: string, msg_color: string, msg_align: TextAlign | '',
  img_url: string, img_width: string, img_height: string, img_obj_fit: ObjectFit | '',
  bg_style: string
) {
  const SEARCH_PARAM_PREFIX = 'j=';

  const config: BaseCompactScreenConfig = {};

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
    return SEARCH_PARAM_PREFIX + btoa(JSON.stringify(config));
  } catch (e) {
    return '';
  }
}


export function decodeEditorConfig(val: string, ctx: z.RefinementCtx) {
  try {
    const decoded = JSON.parse(atob(val));
    const result = baseCompactScreenConfigSchema.safeParse(decoded);
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


export const compactScreenConfigSchema = baseCompactScreenConfigSchema.extend({
  j: z.optional(z.string().transform(decodeEditorConfig)),
});

export type CompactScreenConfig = z.infer<typeof compactScreenConfigSchema>;
