type BuiltinTheme = "vs" | "vs-dark" | "hc-black";
const BaseTheme = {
  base: "vs-dark" as BuiltinTheme,
  shadow: "#00000022 2px 2px 14px",
  backgroundedText: "#F3F3F4",
  disabled: "#999999",
  inactive: "#bbbbbb",
  dimmed: "#eeeeee",
  text: "#F3F3F4",
  info: "#A3E7FC",
  success: "#acf7c1",
  error: "#de3c4b",
  contra: "#000000",
  title: "#d897b1",
  hover: "#e6bccd",
  secondaryHover: "#17bebb",
  main: "#d966ff",
  active: "#e6bccd",
  salmon: "#ff8080",
  public: "#43df2e",
  private: "#f22e35",
  background: {
    mainClosest: "#9900cc",
    mainCloser: "#730099",
    mainClose: "#39004d",
    mainMiddle: "#270033",
    mainFar: "#130019",
    mainFurther: "#0f0014",
    mainFurthers: "#0d0010",
    mainFurthest: "#0b000f",
    mainBlack: "#060009",
    success: "#0a6624",
    error: "#831621",
  },
  backgrounds: {
    type: "#410057",
    union: "#260033",
    input: "#0a4d4c",
    scalar: "#0f9535",
    interface: "#057799",
    enum: "#537915",
    directive: "#772c4a",
    extend: "#000000",
    Extend: "#000000",
    String: "#0f9535",
    Int: "#0f9535",
    Boolean: "#0f9535",
    ID: "#0f9535",
    Float: "#0f9535",
  },
  colors: {
    type: "#d966ff",
    union: "#d966ff",
    input: "#17bebb",
    scalar: "#acf7c1",
    interface: "#A3E7FC",
    enum: "#cfee9e",
    directive: "#e6bccd",
    extend: "#f18f01",
    Extend: "#f18f01",
    String: "#acf7c1",
    Int: "#acf7c1",
    Boolean: "#acf7c1",
    ID: "#acf7c1",
    Float: "#acf7c1",
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
