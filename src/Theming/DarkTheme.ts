import { EditorTheme } from '@/Theming/model';
import { Colors } from '../Colors';

export const DarkTheme: EditorTheme = {
  colors: {
    backgrounds: {
      type: Colors.main[6],
      union: Colors.main[7],
      input: Colors.blue[6],
      scalar: Colors.green[6],
      interface: Colors.sky[6],
      enum: Colors.yellow[6],
      directive: Colors.pink[6],
      extend: Colors.orange[6],
      Extend: Colors.orange[6],
      String: Colors.green[6],
      Int: Colors.green[6],
      Boolean: Colors.green[6],
      ID: Colors.green[6],
      Float: Colors.green[6],
    },
    colors: {
      type: Colors.main[0],
      union: Colors.main[0],
      input: Colors.blue[0],
      scalar: Colors.green[0],
      interface: Colors.sky[0],
      enum: Colors.yellow[0],
      directive: Colors.pink[0],
      extend: Colors.orange[0],
      Extend: Colors.orange[0],
      String: Colors.green[0],
      Int: Colors.green[0],
      Boolean: Colors.green[0],
      ID: Colors.green[0],
      Float: Colors.green[0],
    },
    darkBackgrounds: {
      type: Colors.main[8],
      union: Colors.main[9],
      input: Colors.blue[8],
      scalar: Colors.green[8],
      interface: Colors.sky[8],
      enum: Colors.yellow[8],
      directive: Colors.pink[8],
      extend: Colors.orange[8],
      Extend: Colors.orange[8],
      String: Colors.green[8],
      Int: Colors.green[8],
      Boolean: Colors.green[8],
      ID: Colors.green[8],
      Float: Colors.green[8],
    },
    textColor: Colors.grey[0],
    menu: {
      background: Colors.main[10],
      icon: {
        inactive: Colors.grey[7],
        active: Colors.pink[0],
        hover: Colors.grey[0],
      },
    },
    graf: {
      wrapperBackground: `#0b050d`,
      background: `linear-gradient(to right, #ffffff04 1px, transparent 1px), linear-gradient(to bottom, #ffffff04 1px, transparent 1px)`,
      rootExtendNode: {
        color: Colors.grey[0],
        borderColor: Colors.orange[0],
      },
      node: {
        color: Colors.grey[0],
        error: { color: Colors.red[0] },
        background: Colors.grey[9],
        scrollbar: {
          inner: Colors.grey[8],
          outer: Colors.grey[10],
        },
        interface: {
          color: Colors.grey[1],
        },
        selected: Colors.green[0],
        gapBar: `${Colors.grey[10]}99`,
        shadow: Colors.grey[10],
        iconAreaHoverBackground: `#0003`,
        menu: {
          background: Colors.blue[10],
          color: Colors.blue[0],
          borderColor: Colors.blue[0],
          item: {
            color: Colors.grey[0],
            hover: Colors.green[3],
          },
          scrollbar: {
            inner: Colors.grey[8],
            outer: Colors.grey[10],
          },
          radio: {
            color: Colors.grey[0],
            activeColor: Colors.green[0],
          },
        },
      },
    },
    relation: {
      scrollbar: {
        inner: Colors.grey[8],
        outer: Colors.grey[10],
      },
      unknownField: {
        color: Colors.grey[0],
        whenActiveParentBackground: Colors.main[3],
        whenActiveFieldPortBackground: Colors.grey[9],
      },
      searchInput: {
        background: `${Colors.main[0]}52`,
        color: Colors.grey[0],
        placeholder: Colors.grey[4],
      },
    },
    code: {
      synchronize: {
        color: Colors.green[3],
        disabled: Colors.grey[6],
        ready: Colors.grey[0],
        readyHover: Colors.green[0],
      },
      titleOfPane: {
        color: Colors.grey[4],
      },
      syncStatus: {
        background: Colors.grey[9],
        nosync: Colors.red[0],
        readonly: Colors.blue[0],
        sync: Colors.green[0],
        syncing: Colors.main[0],
      },
    },
  },
};
