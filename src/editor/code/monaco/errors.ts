import { themed } from '@/Theming/utils';
import { EditorError } from '@/validation';
import type * as monaco from 'monaco-editor';
export const mapEditorErrorToMonacoDecoration = themed(
  ({ error }) =>
    (m: typeof monaco) =>
    (e: EditorError) =>
      ({
        range: new m.Range(e.row + 1, 1, e.row + 1, 1000),
        options: {
          className: 'monacoError',
          isWholeLine: true,
          minimap: {
            color: error,
            position: 1,
          },
          hoverMessage: [
            {
              value: e.text,
            },
          ],
          glyphMarginHoverMessage: {
            value: e.text,
          },
          glyphMarginClassName: 'monacoMarginError',
        },
      } as monaco.editor.IModelDeltaDecoration),
);
