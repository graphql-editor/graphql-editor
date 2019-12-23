import * as monaco from 'monaco-editor';
import { Colors } from '../../../Colors';
import { EditorError } from '../../../validation';
export const mapEditorErrorToMonacoDecoration = (e: EditorError) =>
  ({
    range: new monaco.Range(e.row + 1, 1, e.row + 1, 1000),
    options: {
      className: 'monacoError',
      isWholeLine: true,
      minimap: {
        color: Colors.red[0],
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
  } as monaco.editor.IModelDeltaDecoration);
