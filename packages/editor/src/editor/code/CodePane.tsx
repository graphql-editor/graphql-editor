import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';

import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { OperationType } from 'graphql-js-tree';
import { CodeContainer, ErrorLock } from '@/editor/code/style/Code';
import { Maybe } from 'graphql-language-service';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';

export interface CodePaneOuterProps {
  readonly?: boolean;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string) => void;
  libraries?: string;
  fullScreen?: boolean;
} & CodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, readonly, onChange, libraries, fullScreen } = props;
  const { theme } = useTheme();
  const { selectedNode, setSelectedNode, allNodes } = useTreesState();
  const { lockCode, errorRowNumber } = useErrorsState();
  const [temporaryString, setTemporaryString] = useState(schema);
  const debouncedTemporaryString = useDebouncedValue(temporaryString, 1200);
  const [isLocalChange, setIsLocalChange] = useState(false);

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
    setIsLocalChange(false);
  }, [schema]);

  useEffect(() => {
    if (temporaryString !== schema) {
      setIsLocalChange(true);
      onChange(debouncedTemporaryString);
    }
  }, [debouncedTemporaryString]);

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

  const selectFunction = useCallback(
    (
      e?:
        | Maybe<string>
        | Maybe<{ operation: 'Query' | 'Mutation' | 'Subscription' }>,
    ) => {
      if (fullScreen) return;
      if (e) {
        const op =
          typeof e === 'object' && e.operation
            ? (e.operation.toLowerCase() as OperationType)
            : undefined;
        const n = op
          ? allNodes.nodes.find((an) => an.type.operations?.includes(op))
          : allNodes.nodes.find((an) => an.name === e);
        setSelectedNode({
          source: 'code',
          field: n,
        });
      }
    },
    [fullScreen, allNodes, setSelectedNode],
  );
  return (
    <CodeContainer>
      {theme && (
        <SchemaEditor
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
          }
          onChange={(v) => {
            if (props.readonly) return;
            if (v === schema) return;
            setTemporaryString(v || '');
          }}
          onBlur={(v) => {
            if (props.readonly) return;
            if (v === schema) return;
            onChange(v);
          }}
          schema={schema}
          libraries={libraries}
          options={codeSettings}
          select={selectFunction}
          isLocalChange={isLocalChange}
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
