import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import Editor, { EditorProps, useMonaco } from "@monaco-editor/react";
import type * as monacoType from "monaco-editor";
import { buildASTSchema, GraphQLError, GraphQLSchema, parse } from "graphql";
import {
  initMonaco,
  registerMonaco,
  validateMonaco,
} from "@/GraphQLCodeEditor/monacoRegisters";
import { useTheme } from "@/state/containers";
import { PassedSchema } from "@/Models";
import { Maybe } from "graphql-language-service";
import { MonacoTheme } from "@/GraphQLCodeEditor/monaco";

export type SchemaEditorApi = {
  jumpToType(typeName: string): void;
  deselect(): void;
  jumpToError(rowNumber: number): void;
  editor?: monacoType.editor.IStandaloneCodeEditor;
  receive: (e: monacoType.editor.IModelContentChangedEvent) => void;
};

export type GraphQLCodeEditorProps = {
  schema?: PassedSchema;
  onContentChange?: (v: monacoType.editor.IModelContentChangedEvent) => void;
  select?: (
    name?:
      | Maybe<string>
      | Maybe<{ operation: "Query" | "Mutation" | "Subscription" }>
  ) => void;
  onBlur?: (value: string) => void;
  onEditorMount?: (editor: monacoType.editor.IStandaloneCodeEditor) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (errors: [GraphQLError], sdl: string) => void;
} & Omit<EditorProps, "language">;

export type GraphQLCodeEditorApi = SchemaEditorApi & {
  receive: (e: monacoType.editor.IModelContentChangedEvent) => void;
};

const GraphQLCodeEditor = React.forwardRef(
  (
    props: GraphQLCodeEditorProps,
    ref: React.ForwardedRef<GraphQLCodeEditorApi>
  ) => {
    const monaco = useMonaco();
    const { theme } = useTheme();
    const [schema, setSchema] = useState<GraphQLSchema>();
    const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor>();
    const isExternal = useRef(false);
    const [disposables, setDisposables] = useState<{
      blur?: monacoType.IDisposable;
      live?: monacoType.IDisposable;
    }>();

    const handleEditorChange = (value: string | undefined) => {
      if (!monaco) return;
      const documentNode = value ? parse(value) : undefined;
      if (!documentNode) return;
      const parsedSchema = buildASTSchema(documentNode);
      if (!parsedSchema) return;
      setSchema(parsedSchema);
      validateMonaco(monaco, parsedSchema, documentNode);
    };

    useEffect(() => {
      if (editorRef.current) {
        props.onEditorMount?.(editorRef.current);
        editorRef.current?.revealPositionInCenter({ column: 0, lineNumber: 0 });
      }
    }, [editorRef, props.onEditorMount]);

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

    useEffect(() => {
      if (!monaco || !schema) return;
      registerMonaco(monaco, schema);
    }, [monaco, schema]);

    useEffect(() => {
      if (editorRef && props.onBlur) {
        disposables?.blur?.dispose();
        const subscription = editorRef.current?.onDidBlurEditorText(() => {
          props.onBlur && props.onBlur(editorRef.current?.getValue() || "");
        });
        setDisposables((d) => ({ ...d, blur: subscription }));
      }
    }, [props.onBlur, editorRef]);

    useEffect(() => {
      disposables?.live?.dispose();
      const live = editorRef.current?.onDidChangeModelContent((e) => {
        if (isExternal.current === false) {
          props.onContentChange?.(e);
        } else {
          isExternal.current = false;
        }
      });
      setDisposables((d) => ({ ...d, live }));
    }, [props.onContentChange]);

    useImperativeHandle(ref, () => ({
      editor: editorRef.current,
      receive: (e) => {
        isExternal.current = true;
        editorRef.current?.getModel()?.applyEdits(e.changes);
      },
      jumpToType: async (typeName: string) => {
        typeName;
        // try {
        //   const schema =
        //     languageService.schema || (await languageService.getSchema());
        //   if (schema) {
        //     const type = schema.getType(typeName);
        //     if (type?.astNode?.loc) {
        //       const range = locToRange(type.astNode.loc);
        //       editorRef?.revealPositionInCenter(
        //         { column: 0, lineNumber: range.startLineNumber },
        //         0
        //       );
        //     }
        //   }
        // } catch (error) {
        //   //noop
        // }
      },
      deselect: () => {
        // editorRef.current?.setSelection(emptyLocation);
      },
      jumpToError: (lineNumber: number) => {
        editorRef.current?.setSelection({
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          endColumn: 1000,
          startColumn: 0,
        });
        editorRef.current?.revealPositionInCenter(
          {
            column: 0,
            lineNumber: lineNumber,
          },
          0
        );
      },
    }));

    return (
      <Editor
        {...props}
        beforeMount={(monaco) => {
          props.beforeMount && props.beforeMount(monaco);
        }}
        onMount={(editor, monaco) => {
          props.onMount && props.onMount(editor, monaco);
        }}
        keepCurrentModel
        height="500px"
        language="graphql"
        onChange={(e) => {
          handleEditorChange(e);
        }}
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
        defaultValue={props.schema?.code}
      />
    );
  }
);

export default GraphQLCodeEditor;
