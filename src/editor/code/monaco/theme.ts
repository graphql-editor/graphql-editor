import type * as monaco from 'monaco-editor';
import { themed } from '@/Theming/utils';

const rules = themed<monaco.editor.ITokenThemeRule[]>(
  ({
    colors: {
      colors,
      text,
      code: {
        editor: {
          code: { comment, exclamation, keyword, gql, annotation },
        },
      },
    },
  }) => [
    { token: 'keyword.gql', foreground: colors.interface },
    { token: 'type.identifier.gql', foreground: colors.Int },
    { token: 'key.identifier.gql', foreground: text },
    { token: 'keyword', foreground: keyword },
    { token: 'annotation', foreground: annotation },
    { token: '', foreground: gql },
    { token: 'string.md', foreground: gql },
    { token: 'keyword.md', foreground: gql, fontStyle: 'bold' },
    { token: 'string.gql', foreground: gql },
    {
      token: 'string.quote.gql',
      foreground: gql,
    },
    { token: 'comment.gql', foreground: comment },
    {
      token: 'operator.gql',
      fontStyle: 'bold',
      foreground: colors.directive,
    },
  ],
);

const colors = themed<monaco.editor.IColors>(
  ({
    colors: {
      background: { mainFurther },
      text,
      code: {
        editor: {
          code: { insertedTextBackground, removedTextBackground },
        },
      },
    },
  }) => ({
    'editor.foreground': text,
    'editor.background': mainFurther,
    'minimap.background': mainFurther,
    'diffEditor.insertedTextBackground': insertedTextBackground,
    'diffEditor.removedTextBackground': removedTextBackground,
  }),
);

export const theme = themed<monaco.editor.IStandaloneThemeData>((theme) => ({
  base: 'vs-dark',
  inherit: true,
  rules: rules(theme),
  colors: colors(theme),
}));
