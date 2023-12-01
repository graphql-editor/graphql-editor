import { ITheme } from "@aexol-studio/styling-system";

export const MainTheme = {
  base: "vs-dark",
  shadow: "#00000022 2px 2px 14px",
  colors: {
    type: "#1F8EFE",
    union: "#8F70FD",
    input: "#FF8143",
    scalar: "#4ABB8B",
    interface: "#D73775",
    enum: "#A1D835",
    directive: "#F54747",
    extend: "#6E7578",
  },
  fontFamily: `'Fira Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`,
  fontFamilySans: `'Fira Sans', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`,
};

type MainThemeType = typeof MainTheme;

export type EditorTheme = ITheme & MainThemeType;
