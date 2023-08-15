const DEFAULT_THEME = {
  white: '#EFF2F5',
  black: '#333333',
  red100: '#FCEDEE',
};

export const COLORS = {
  dark: {
    white: DEFAULT_THEME.black,
    black: DEFAULT_THEME.white,
    red100: DEFAULT_THEME.red100,
  },
  light: {
    white: DEFAULT_THEME.white,
    black: DEFAULT_THEME.black,
    red100: DEFAULT_THEME.red100,
  },
} as const;

export default COLORS;
