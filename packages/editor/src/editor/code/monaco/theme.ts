import type * as monaco from 'monaco-editor';
import { themed } from '@/Theming/utils';

const rules = themed<monaco.editor.ITokenThemeRule[]>(
  ({ colors, text, info, success, inactive }) => [
    { token: 'keyword.gql', foreground: info },
    { token: 'type.identifier.gql', foreground: info },
    { token: 'key.identifier.gql', foreground: text },
    { token: 'keyword', foreground: info },
    { token: 'annotation', foreground: text },
    { token: '', foreground: inactive },
    { token: 'string.md', foreground: inactive },
    { token: 'keyword.md', foreground: info, fontStyle: 'bold' },
    { token: 'string.gql', foreground: inactive },
    {
      token: 'string.quote.gql',
      foreground: info,
    },
    { token: 'comment.gql', foreground: inactive },
    {
      token: 'operator.gql',
      fontStyle: 'bold',
      foreground: colors.directive,
    },
  ],
);

const colors = themed<monaco.editor.IColors>(
  ({ background: { mainFurther, error }, text, backgrounds: { scalar } }) => ({
    'editor.foreground': text,
    'editor.background': mainFurther,
    'minimap.background': mainFurther,
    'diffEditor.insertedTextBackground': scalar,
    'diffEditor.removedTextBackground': error,
  }),
);

export const theme = themed<monaco.editor.IStandaloneThemeData>((theme) => ({
  base: 'vs-dark',
  inherit: true,
  rules: rules(theme),
  colors: colors(theme),
}));
