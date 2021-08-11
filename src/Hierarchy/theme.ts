import { DefaultDiagramTheme, DiagramTheme } from 'graphsource';
import { Colors } from '@/Colors';
import { fontFamily } from '@/vars';
import { darken, toHex } from 'color2k';
import { themed } from '@/Theming/utils';
export const theme = themed<DiagramTheme>(
  ({
    colors: {
      colors,
      backgrounds,
      hierarchy: { background },
    },
  }) => ({
    ...DefaultDiagramTheme,
    fontFamily,
    node: {
      ...DefaultDiagramTheme.node,
      nameSize: 25,
      typeSize: 21,
      width: 280,
      spacing: {
        ...DefaultDiagramTheme.node.spacing,
      },
    },
    description: {
      ...DefaultDiagramTheme.description,
    },
    help: {
      ...DefaultDiagramTheme.help,
    },
    colors: {
      background,
      description: {
        background: toHex(darken(Colors.main, 0.9)),
        text: Colors.pink,
      },
      minimap: {
        background: toHex(darken(Colors.main, 0.9)),
        borders: toHex(darken(Colors.pink, 0.2)),
        node: toHex(darken(Colors.pink, 0.4)),
        visibleArea: toHex(darken(Colors.main, 0.8)),
      },
      help: {
        ...DefaultDiagramTheme.colors.help,
      },
      link: {
        main: toHex(darken(Colors.pink, 0.6)),
        active: Colors.pink,
        hover: Colors.pink,
      },
      node: {
        ...DefaultDiagramTheme.colors.node,
        background: toHex(darken(Colors.main, 0.5)),
        type: toHex(darken(Colors.grey, 0.2)),
        hover: {
          type: Colors.grey,
        },
        selected: Colors.pink,
        types: colors,
        backgrounds: backgrounds,
        options: {
          required: Colors.red,
          array: Colors.yellow,
        },
      },
    },
  }),
);
