import React, { useEffect } from "react";
import { DiffEditor, EditorProps, useMonaco } from "@monaco-editor/react";
import type * as monacoType from "monaco-editor";
import { initMonaco } from "@/GraphQLCodeEditor/monacoRegisters";
import { useTheme } from "@/state/containers";
import { PassedSchema } from "@/Models";
import { MonacoTheme } from "@/GraphQLCodeEditor/monaco";

export type SchemaDiffEditorProps = {
  schema?: PassedSchema;
  onEditorMount?: (editor: monacoType.editor.IStandaloneDiffEditor) => void;
  original: string;
  modified: string;
} & Omit<EditorProps, "language">;

const SchemaDiffEditor = React.forwardRef((props: SchemaDiffEditorProps) => {
  const monaco = useMonaco();
  const { theme } = useTheme();

  useEffect(() => {
    if (monaco) {
      initMonaco(monaco);
    }
  }, [monaco]);

  useEffect(() => {
    if (theme && props.options?.theme) {
      monaco?.editor.defineTheme(props.options?.theme, MonacoTheme(theme));
      monaco?.editor.setTheme(props.options.theme);
    }
  }, [theme, monaco]);

  return (
    <DiffEditor
      {...props}
      height="500px"
      onMount={() => {
        //noop
      }}
      language="graphql"
      options={{
        glyphMargin: true,
        lineNumbersMinChars: 2,
        fontSize: 11,
        minimap: {
          enabled: true,
          size: "fit",
        },
        ...(props.options || {}),
      }}
    />
  );
});

export default SchemaDiffEditor;
