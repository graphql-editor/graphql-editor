import * as monaco from 'monaco-editor';
import { Colors, mix } from '../../../Colors';
import { GraphQLColors } from '../../../Graph/theme';

export const theme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
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
    { token: 'exclamation', fontStyle: 'bold', foreground: mix(Colors.yellow[0], Colors.grey[0], 90.0) },
  ],
  colors: {},
};
