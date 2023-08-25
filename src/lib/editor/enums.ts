
export const textAlign = {
  left: 'L',
  center: 'C',
  right: 'R',
}as const;

export type TextAlign = typeof textAlign[keyof typeof textAlign];

export const objectFit = {
  contain: 'C',
  cover: 'D',
  fill: 'F',
  none: 'N',
  scaleDown: 'S',
}as const;

export type ObjectFit = typeof objectFit[keyof typeof objectFit];
