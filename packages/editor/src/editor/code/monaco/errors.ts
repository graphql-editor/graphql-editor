import { themed } from "@/Theming/utils";
import { EditorError } from "graphql-editor-worker/lib/validation";
import type * as monaco from "monaco-editor";
export const mapEditorErrorToMonacoDecoration = themed(
  ({ error }) =>
    (m: typeof monaco) =>
    (e: EditorError) => {
      if (e.__typename === "local") {
        return (
          e.error.locations?.map(
            (l) =>
              ({
                range: new m.Range(l.line, l.column, l.line, 1000),
                options: {
                  className: "monacoError",
                  isWholeLine: true,
                  minimap: {
                    color: error.light,
                    position: 1,
                  },
                  hoverMessage: [
                    {
                      value: e.error.message,
                    },
                  ],
                  glyphMarginHoverMessage: {
                    value: e.error.message,
                  },
                  glyphMarginClassName: "monacoMarginError",
                },
              } as monaco.editor.IModelDeltaDecoration)
          ) || []
        );
      }

      return [
        {
          range: new m.Range(1, 1, 1, 1000),
          options: {
            className: "monacoError",
            isWholeLine: true,
            minimap: {
              color: error.light,
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
            glyphMarginClassName: "monacoMarginError",
          },
        } as monaco.editor.IModelDeltaDecoration,
      ];
    }
);
