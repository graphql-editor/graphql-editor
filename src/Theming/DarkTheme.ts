import { darken, toHex } from 'color2k';
import { Colors } from '../Colors';
import type * as monaco from 'monaco-editor';

const BaseTheme = {
  base: 'vs-dark' as monaco.editor.IStandaloneThemeData['base'],
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
    },
    backgroundedText: Colors.grey,
    text: Colors.grey,
    info: Colors.sky,
    success: Colors.green,
    error: Colors.red,
    disabled: toHex(darken(Colors.grey, 0.55)),
    hover: Colors.pink,
    background: {
      mainClosest: toHex(darken(Colors.main, 0.3)),
      mainCloser: toHex(darken(Colors.main, 0.4)),
      mainClose: toHex(darken(Colors.main, 0.55)),
      mainFar: darken(Colors.main, 0.65),
      mainFurther: toHex(darken(Colors.main, 0.66)),
      mainFurthest: toHex(darken(Colors.main, 0.67)),
      success: toHex(darken(Colors.green, 0.6)),
      error: toHex(darken(Colors.red, 0.25)),
    },
    grey: {
      greyClosest: toHex(darken(Colors.grey, 0.3)),
      greyCloser: toHex(darken(Colors.grey, 0.4)),
      greyClose: toHex(darken(Colors.grey, 0.5)),
      greyFar: toHex(darken(Colors.grey, 0.7)),
      greyFurther: toHex(darken(Colors.grey, 0.9)),
      greyFurthest: toHex(darken(Colors.grey, 0.95)),
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
