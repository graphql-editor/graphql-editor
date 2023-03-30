import type * as monaco from 'monaco-editor';
import { themed } from '@/Theming/utils';

const rules = themed<monaco.editor.ITokenThemeRule[]>(
  ({ colors, text, accents }) => [
    { token: 'keyword.gql', foreground: accents[100] },
    { token: 'type.identifier.gql', foreground: accents[200] },
    { token: 'key.identifier.gql', foreground: text.active },
    { token: 'keyword', foreground: accents[100] },
    { token: 'annotation', foreground: text.default },
    { token: '', foreground: text.active },
    { token: 'string.md', foreground: text.default },
    { token: 'keyword.md', foreground: accents[100], fontStyle: 'bold' },
    { token: 'string.gql', foreground: text.default },
    { token: 'number.gql', foreground: text.contrast },
    { token: 'delimiter.square.gql', foreground: accents[500] },
    { token: 'delimiter.curly.gql', foreground: accents[500] },
    { token: 'delimiter.parenthesis.gql', foreground: accents[500] },
    {
      token: 'string.quote.gql',
      foreground: text.default,
    },
    { token: 'comment.gql', foreground: text.default },
    {
      token: 'operator.gql',
      fontStyle: 'bold',
      foreground: accents[300],
    },
  ],
);

const colors = themed<monaco.editor.IColors>(
  ({ neutral, text, error, colors: { scalar } }) => ({
    'editor.foreground': text.active,
    'editor.background': neutral[600],
    'minimap.background': neutral[600],
    'diffEditor.insertedTextBackground': `${scalar}22`,
    'diffEditor.removedTextBackground': `${error.dark}22`,
  }),
);

export const theme = themed<monaco.editor.IStandaloneThemeData>((theme) => ({
  base: 'vs-dark',
  inherit: true,
  rules: rules(theme),
  colors: colors(theme),
}));
