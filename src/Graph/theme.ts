import { DefaultDiagramTheme, DiagramTheme } from 'graphsource';
import { Colors, mix } from '../Colors';
import { fontFamily } from '../vars';
export const GraphQLColors = {
  type: Colors.main[0],
  union: Colors.main[0],
  input: Colors.blue[0],
  scalar: Colors.green[0],
  interface: mix(Colors.blue[0], Colors.grey[0]),
  enum: mix(Colors.blue[0], Colors.main[0]),
  directive: mix(Colors.main[0], Colors.grey[0]),
  extend: Colors.yellow[0],
  String: Colors.green[0],
  Int: Colors.green[0],
  Boolean: Colors.green[0],
  ID: Colors.green[0],
  Float: Colors.green[0],
} as const;
export const theme: DiagramTheme = {
  ...DefaultDiagramTheme,
  fontFamily,
  node: {
    ...DefaultDiagramTheme.node,
    nameSize: 25,
    typeSize: 21,
    width: 210,
    spacing: {
      ...DefaultDiagramTheme.node.spacing,
    },
  },
  description: {
    ...DefaultDiagramTheme.description,
  },
  menu: {
    ...DefaultDiagramTheme.menu,
  },
  help: {
    ...DefaultDiagramTheme.help,
  },
  colors: {
    ...DefaultDiagramTheme.colors,
    background: mix(Colors.grey[8], Colors.grey[9], 30.0),
    help: {
      ...DefaultDiagramTheme.colors.help,
      title: Colors.yellow[0],
    },
    port: {
      ...DefaultDiagramTheme.colors.port,
      background: mix(Colors.grey[6], Colors.grey[7]),
    },
    link: {
      ...DefaultDiagramTheme.colors.link,
      main: Colors.grey[2],
    },
    node: {
      ...DefaultDiagramTheme.colors.node,
      background: mix(Colors.grey[7], Colors.grey[8]),
      type: Colors.grey[2],
      hover: {
        type: Colors.grey[0],
      },
      types: GraphQLColors,
      options: {
        required: Colors.red[0],
        array: Colors.yellow[0],
      },
    },
    menu: {
      ...DefaultDiagramTheme.colors.menu,
      background: '#151515',
    },
  },
};
