import * as monaco from 'monaco-editor';
import { Colors, mix } from '@/Colors';
import { GraphQLColors } from '@/editor/theme';

const docsColor = Colors.blue[2];

const rules: monaco.editor.ITokenThemeRule[] = [
  { token: '', foreground: docsColor },
  { token: 'identifier.gql', foreground: Colors.grey[0] },
  { token: 'type', foreground: GraphQLColors.type },
  { token: 'keyword', foreground: Colors.green[0] },
  { token: 'input', foreground: GraphQLColors.input },
  { token: 'interface', foreground: GraphQLColors.interface },
  { token: 'enum', foreground: GraphQLColors.enum },
  { token: 'extend', foreground: GraphQLColors.extend },
  { token: 'input', foreground: GraphQLColors.input },
  { token: 'directive', foreground: GraphQLColors.directive },
  { token: 'scalar', foreground: GraphQLColors.scalar },
  { token: 'union', foreground: GraphQLColors.union },
  { token: 'annotation', foreground: Colors.grey[1] },
  { token: 'md', foreground: Colors.blue[3] },
  { token: 'string.md', foreground: docsColor },
  { token: 'string.doc', foreground: docsColor },
  { token: 'string.gql', foreground: mix(Colors.yellow[0], Colors.grey[0]) },
  {
    token: 'string.quote.gql',
    foreground: mix(Colors.yellow[0], Colors.grey[0]),
  },
  { token: 'comment.gql', foreground: Colors.blue[3] },
  {
    token: 'exclamation',
    fontStyle: 'bold',
    foreground: mix(Colors.yellow[0], Colors.grey[0], 90.0),
  },
];

const colors: monaco.editor.IColors = {
  'editor.foreground': Colors.grey[0],
  'editor.background': `#0b050d`,
  'minimap.background': '#0b050d',
  'diffEditor.insertedTextBackground': '#ff0000',
  'diffEditor.removedTextBackground': '#28d228',
};

export const theme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules,
  colors,
};
