import React from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import { GraphQLError, GraphQLSchema } from 'graphql';
import {
  SchemaEditorApi,
  SchemaServicesOptions,
  useSchemaServices,
} from './use-schema-services';

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
    setEditor,
    editorApi,
    editorRef,
    setSchema,
    onValidate,
  } = useSchemaServices(props);
  React.useImperativeHandle(ref, () => editorApi, [editorRef, languageService]);

  React.useEffect(() => {
    if (languageService && props.onLanguageServiceReady) {
      props.onLanguageServiceReady(languageService);
    }
  }, [languageService, props.onLanguageServiceReady]);

  const [
    onBlurHandler,
    setOnBlurSubscription,
  ] = React.useState<monaco.IDisposable>();

  React.useEffect(() => {
    if (editorRef && props.onBlur) {
      onBlurHandler?.dispose();

      const subscription = editorRef.onDidBlurEditorText(() => {
        props.onBlur && props.onBlur(editorRef.getValue() || '');
      });

      setOnBlurSubscription(subscription);
    }
  }, [props.onBlur, editorRef]);

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
