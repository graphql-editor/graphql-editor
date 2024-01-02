import * as React from "react";
import { DiffEditor, DiffEditorProps } from "@monaco-editor/react";
import {
  SchemaEditorApi,
  SchemaServicesOptions,
  useSchemaServices,
} from "./use-schema-services";

export type SchemaDiffEditorProps = SchemaServicesOptions &
  Omit<DiffEditorProps, "language"> & { libraries?: string };

function BaseSchemaDiffEditor(
  props: SchemaDiffEditorProps,
  ref: React.ForwardedRef<{
    original: SchemaEditorApi;
    modified: SchemaEditorApi;
  }>
) {
  const originalSchemaService = useSchemaServices({
    ...props,
  });
  const modifiedSchemaService = useSchemaServices({
    ...props,
  });

  React.useImperativeHandle(
    ref,
    () => ({
      original: originalSchemaService.editorApi,
      modified: originalSchemaService.editorApi,
    }),
    [
      originalSchemaService.editorRef,
      modifiedSchemaService.editorRef,
      originalSchemaService.languageService,
      modifiedSchemaService.languageService,
    ]
  );

  return (
    <DiffEditor
      height={"70vh"}
      {...props}
      beforeMount={(monaco) => {
        originalSchemaService.setMonaco(monaco);
        modifiedSchemaService.setMonaco(monaco);
        props.beforeMount && props.beforeMount(monaco);
      }}
      onMount={(editor, monaco) => {
        originalSchemaService.setEditor(editor.getOriginalEditor());
        modifiedSchemaService.setEditor(editor.getModifiedEditor());
        props.onMount && props.onMount(editor, monaco);
      }}
      options={{
        glyphMargin: true,
        lineNumbersMinChars: 2,
        minimap: {
          enabled: true,
          size: "fit",
        },
        ...(props.options || {}),
      }}
      language="graphql"
    />
  );
}

export const SchemaDiffEditor = React.forwardRef(BaseSchemaDiffEditor);
