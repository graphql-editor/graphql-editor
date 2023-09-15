import React, { useEffect, useImperativeHandle } from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import {
  SchemaEditorApi,
  SchemaServicesOptions,
  useSchemaServices,
} from "./use-schema-services";
import { useErrorsState, useTheme } from "@/state/containers";
import { theme as MonacoTheme } from "@/editor/code/monaco";
import { findCurrentNodeName } from "@/editor/code/guild/editor/onCursor";

export type LiveSchemaEditorProps = SchemaServicesOptions & {
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
} & Omit<EditorProps, "language">;

export type LiveSchemaEditorApi = SchemaEditorApi & {
  receive: (e: monaco.editor.IModelContentChangedEvent) => void;
};

function BaseSchemaEditor(
  props: LiveSchemaEditorProps,
  ref: React.ForwardedRef<LiveSchemaEditorApi>
) {
  const {
    languageService,
    setMonaco,
    monacoRef,
    setEditor,
    editorApi,
    editorRef,
    setSchema,
    onValidate,
    receive,
  } = useSchemaServices({
    ...props,
  });
  const { grafEditorErrors, setErrorNodeNames, grafErrorSchema } =
    useErrorsState();

  useEffect(() => {
    setErrorNodeNames(undefined);
    if (languageService && props.schema) {
      Promise.all(
        grafEditorErrors.map((gee) => {
          if (grafErrorSchema && gee.row && gee.column) {
            return languageService
              .getNodeFromErrorSchema(grafErrorSchema, gee.row, gee.column)
              .then((e) => {
                if (e?.token) {
                  const node = findCurrentNodeName(e.token.state);
                  if (node) {
                    return node;
                  }
                }
              });
          }
        })
      ).then((erroringNodes) => {
        setErrorNodeNames(erroringNodes.filter(Boolean) as string[]);
      });
    }
  }, [grafEditorErrors, grafErrorSchema]);

  useEffect(() => {
    if (editorRef)
      editorRef?.revealPositionInCenter({ column: 0, lineNumber: 0 });
  }, [editorRef]);

  const { theme } = useTheme();

  useImperativeHandle(ref, () => ({ ...editorApi, receive }), [
    editorRef,
    languageService,
    receive,
  ]);

  useEffect(() => {
    if (languageService && props.onLanguageServiceReady) {
      props.onLanguageServiceReady(languageService);
    }
  }, [languageService, props.onLanguageServiceReady]);

  const [onBlurHandler, setOnBlurSubscription] =
    React.useState<monaco.IDisposable>();

  useEffect(() => {
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
      keepCurrentModel
      onValidate={onValidate}
      onChange={(newValue, ev) => {
        props.onChange && props.onChange(newValue, ev);
        if (newValue) {
          setSchema(newValue)
            .then((schema) => {
              if (schema) {
                props.onSchemaChange && props.onSchemaChange(schema, newValue);
              }
            })
            .catch((e: Error | GraphQLError) => {
              if (props.onSchemaError) {
                if (e instanceof GraphQLError) {
                  props.onSchemaError([e], newValue, languageService);
                } else {
                  props.onSchemaError(
                    [
                      new GraphQLError(
                        e.message,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        e
                      ),
                    ],
                    newValue,
                    languageService
                  );
                }
              }
            });
        }
      }}
      options={{ glyphMargin: true, ...(props.options || {}) }}
      language="graphql"
      defaultValue={props.schema?.code}
    />
  );
}

export const LiveSchemaEditor = React.forwardRef(BaseSchemaEditor);
