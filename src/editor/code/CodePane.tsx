import cx from 'classnames';
import React, { useEffect, useMemo } from 'react';
import * as styles from './style/Code';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { themed } from '@/Theming/utils';
import { style } from 'typestyle';
import { OperationType } from 'graphql-js-tree';

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

const ErrorLock = themed(({ error, background: { mainFurthest } }) =>
  style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: mainFurthest,
    cursor: 'pointer',
    color: error,
    fontFamily,
    fontSize: 14,
    padding: 30,
  }),
);

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
    <div
      className={cx(styles.CodeContainer(theme))}
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
            if (!props.readonly) onChange(v);
          }}
          schema={schema}
          libraries={libraries}
          options={codeSettings}
          select={
            fullScreen
              ? undefined
              : (e) => {
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
        <div
          className={ErrorLock(theme)}
          onClick={() => {}}
        >{`Unable to parse GraphQL graph. Code editor is locked. Open graph editor to correct errors in GraphQL Schema. Message:\n${lockCode}`}</div>
      )}
    </div>
  );
};
