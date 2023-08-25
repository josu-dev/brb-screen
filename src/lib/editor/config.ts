
export const textAlign = {
  left: 'L',
  center: 'C',
  right: 'R',
}as const;

export type TextAlign = typeof textAlign[keyof typeof textAlign];
