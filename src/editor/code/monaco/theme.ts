import type * as monaco from 'monaco-editor';
import { themed } from '@/Theming/utils';

const rules = themed<monaco.editor.ITokenThemeRule[]>(
  ({ colors: { colors, text, info, success, dimmed } }) => [
    { token: 'keyword.gql', foreground: info },
    { token: 'type.identifier.gql', foreground: success },
    { token: 'key.identifier.gql', foreground: text },
    { token: 'keyword', foreground: success },
    { token: 'annotation', foreground: text },
    { token: '', foreground: dimmed },
    { token: 'string.md', foreground: dimmed },
    { token: 'keyword.md', foreground: info, fontStyle: 'bold' },
    { token: 'string.gql', foreground: dimmed },
    {
      token: 'string.quote.gql',
      foreground: info,
    },
    { token: 'comment.gql', foreground: dimmed },
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
      background: { mainFurther, mainFurthest, success, error },
      text,
    },
  }) => ({
    'editor.foreground': text,
    'editor.background': mainFurthest,
    'minimap.background': mainFurther,
    'diffEditor.insertedTextBackground': success,
    'diffEditor.removedTextBackground': error,
  }),
);

export const theme = themed<monaco.editor.IStandaloneThemeData>((theme) => ({
  base: 'vs-dark',
  inherit: true,
  rules: rules(theme),
  colors: colors(theme),
}));
