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

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string, isInvalid?: string) => void;
  libraries?: string;
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
  const { schema, readonly, onChange, libraries } = props;
  const { theme } = useTheme();
  const {
    selectedNode,
    setSelectedNode,
    tree,
    libraryTree,
    isSelectedFromCode,
    setIsSelectedFromCode,
  } = useTreesState();
  const { lockCode } = useErrorsState();

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
      if (isSelectedFromCode) {
        return;
      }
      selectedNode
        ? ref.current.jumpToType(selectedNode.name)
        : ref.current.deselect();
    }
  }, [selectedNode, isSelectedFromCode]);

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
          select={(e) => {
            if (e) {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              const n = allNodes.find((an) => an.name === e);
              setIsSelectedFromCode(true);
              setSelectedNode(n);
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
