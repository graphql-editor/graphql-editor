import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { settings } from "./monaco";
import { useErrorsState, useTheme, useTreesState } from "@/state/containers";

import {
  LiveSchemaEditor,
  LiveSchemaEditorApi,
  LiveSchemaEditorProps,
} from "@/editor/code/guild";
import { theme as MonacoTheme } from "@/editor/code/monaco";
import {
  OperationType,
  ParserField,
  TypeSystemDefinition,
  getTypeName,
} from "graphql-js-tree";
import { CodeContainer } from "@/editor/code/style/Code";
import { Maybe } from "graphql-language-service";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { PassedSchema, dataIt } from "@/Models";
import type * as monaco from "monaco-editor";

export interface CodePaneOuterProps {
  readonly?: boolean;
}

export type CodePaneProps = Pick<LiveSchemaEditorProps, "onContentChange"> & {
  size: number | string;
  schema: PassedSchema;
  onChange: (v: string, passGraphValidation?: boolean) => void;
  onEditorMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  fullScreen?: boolean;
  disableCodePaneContextMenu?: boolean;
} & CodePaneOuterProps;

export type CodePaneApi = Pick<LiveSchemaEditorApi, "receive">;

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = React.forwardRef<CodePaneApi, CodePaneProps>(
  (props, ref) => {
    const {
      schema,
      readonly,
      onChange,
      fullScreen,
      disableCodePaneContextMenu,
    } = props;
    const { theme } = useTheme();
    const { selectedNodeId, setSelectedNodeId, allNodes } = useTreesState();
    const { errorRowNumber } = useErrorsState();
    const [temporaryString, setTemporaryString] = useState(schema.code);
    const debouncedTemporaryString = useDebouncedValue(temporaryString, 800);

    const liveEditorApi: React.ForwardedRef<LiveSchemaEditorApi> =
      React.createRef();

    const codeSettings = useMemo(
      () => ({
        ...settings,
        fontFamily: theme.fontFamily,
        readOnly: readonly,
        contextmenu: disableCodePaneContextMenu ? false : true,
      }),
      [readonly]
    );

    useEffect(() => {
      if (temporaryString !== schema.code) {
        onChange(debouncedTemporaryString, true);
      }
    }, [debouncedTemporaryString]);

    useEffect(() => {
      if (liveEditorApi.current) {
        if (selectedNodeId?.source === "code") {
          return;
        }
        selectedNodeId?.value?.name
          ? liveEditorApi.current.jumpToType(selectedNodeId.value.name)
          : liveEditorApi.current.deselect();
      }
    }, [selectedNodeId?.value?.id]);

    useEffect(() => {
      if (liveEditorApi.current && errorRowNumber) {
        liveEditorApi.current.jumpToError(errorRowNumber);
      }
    }, [errorRowNumber]);

    useImperativeHandle(
      ref,
      () => {
        return {
          receive: (e) => {
            liveEditorApi.current?.receive(e);
          },
        };
      },
      [liveEditorApi]
    );

    const selectFunction = useCallback(
      (
        e?:
          | Maybe<string>
          | Maybe<{ operation: "Query" | "Mutation" | "Subscription" }>
      ) => {
        if (fullScreen) return;
        if (e) {
          const op =
            typeof e === "object" && e.operation
              ? (e.operation.toLowerCase() as OperationType)
              : undefined;
          let n: ParserField | undefined;
          if (op) {
            const schemaNode = allNodes.nodes.find(
              (n) => n.data.type === TypeSystemDefinition.SchemaDefinition
            );
            const opArg = schemaNode?.args.find((a) => a.name === op);
            if (opArg) {
              const opType = getTypeName(opArg.type.fieldType);
              n = allNodes.nodes.find((n) => n.name === opType);
            }
          }
          n = n || allNodes.nodes.find((an) => an.name === e);
          if (n?.id === selectedNodeId?.value?.id) return;
          setSelectedNodeId({
            source: "code",
            value: n ? { id: n.id, name: n.name } : undefined,
          });
        }
      },
      [fullScreen, allNodes, selectedNodeId, setSelectedNodeId]
    );
    return (
      <CodeContainer {...dataIt("codeView")}>
        {theme && (
          <LiveSchemaEditor
            onContentChange={props.onContentChange}
            height="100%"
            ref={liveEditorApi}
            onEditorMount={props.onEditorMount}
            beforeMount={(monaco) =>
              monaco.editor.defineTheme("graphql-editor", MonacoTheme(theme))
            }
            onChange={(v) => {
              if (props.readonly) return;
              if (v === schema.code) return;
              setTemporaryString(v || "");
            }}
            onBlur={(v) => {
              if (props.readonly) return;
              if (v === schema.code) return;
              onChange(v);
            }}
            schema={schema}
            options={codeSettings}
            select={selectFunction}
          />
        )}
      </CodeContainer>
    );
  }
);
