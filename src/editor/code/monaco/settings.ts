import type * as monaco from 'monaco-editor';
export const settings: monaco.editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: true,
  theme: 'graphql-editor',
  smoothScrolling: true,
};
export const diffEditorSettings = (
  override: monaco.editor.IDiffEditorConstructionOptions = {},
): monaco.editor.IDiffEditorConstructionOptions => ({
  glyphMargin: true,
  renderSideBySide: true,
  smoothScrolling: true,
  ...override,
});
