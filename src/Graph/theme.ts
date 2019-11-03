import { DefaultDiagramTheme, DiagramTheme } from 'graphsource';
import { Colors, mix } from '../Colors';

export const theme: DiagramTheme = {
  ...DefaultDiagramTheme,
  node: {
    ...DefaultDiagramTheme.node,
    spacing: {
      ...DefaultDiagramTheme.node.spacing
    }
  },
  description: {
    ...DefaultDiagramTheme.description
  },
  menu: {
    ...DefaultDiagramTheme.menu,
    category: {
      ...DefaultDiagramTheme.menu.category,
      fontSize: '12px'
    }
  },
  help: {
    ...DefaultDiagramTheme.help
  },
  colors: {
    ...DefaultDiagramTheme.colors,
    background: Colors.grey[8],
    help: {
      ...DefaultDiagramTheme.colors.help,
      title: Colors.yellow[0]
    },
    port: {
      ...DefaultDiagramTheme.colors.port,
      background: Colors.grey[6]
    },
    link: {
      ...DefaultDiagramTheme.colors.link,
      main: Colors.grey[2]
    },
    node: {
      ...DefaultDiagramTheme.colors.node,
      background: Colors.grey[7],
      type: Colors.grey[0],
      hover: {
        type: Colors.main[0]
      },
      types: {
        type: Colors.main[0],
        union: Colors.main[0],
        input: Colors.blue[0],
        scalar: Colors.green[0],
        interface: mix(Colors.blue[0], Colors.grey[0]),
        enum: mix(Colors.blue[0], Colors.main[0]),
        directive: mix(Colors.main[0], Colors.grey[0]),
        extends: Colors.yellow[0],
        String: Colors.green[0],
        Int: Colors.green[0],
        Boolean: Colors.green[0],
        ID: Colors.green[0],
        Float: Colors.green[0]
      },
      options: {
        required: Colors.red[0],
        array: Colors.yellow[0]
      }
    }
  }
};
