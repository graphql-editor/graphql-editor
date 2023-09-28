import { mapEditorErrorToMonacoDecoration } from "@/editor/code/monaco/errors";
import { themed } from "@/Theming/utils";
import { EditorError } from "graphql-editor-worker/lib/validation";
import type * as monaco from "monaco-editor";

export const monacoSetDecorations = themed(
  (theme) =>
    ({
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
      const monacoDecorations = codeErrors.flatMap(
        mapEditorErrorToMonacoDecoration(theme)(m)
      );
      const newDecorationIds = monacoGql.deltaDecorations(
        decorationIds,
        monacoDecorations
      );
      return newDecorationIds;
    }
);
