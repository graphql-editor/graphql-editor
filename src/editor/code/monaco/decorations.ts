import { mapEditorErrorToMonacoDecoration } from '@/editor/code/monaco/errors';
import { EditorError } from '@/validation';
import type * as monaco from 'monaco-editor';

export const monacoSetDecorations = ({
  codeErrors,
  decorationIds,
  monacoGql,
  m,
}: {
  m: typeof monaco;
  codeErrors: EditorError[];
  monacoGql: monaco.editor.IStandaloneCodeEditor;
  decorationIds: string[];
}) => {
  const monacoDecorations = codeErrors.map(mapEditorErrorToMonacoDecoration(m));
  const newDecorationIds = monacoGql.deltaDecorations(
    decorationIds,
    monacoDecorations,
  );
  return newDecorationIds;
};
