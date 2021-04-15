import { mapEditorErrorToMonacoDecoration } from '@/editor/code/monaco/errors';
import { EditorError } from '@/validation';
import * as monaco from 'monaco-editor';

export const monacoSetDecorations = (
  codeErrors: EditorError[],
  monacoGql: monaco.editor.IStandaloneCodeEditor,
  decorationIds: string[],
  setDecorationIds: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const monacoDecorations = codeErrors.map(mapEditorErrorToMonacoDecoration);
  const newDecorationIds = monacoGql.deltaDecorations(
    decorationIds,
    monacoDecorations,
  );
  setDecorationIds(newDecorationIds);
};
