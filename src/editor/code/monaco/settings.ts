import * as monaco from 'monaco-editor';
export const settings = (
  override: monaco.editor.IStandaloneEditorConstructionOptions = {},
): monaco.editor.IStandaloneEditorConstructionOptions => ({
  language: 'graphqle',
  glyphMargin: true,
  theme: 'graphql-editor',
});
