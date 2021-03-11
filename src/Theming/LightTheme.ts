import { EditorTheme } from '@/Theming/model';
import { Colors } from '../Colors';

export const LightTheme: EditorTheme = {
  colors: {
    backgrounds: {
      type: Colors.main[2],
      union: Colors.main[7],
      input: Colors.blue[2],
      scalar: Colors.green[2],
      interface: Colors.sky[2],
      enum: Colors.yellow[2],
      directive: Colors.pink[2],
      extend: Colors.orange[2],
      Extend: Colors.orange[2],
      String: Colors.green[2],
      Int: Colors.green[2],
      Boolean: Colors.green[2],
      ID: Colors.green[2],
      Float: Colors.green[2],
    },
    colors: {
      type: Colors.main[9],
      union: Colors.main[9],
      input: Colors.blue[9],
      scalar: Colors.green[9],
      interface: Colors.sky[9],
      enum: Colors.yellow[9],
      directive: Colors.pink[9],
      extend: Colors.orange[9],
      Extend: Colors.orange[9],
      String: Colors.green[9],
      Int: Colors.green[9],
      Boolean: Colors.green[9],
      ID: Colors.green[9],
      Float: Colors.green[9],
    },
    darkBackgrounds: {
      type: Colors.main[0],
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
      background: Colors.grey[0],
      icon: {
        inactive: Colors.grey[7],
        active: Colors.pink[10],
        hover: Colors.grey[10],
      },
    },
    graf: {
      wrapperBackground: Colors.grey[1],
      background: Colors.grey[1],
      rootExtendNode: {
        color: Colors.grey[10],
        borderColor: Colors.orange[3],
      },
      node: {
        color: Colors.grey[10],
        background: Colors.grey[1],
        error: { color: Colors.red[0] },
        selected: Colors.green[0],
        gapBar: `${Colors.grey[10]}99`,
        shadow: Colors.grey[10],
        iconAreaHoverBackground: `#0003`,
        interface: {
          color: Colors.grey[9],
        },
        scrollbar: {
          inner: Colors.grey[8],
          outer: Colors.grey[10],
        },
        menu: {
          background: Colors.blue[0],
          color: Colors.blue[10],
          borderColor: Colors.blue[10],
          item: {
            color: Colors.grey[10],
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
        color: Colors.grey[10],
        whenActiveParentBackground: Colors.main[0],
        whenActiveFieldPortBackground: Colors.grey[2],
      },
      searchInput: {
        background: `${Colors.grey[0]}52`,
        color: Colors.grey[10],
        placeholder: Colors.grey[6],
      },
    },
    code: {
      synchronize: {
        color: Colors.main[9],
        disabled: Colors.grey[3],
        ready: Colors.grey[10],
        readyHover: Colors.blue[6],
      },
      titleOfPane: {
        color: Colors.grey[6],
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
