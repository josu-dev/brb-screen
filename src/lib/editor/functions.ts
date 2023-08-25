
export function composeConfigParams(message: string, imageURL: string, bgStyle: string) {
  try {
    return (
      '?json=' +
      btoa(
        JSON.stringify({
          message,
          img_url: imageURL.trim(),
          css_bg_style: bgStyle.trim(),
        })
      )
    );
  } catch (e) {
    return '?';
  }
}
