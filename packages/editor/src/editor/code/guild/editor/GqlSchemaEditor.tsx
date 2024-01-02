import React, { useEffect } from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { SchemaServicesOptions } from "./use-schema-services";
import { useTheme } from "@/state/containers";
import { theme as MonacoTheme } from "@/editor/code/monaco";
import { useGqlServices } from "@/editor/code/guild/editor/use-gql-services";

export type GqlSchemaEditorProps = SchemaServicesOptions & {
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
} & Omit<EditorProps, "language"> & {
    gql?: string;
    setGql: (gql: string) => void;
  };

function BaseGqlEditor(props: GqlSchemaEditorProps) {
  const {
    languageService,
    setMonaco,
    monacoRef,
    setEditor,
    editorRef,
    onValidate,
  } = useGqlServices(props);

  useEffect(() => {
    if (editorRef)
      editorRef?.revealPositionInCenter({ column: 0, lineNumber: 0 });
  }, [editorRef]);

  const { theme } = useTheme();

  React.useEffect(() => {
    if (languageService && props.onLanguageServiceReady) {
      props.onLanguageServiceReady(languageService);
    }
  }, [languageService, props.onLanguageServiceReady]);

  const [onBlurHandler, setOnBlurSubscription] =
    React.useState<monaco.IDisposable>();

  React.useEffect(() => {
    if (editorRef && props.onBlur) {
      onBlurHandler?.dispose();

      const subscription = editorRef.onDidBlurEditorText(() => {
        props.onBlur && props.onBlur(editorRef.getValue() || "");
      });

      setOnBlurSubscription(subscription);
    }
  }, [props.onBlur, editorRef]);

  useEffect(() => {
    if (theme && props.options?.theme) {
      monacoRef?.editor.defineTheme(props.options?.theme, MonacoTheme(theme));
    }
  }, [theme, monacoRef]);
  return (
    <MonacoEditor
      height={"auto"}
      {...props}
      beforeMount={(monaco) => {
        setMonaco(monaco);
        props.beforeMount && props.beforeMount(monaco);
      }}
      onMount={(editor, monaco) => {
        setEditor(editor);
        props.onMount && props.onMount(editor, monaco);
      }}
      onValidate={onValidate}
      onChange={(newValue, ev) => {
        props.onChange && props.onChange(newValue, ev);
        if (newValue) {
          props.setGql(newValue);
        }
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
      value={props.gql}
    />
  );
}

export const GqlSchemaEditor = React.forwardRef(BaseGqlEditor);
