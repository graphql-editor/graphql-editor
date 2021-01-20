import * as monaco from 'monaco-editor';
export const settings = (
  override: monaco.editor.IStandaloneEditorConstructionOptions = {},
): monaco.editor.IStandaloneEditorConstructionOptions => ({
  language: 'graphqle',
  glyphMargin: true,
  theme: 'graphql-editor',
  smoothScrolling: true,
  ...override,
});
export const diffEditorSettings = (
  override: monaco.editor.IDiffEditorConstructionOptions = {},
): monaco.editor.IDiffEditorConstructionOptions => ({
  glyphMargin: true,
  theme: 'graphql-editor',
  renderSideBySide: true,
  extraEditorClassName: 'Dupa',
  smoothScrolling: true,
  ...override,
});
