// Design tokens — extracted from AVA Shopper Exp 4.1 Figma

export const FONT =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const COLOR = {
  textPrimary: "#3f4145",
  textSecondary: "#6b6e73",
  textTertiary: "#b2b6bb",
  borderPrimary: "#e1e4e8",
  greyscale100: "#f5f7fa",
  greyscale200: "#f0f2f5",
  greyscale900: "#27292c",
  black: "#000000",
  white: "#ffffff",
} as const;

export const TYPE = {
  // Question header / section titles
  h1: {
    fontFamily: FONT,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "normal" as const,
    color: COLOR.textPrimary,
  },
  // Section sub-headers inside answer
  h2: {
    fontFamily: FONT,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "normal" as const,
    color: COLOR.greyscale900,
  },
  // Answer body — 16px Medium
  bodyLarge: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLOR.textPrimary,
  },
  // UI labels, chips, input
  body: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLOR.textPrimary,
  },
  // Footer / powered-by
  caption: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "normal" as const,
    color: COLOR.textSecondary,
  },
} as const;
