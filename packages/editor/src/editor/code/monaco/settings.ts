import type { editor } from "monaco-editor";
export const settings: editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: true,
  theme: "graphql-editor",
  smoothScrolling: true,
};
export const diffEditorSettings = (
  override: editor.IDiffEditorConstructionOptions = {}
): editor.IDiffEditorConstructionOptions => ({
  glyphMargin: true,
  renderSideBySide: true,
  smoothScrolling: true,
  ...override,
});
