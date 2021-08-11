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
    textColor: Colors.grey,
    menu: {
      background: toHex(darken(Colors.main, 0.67)),
      icon: {
        inactive: toHex(darken(Colors.grey, 0.55)),
        active: Colors.pink,
        hover: Colors.grey,
      },
    },
    graf: {
      root: {
        search: {
          background: `${toHex(desaturate(Colors.main, 0.7))}11`,
        },
      },
      scrollbar: {
        inner: toHex(darken(Colors.main, 0.55)),
        outer: toHex(darken(Colors.grey, 0.95)),
      },
      wrapperBackground: darken(Colors.main, 0.65),
      rootExtendNode: {
        color: Colors.grey,
        borderColor: Colors.orange,
      },
      node: {
        color: Colors.grey,
        error: { color: Colors.red },
        background: toHex(darken(Colors.grey, 0.9)),
        scrollbar: {
          inner: toHex(darken(Colors.grey, 0.55)),
          outer: toHex(darken(Colors.grey, 0.95)),
        },
        interface: {
          color: toHex(darken(Colors.grey, 0.1)),
        },
        selected: Colors.green,
        gapBar: `${toHex(darken(Colors.grey, 0.95))}99`,
        shadow: toHex(darken(Colors.grey, 0.95)),
        iconAreaHoverBackground: `#0003`,
        menu: {
          background: toHex(darken(Colors.grey, 0.9)),
          color: Colors.blue,
          item: {
            color: Colors.grey,
            hover: toHex(darken(Colors.green, 0.3)),
          },
          scrollbar: {
            inner: toHex(darken(Colors.grey, 0.55)),
            outer: toHex(darken(Colors.grey, 0.95)),
          },
          radio: {
            color: Colors.grey,
            activeColor: Colors.green,
          },
        },
      },
    },
    relation: {
      background: toHex(darken(Colors.main, 0.65)),
      scrollbar: {
        inner: toHex(darken(Colors.main, 0.55)),
        outer: toHex(darken(Colors.grey, 0.95)),
      },
      unknownField: {
        color: Colors.grey,
        whenActiveParentBackground: toHex(darken(Colors.main, 0.3)),
        whenActiveFieldPortBackground: toHex(darken(Colors.grey, 0.9)),
      },
      node: {
        color: toHex(darken(Colors.grey, 0.1)),
        selected: {
          border: Colors.blue,
        },
        focus: {
          color: toHex(darken(Colors.grey, 0.2)),
          hover: Colors.grey,
        },
        fade: {
          background: toHex(darken(Colors.grey, 0.9)),
          title: toHex(darken(Colors.grey, 0.7)),
        },
        scalarTitle: {
          color: Colors.main,
        },
      },
      searchInput: {
        background: `${Colors.main}52`,
        color: Colors.grey,
        placeholder: toHex(darken(Colors.grey, 0.4)),
      },
      error: {
        color: Colors.pink,
        background: `${toHex(darken(Colors.red, 0.5))}ee`,
        border: Colors.red,
        lock: {
          background: `${toHex(darken(Colors.main, 0.9))}99`,
          message: {
            background: toHex(darken(Colors.main, 0.95)),
            color: Colors.red,
          },
        },
      },
    },
    hierarchy: {
      background: toHex(darken(Colors.main, 0.66)),
    },
    code: {
      synchronize: {
        color: toHex(darken(Colors.green, 0.3)),
        disabled: toHex(darken(Colors.grey, 0.5)),
        ready: Colors.grey,
        readyHover: Colors.green,
      },
      titleOfPane: {
        color: toHex(darken(Colors.grey, 0.4)),
      },
      syncStatus: {
        background: toHex(darken(Colors.grey, 0.9)),
        nosync: Colors.red,
        readonly: Colors.blue,
        sync: Colors.green,
        syncing: Colors.main,
      },
      editor: {
        code: {
          annotation: toHex(darken(Colors.grey, 0.1)),
          background: toHex(darken(Colors.main, 0.66)),
          comment: toHex(darken(desaturate(Colors.pink, 0.6), 0.3)),
          text: Colors.grey,
          exclamation: toHex(lighten(Colors.yellow, 0.1)),
          keyword: Colors.green,
          gql: toHex(darken(desaturate(Colors.sky, 0.8), 0.3)),
          insertedTextBackground: toHex(darken(Colors.green, 0.65)),
          removedTextBackground: toHex(darken(Colors.red, 0.3)),
          quote: toHex(desaturate(Colors.yellow, 0.1)),
        },
        scrollbar: {
          inner: toHex(darken(Colors.main, 0.55)),
          outer: toHex(darken(Colors.main, 0.67)),
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
