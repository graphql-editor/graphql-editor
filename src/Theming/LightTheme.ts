import { EditorTheme } from '@/Theming/DarkTheme';
import { darken, desaturate, lighten, toHex } from 'color2k';
import { Colors } from '../Colors';

export const LightTheme: EditorTheme = {
  shadow: `${toHex(darken(Colors.grey, 0.95))} 2px 2px 10px`,
  colors: {
    backgrounds: {
      type: toHex(darken(Colors.main, 0.2)),
      union: toHex(darken(Colors.main, 0.7)),
      input: toHex(darken(Colors.blue, 0.2)),
      scalar: toHex(darken(Colors.green, 0.2)),
      interface: toHex(darken(Colors.sky, 0.2)),
      enum: toHex(darken(Colors.yellow, 0.2)),
      directive: toHex(darken(Colors.pink, 0.2)),
      extend: toHex(darken(Colors.orange, 0.2)),
      Extend: toHex(darken(Colors.orange, 0.2)),
      String: toHex(darken(Colors.green, 0.2)),
      Int: toHex(darken(Colors.green, 0.2)),
      Boolean: toHex(darken(Colors.green, 0.2)),
      ID: toHex(darken(Colors.green, 0.2)),
      Float: toHex(darken(Colors.green, 0.2)),
    },
    colors: {
      type: toHex(darken(Colors.main, 0.9)),
      union: toHex(darken(Colors.main, 0.9)),
      input: toHex(darken(Colors.blue, 0.9)),
      scalar: toHex(darken(Colors.green, 0.9)),
      interface: toHex(darken(Colors.sky, 0.9)),
      enum: toHex(darken(Colors.yellow, 0.9)),
      directive: toHex(darken(Colors.pink, 0.9)),
      extend: toHex(darken(Colors.orange, 0.9)),
      Extend: toHex(darken(Colors.orange, 0.9)),
      String: toHex(darken(Colors.green, 0.9)),
      Int: toHex(darken(Colors.green, 0.9)),
      Boolean: toHex(darken(Colors.green, 0.9)),
      ID: toHex(darken(Colors.green, 0.9)),
      Float: toHex(darken(Colors.green, 0.9)),
    },
    darkBackgrounds: {
      type: Colors.grey,
      union: toHex(darken(Colors.main, 0.9)),
      input: toHex(darken(Colors.blue, 0.8)),
      scalar: toHex(darken(Colors.green, 0.8)),
      interface: toHex(darken(Colors.sky, 0.8)),
      enum: toHex(darken(Colors.yellow, 0.8)),
      directive: toHex(darken(Colors.pink, 0.8)),
      extend: toHex(darken(Colors.orange, 0.8)),
      Extend: toHex(darken(Colors.orange, 0.8)),
      String: toHex(darken(Colors.green, 0.8)),
      Int: toHex(darken(Colors.green, 0.8)),
      Boolean: toHex(darken(Colors.green, 0.8)),
      ID: toHex(darken(Colors.green, 0.8)),
      Float: toHex(darken(Colors.green, 0.8)),
    },
    textColor: Colors.grey,
    menu: {
      background: Colors.grey,
      icon: {
        inactive: toHex(darken(Colors.grey, 0.7)),
        active: toHex(darken(Colors.pink, 0.95)),
        hover: toHex(darken(Colors.grey, 0.95)),
      },
    },
    graf: {
      root: {
        search: {
          background: `${toHex(darken(Colors.grey, 0.95))}44`,
        },
      },
      scrollbar: {
        inner: toHex(darken(Colors.main, 0.55)),
        outer: toHex(darken(Colors.grey, 0.95)),
      },
      wrapperBackground: toHex(darken(Colors.grey, 0.1)),
      background: toHex(darken(Colors.grey, 0.1)),
      rootExtendNode: {
        color: toHex(darken(Colors.grey, 0.95)),
        borderColor: toHex(darken(Colors.orange, 0.3)),
      },
      node: {
        color: toHex(darken(Colors.grey, 0.95)),
        background: toHex(darken(Colors.grey, 0.1)),
        error: { color: Colors.red },
        selected: Colors.green,
        gapBar: `${toHex(darken(Colors.grey, 0.95))}99`,
        shadow: toHex(darken(Colors.grey, 0.95)),
        iconAreaHoverBackground: `#0003`,
        interface: {
          color: toHex(darken(Colors.grey, 0.9)),
        },
        scrollbar: {
          inner: toHex(darken(Colors.grey, 0.8)),
          outer: toHex(darken(Colors.grey, 0.95)),
        },
        menu: {
          background: Colors.blue,
          color: toHex(darken(Colors.blue, 0.95)),
          item: {
            color: toHex(darken(Colors.grey, 0.95)),
            hover: toHex(darken(Colors.green, 0.3)),
          },
          scrollbar: {
            inner: toHex(darken(Colors.grey, 0.8)),
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
      background: Colors.grey,
      scrollbar: {
        inner: toHex(darken(Colors.grey, 0.8)),
        outer: toHex(darken(Colors.grey, 0.95)),
      },
      unknownField: {
        color: toHex(darken(Colors.grey, 0.95)),
        whenActiveParentBackground: Colors.main,
        whenActiveFieldPortBackground: toHex(darken(Colors.grey, 0.2)),
      },
      searchInput: {
        background: `${Colors.grey}52`,
        color: toHex(darken(Colors.grey, 0.95)),
        placeholder: toHex(darken(Colors.grey, 0.6)),
      },
      error: {
        color: Colors.pink,
        background: `${toHex(darken(Colors.red, 0.6))}ee`,
        border: Colors.red,
        lock: {
          background: `${toHex(darken(Colors.main, 0.9))}99`,
          message: {
            background: toHex(darken(Colors.main, 0.95)),
            color: Colors.red,
          },
        },
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
      },
    },
    hierarchy: {
      background: toHex(darken(Colors.grey, 0.1)),
    },
    code: {
      synchronize: {
        color: toHex(darken(Colors.main, 0.9)),
        disabled: toHex(darken(Colors.grey, 0.3)),
        ready: toHex(darken(Colors.grey, 0.95)),
        readyHover: toHex(darken(Colors.blue, 0.6)),
      },
      titleOfPane: {
        color: toHex(darken(Colors.grey, 0.6)),
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
          background: toHex(darken(Colors.main, 0.8)),
          comment: toHex(darken(Colors.blue, 0.5)),
          docs: toHex(darken(Colors.blue, 0.2)),
          text: Colors.grey,
          exclamation: toHex(lighten(Colors.yellow, 0.1)),
          keyword: Colors.green,
          gql: toHex(desaturate(Colors.yellow, 0.1)),
          md: toHex(darken(Colors.blue, 0.2)),
          insertedTextBackground: toHex(darken(Colors.main, 0.1)),
          removedTextBackground: toHex(darken(Colors.red, 0.1)),
          quote: toHex(desaturate(Colors.yellow, 0.1)),
        },
        scrollbar: {
          inner: toHex(darken(Colors.main, 0.55)),
          outer: toHex(darken(Colors.grey, 0.95)),
        },
      },
    },
  },
};
