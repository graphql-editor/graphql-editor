import { darken, desaturate, lighten, toHex } from 'color2k';
import { Colors } from '../Colors';

const BaseTheme = {
  shadow: `${toHex(darken(Colors.grey, 0.95))} 2px 2px 10px`,
  colors: {
    backgrounds: {
      type: toHex(darken(Colors.main, 0.53)),
      union: toHex(darken(Colors.main, 0.6)),
      input: toHex(darken(Colors.blue, 0.25)),
      scalar: toHex(darken(Colors.green, 0.5)),
      interface: toHex(darken(Colors.sky, 0.5)),
      enum: toHex(darken(Colors.yellow, 0.5)),
      directive: toHex(darken(Colors.pink, 0.5)),
      extend: toHex(darken(Colors.orange, 0.5)),
      Extend: toHex(darken(Colors.orange, 0.5)),
      String: toHex(darken(Colors.green, 0.5)),
      Int: toHex(darken(Colors.green, 0.5)),
      Boolean: toHex(darken(Colors.green, 0.5)),
      ID: toHex(darken(Colors.green, 0.5)),
      Float: toHex(darken(Colors.green, 0.5)),
    },
    colors: {
      type: Colors.main,
      union: Colors.main,
      input: Colors.blue,
      scalar: Colors.green,
      interface: Colors.sky,
      enum: Colors.yellow,
      directive: Colors.pink,
      extend: Colors.orange,
      Extend: Colors.orange,
      String: Colors.green,
      Int: Colors.green,
      Boolean: Colors.green,
      ID: Colors.green,
      Float: Colors.green,
    },
    text: Colors.grey,
    info: Colors.blue,
    success: Colors.green,
    error: Colors.red,
    disabled: toHex(darken(Colors.grey, 0.55)),
    hover: Colors.pink,
    background: {
      mainClosest: toHex(darken(Colors.main, 0.55)),
      mainFar: darken(Colors.main, 0.65),
      mainFurther: toHex(darken(Colors.main, 0.66)),
      mainFurthest: toHex(darken(Colors.main, 0.67)),
    },
    grey: {
      greyFar: toHex(darken(Colors.grey, 0.7)),
      greyFurther: toHex(darken(Colors.grey, 0.9)),
      greyFurthest: toHex(darken(Colors.grey, 0.95)),
    },
    graf: {
      node: {
        gapBar: `${toHex(darken(Colors.grey, 0.95))}99`,
        iconAreaHoverBackground: `#0003`,
      },
    },
    relation: {
      unknownField: {
        whenActiveParentBackground: toHex(darken(Colors.main, 0.3)),
      },
    },
    code: {
      editor: {
        code: {
          annotation: toHex(darken(Colors.grey, 0.1)),
          comment: toHex(darken(desaturate(Colors.pink, 0.6), 0.3)),
          exclamation: toHex(lighten(Colors.yellow, 0.1)),
          keyword: Colors.green,
          gql: toHex(darken(desaturate(Colors.sky, 0.8), 0.3)),
          insertedTextBackground: toHex(darken(Colors.green, 0.65)),
          removedTextBackground: toHex(darken(Colors.red, 0.3)),
          quote: toHex(desaturate(Colors.yellow, 0.1)),
        },
      },
    },
  },
};

type ToThemeDict<T> = {
  [P in keyof T]: T[P] extends string
    ? string
    : T[P] extends Record<string, any>
    ? ToThemeDict<T[P]>
    : never;
};
export type EditorTheme = ToThemeDict<typeof BaseTheme>;
export const DarkTheme = BaseTheme as EditorTheme;
