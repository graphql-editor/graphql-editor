import { DefaultDiagramTheme, DiagramTheme } from 'graphsource';
import { Colors } from '@/Colors';
import { fontFamily } from '@/vars';
import { GraphQLBackgrounds, GraphQLColors } from '@/editor/theme';
export const theme: DiagramTheme = {
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
    background: Colors.main[10],
    description: {
      background: Colors.main[9],
      text: Colors.pink[0],
    },
    minimap: {
      background: Colors.main[9],
      borders: Colors.pink[2],
      node: Colors.pink[4],
      visibleArea: Colors.main[8],
    },
    help: {
      ...DefaultDiagramTheme.colors.help,
    },
    link: {
      main: Colors.pink[6],
      active: Colors.pink[0],
      hover: Colors.pink[0],
    },
    node: {
      ...DefaultDiagramTheme.colors.node,
      background: Colors.main[9],
      type: Colors.grey[2],
      hover: {
        type: Colors.grey[0],
      },
      selected: Colors.pink[0],
      types: GraphQLColors,
      backgrounds: GraphQLBackgrounds,
      options: {
        required: Colors.red[0],
        array: Colors.yellow[0],
      },
    },
  },
};
