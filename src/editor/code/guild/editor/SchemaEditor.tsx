import React, { useEffect } from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import { GraphQLError, GraphQLSchema } from 'graphql';
import {
  SchemaEditorApi,
  SchemaServicesOptions,
  useSchemaServices,
} from './use-schema-services';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { findCurrentNodeName } from '@/editor/code/guild/editor/onCursor';

export type SchemaEditorProps = SchemaServicesOptions & {
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService,
  ) => void;
} & Omit<EditorProps, 'language'> & { libraries?: string };

function BaseSchemaEditor(
  props: SchemaEditorProps,
  ref: React.ForwardedRef<SchemaEditorApi>,
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
  } = useSchemaServices(props);
  const { schemaType } = useTreesState();
  const { lockCode, grafEditorErrors, setErrorNodeNames, grafErrorSchema } =
    useErrorsState();

  useEffect(() => {
    setErrorNodeNames(undefined);
    if (languageService && lockCode && props.schema) {
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
        }),
      ).then((erroringNodes) => {
        setErrorNodeNames(erroringNodes.filter(Boolean) as string[]);
      });
    }
  }, [lockCode, grafEditorErrors, grafErrorSchema]);

  useEffect(() => {
    if (editorRef)
      editorRef?.revealPositionInCenter({ column: 0, lineNumber: 0 });
  }, [editorRef, schemaType]);

  const { theme } = useTheme();

  React.useImperativeHandle(ref, () => editorApi, [editorRef, languageService]);

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
        props.onBlur && props.onBlur(editorRef.getValue() || '');
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
      height={'auto'}
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
                        e,
                      ),
                    ],
                    newValue,
                    languageService,
                  );
                }
              }
            });
        }
      }}
      options={{ glyphMargin: true, ...(props.options || {}) }}
      language="graphql"
      value={props.schema}
    />
  );
}

export const SchemaEditor = React.forwardRef(BaseSchemaEditor);
