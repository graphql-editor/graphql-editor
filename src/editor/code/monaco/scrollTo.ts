import * as monaco from 'monaco-editor';

export const monacoScrollTo = (
  monacoGql: monaco.editor.IStandaloneCodeEditor,
  scrollTo: string,
) => {
  const items = monacoGql
    .getModel()
    ?.findNextMatch(
      `${scrollTo}[ |\{]`,
      { column: 0, lineNumber: 0 },
      true,
      false,
      null,
      true,
    );
  if (items) {
    const {
      range: { startLineNumber, endLineNumber, startColumn, endColumn },
    } = items;
    monacoGql.setPosition({
      column: 0,
      lineNumber: startLineNumber,
    });
    monacoGql.setPosition({ column: 0, lineNumber: startLineNumber });
    monacoGql.revealPositionInCenter(
      { column: 0, lineNumber: startLineNumber },
      monaco.editor.ScrollType.Smooth,
    );
    monacoGql.setSelection({
      startLineNumber,
      endLineNumber,
      startColumn,
      endColumn,
    });
  }
};
