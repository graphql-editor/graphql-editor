import * as monaco from 'monaco-editor';
import { themed } from '@/Theming/utils';

const rules = themed<monaco.editor.ITokenThemeRule[]>(
  ({
    colors: {
      colors,
      code: {
        editor: {
          code: {
            comment,
            docs,
            exclamation,
            text,
            keyword,
            gql,
            annotation,
            md,
          },
        },
      },
    },
  }) => [
    { token: '', foreground: docs },
    { token: 'identifier.gql', foreground: text },
    { token: 'type', foreground: colors.type },
    { token: 'keyword', foreground: keyword },
    { token: 'input', foreground: colors.input },
    { token: 'interface', foreground: colors.interface },
    { token: 'enum', foreground: colors.enum },
    { token: 'extend', foreground: colors.extend },
    { token: 'input', foreground: colors.input },
    { token: 'directive', foreground: colors.directive },
    { token: 'scalar', foreground: colors.scalar },
    { token: 'union', foreground: colors.union },
    { token: 'annotation', foreground: annotation },
    { token: 'md', foreground: md },
    { token: 'string.md', foreground: docs },
    { token: 'string.doc', foreground: docs },
    { token: 'string.gql', foreground: gql },
    {
      token: 'string.quote.gql',
      foreground: gql,
    },
    { token: 'comment.gql', foreground: comment },
    {
      token: 'exclamation',
      fontStyle: 'bold',
      foreground: exclamation,
    },
  ],
);

const colors = themed<monaco.editor.IColors>(
  ({
    colors: {
      code: {
        editor: {
          code: {
            text,
            background,
            insertedTextBackground,
            removedTextBackground,
          },
        },
      },
    },
  }) => ({
    'editor.foreground': text,
    'editor.background': background,
    'minimap.background': background,
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
