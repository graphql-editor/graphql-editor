import { EditorTheme } from '@/Theming/DarkTheme';
import { darken, lighten, toHex } from 'color2k';
import { Colors } from '../Colors';

export const LightTheme: EditorTheme = {
  base: 'vs',
  shadow: `${toHex(darken(Colors.grey, 0.95))} 2px 2px 10px`,
  colors: {
    backgrounds: {
      type: toHex(darken(Colors.grey, 0.8)),
      union: toHex(darken(Colors.main, 0.4)),
      input: toHex(darken(Colors.blue, 0.1)),
      scalar: toHex(darken(Colors.green, 0.5)),
      interface: toHex(darken(Colors.sky, 0.4)),
      enum: toHex(darken(Colors.yellow, 0.4)),
      directive: toHex(darken(Colors.pink, 0.4)),
      extend: toHex(darken(Colors.orange, 0.5)),
      Extend: toHex(darken(Colors.orange, 0.5)),
    },
    colors: {
      type: toHex(darken(Colors.main, 0.04)),
      union: toHex(darken(Colors.main, 0.4)),
      input: toHex(darken(Colors.blue, 0.0)),
      scalar: toHex(darken(Colors.green, 0.4)),
      interface: toHex(darken(Colors.sky, 0.4)),
      enum: toHex(darken(Colors.yellow, 0.4)),
      directive: toHex(darken(Colors.pink, 0.4)),
      extend: toHex(darken(Colors.orange, 0.5)),
      Extend: toHex(darken(Colors.orange, 0.5)),
    },
    backgroundedText: Colors.grey,
    text: toHex(darken(Colors.grey, 0.95)),
    info: toHex(darken(Colors.sky, 0.2)),
    success: toHex(darken(Colors.green, 0.5)),
    error: toHex(darken(Colors.red, 0.5)),
    disabled: toHex(darken(Colors.grey, 0.55)),
    hover: toHex(darken(Colors.pink, 0.4)),
    background: {
      mainClosest: toHex(darken(Colors.grey, 0.5)),
      mainCloser: toHex(darken(Colors.grey, 0.4)),
      mainClose: toHex(darken(Colors.grey, 0.3)),
      mainFar: toHex(darken(Colors.grey, 0.05)),
      mainFurther: toHex(darken(Colors.grey, 0.03)),
      mainFurthest: toHex(Colors.grey),
      success: toHex(lighten(Colors.green, 0.02)),
      error: toHex(lighten(Colors.red, 0.1)),
    },
    grey: {
      greyClosest: toHex(darken(Colors.grey, 0.5)),
      greyCloser: toHex(darken(Colors.grey, 0.4)),
      greyClose: toHex(darken(Colors.grey, 0.3)),
      greyFar: toHex(darken(Colors.grey, 0.05)),
      greyFurther: toHex(darken(Colors.grey, 0.03)),
      greyFurthest: Colors.grey,
    },
  },
};
