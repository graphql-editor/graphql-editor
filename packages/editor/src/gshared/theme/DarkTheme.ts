type BuiltinTheme = "vs" | "vs-dark" | "hc-black";
const BaseTheme = {
  base: "vs-dark",
  shadow: "#00000022 2px 2px 14px",
  disabled: "#899599",
  inactive: "#b7c7cc",
  dimmed: "#cee0e5",
  text: "#e3f6fc",
  error: "#d49ea3",
  contra: "#000000",
  hover: "#ffffff",
  secondaryHover: "#01c4bd",
  main: "#35d83b",
  active: "#2162a4",
  salmon: "#ff8080",
  public: "#43df2e",
  private: "#f22e35",
  background: {
    mainClosest: "#303030",
    mainCloser: "#292929",
    mainClose: "#202020",
    mainMiddle: "#1e1e1e",
    mainFar: "#1a1a1a",
    mainFurther: "#161616",
    mainFurthers: "#141414",
    mainFurthest: "#0f0f0f",
    mainBlack: "#0a0a0a",
    success: "#007fff",
    error: "#c1301f",
  },
  colors: {
    type: "#63b0ff",
    union: "#8663ff",
    input: "#ff8143",
    scalar: "#4abb8b",
    interface: "#ff4b91",
    enum: "#a1d835",
    directive: "#cc493d",
    extend: "#000000",
  },
};

type ToThemeDict<T> = {
  [P in keyof T]: T[P] extends string
    ? string
    : T[P] extends Record<string, any>
    ? ToThemeDict<T[P]>
    : never;
};
export type EditorTheme = ToThemeDict<typeof BaseTheme> & {
  base: BuiltinTheme;
};
export const DarkTheme = BaseTheme as EditorTheme;

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

export type Colors = Leaves<EditorTheme>;

export const getColorByKeyChain = (
  key: string,
  theme: Record<string, unknown>
): string =>
  key
    .split(".")
    .reduce(
      (pv, cv) => pv[cv] as Record<string, unknown>,
      theme
    ) as unknown as string;
