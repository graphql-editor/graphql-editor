import cx from 'classnames';
import React, { useEffect, useMemo } from 'react';
import * as styles from '../style/Code';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SchemaEditorApi } from '@/editor/code/guild';
import { settings, theme as MonacoTheme } from '@/editor/code/monaco';
import { themed } from '@/Theming/utils';
import { style } from 'typestyle';
import { GqlSchemaEditor } from '@/editor/code/guild/editor/GqlSchemaEditor';

export interface GqlCodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type GqlCodePaneProps = {
  size: number | string;
  schema: string;
  gql: string;
  onChange: (v: string, isInvalid?: string) => void;
  libraries?: string;
} & GqlCodePaneOuterProps;

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
export const GqlCodePane = (props: GqlCodePaneProps) => {
  const { schema, readonly, onChange, gql } = props;
  const { theme } = useTheme();
  const {
    selectedNode,
    setSelectedNode,
    checkRelatedNodes,
    tree,
    libraryTree,
  } = useTreesState();
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
      selectedNode?.field.name
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
        <GqlSchemaEditor
          setGql={(e) => {
            onChange(e);
          }}
          gql={gql}
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
          }
          onChange={(v) => {
            if (!props.readonly) onChange(v || '');
          }}
          schema={schema}
          options={codeSettings}
          select={(e) => {
            if (e) {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              const n = allNodes.find((an) => an.name === e);
              checkRelatedNodes(n);
              setSelectedNode(
                n && {
                  source: 'code',
                  field: n,
                },
              );
            }
          }}
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
