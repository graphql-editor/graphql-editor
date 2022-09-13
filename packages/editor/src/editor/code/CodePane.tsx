import React, { useEffect, useMemo } from 'react';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { OperationType } from 'graphql-js-tree';
import { CodeContainer, ErrorLock } from '@/editor/code/style/Code';

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string, isInvalid?: string) => void;
  libraries?: string;
  fullScreen?: boolean;
} & CodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, readonly, onChange, libraries, fullScreen } = props;
  const { theme } = useTheme();
  const { selectedNode, setSelectedNode, tree, libraryTree } = useTreesState();
  const { lockCode, errorRowNumber } = useErrorsState();

  const ref: React.ForwardedRef<SchemaEditorApi> = React.createRef();
  const codeSettings = useMemo(
    () => ({
      ...settings,
      fontFamily,
      readOnly: readonly,
    }),
    [readonly],
  );

  useEffect(() => {
    if (ref.current) {
      if (selectedNode?.source === 'code') {
        return;
      }
      selectedNode?.field?.name
        ? ref.current.jumpToType(selectedNode.field.name)
        : ref.current.deselect();
    }
  }, [selectedNode]);

  useEffect(() => {
    if (ref.current && errorRowNumber) {
      ref.current.jumpToError(errorRowNumber);
    }
  }, [errorRowNumber]);

  return (
    <CodeContainer
      data-cy={GraphQLEditorDomStructure.tree.elements.CodePane.name}
    >
      {theme && (
        <SchemaEditor
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
          }
          onBlur={(v) => {
            if (props.readonly) return;
            if (v === schema) return;
            onChange(v);
          }}
          schema={schema}
          libraries={libraries}
          options={codeSettings}
          select={
            fullScreen
              ? undefined
              : (e) => {
                  console.log('node name', e);

                  if (e) {
                    const allNodes = tree.nodes.concat(libraryTree.nodes);
                    const op =
                      typeof e === 'object' && e.operation
                        ? (e.operation.toLowerCase() as OperationType)
                        : undefined;
                    const n = op
                      ? allNodes.find((an) => an.type.operations?.includes(op))
                      : allNodes.find((an) => an.name === e);
                    setSelectedNode({
                      source: 'code',
                      field: n,
                    });
                  }
                }
          }
        />
      )}
      {lockCode && (
        <ErrorLock
          onClick={() => {}}
        >{`Unable to parse GraphQL graph. Code editor is locked. Open graph editor to correct errors in GraphQL Schema. Message:\n${lockCode}`}</ErrorLock>
      )}
    </CodeContainer>
  );
};
