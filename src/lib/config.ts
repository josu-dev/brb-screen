import { objectFit, textAlign } from './editor/enums';

export const REPOSITORY_URL = 'https://github.com/J-Josu/brb-screen';

export const DEPLOY_DOMAIN = 'https://brb-screen.vercel.app';

export const DEFAULT_EDITOR_CONFIG = {
  preset: 'minimal',
  screenConfig: {
    msg: 'custom message\nhere',
    msg_color: '#f0f0f0',
    msg_align: textAlign.center,
    img_url: `/img/editor-preview-default.svg`,
    img_width: '196px',
    img_height: '196px',
    img_obj_fit: objectFit.cover,
    bg_style: `background-image: radial-gradient(at left top, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42));`,
  }
} as const;
