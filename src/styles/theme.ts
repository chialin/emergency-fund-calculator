export const T = {
  bg: '#0F0E0C',
  bgPanel: '#1A1814',
  bgPanelHover: '#221F1A',
  text: '#F2EBDC',
  textDim: '#8B8275',
  textFaint: '#5A5347',
  accent: '#D4A574',
  accentDim: '#8B6F4E',
  warn: '#C8553D',
  ok: '#7A9E7E',
  border: '#2A2620',
  borderLight: '#3A352D',
} as const;

export type ThemeColor = (typeof T)[keyof typeof T];
