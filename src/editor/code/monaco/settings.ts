import * as monaco from 'monaco-editor';
export const settings = (
  override: monaco.editor.IEditorConstructionOptions = {},
): monaco.editor.IEditorConstructionOptions => ({
  language: 'graphqle',
  glyphMargin: true,
  theme: 'graphql-editor',
});
