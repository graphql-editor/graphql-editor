import cx from 'classnames';
import React, { useEffect, useMemo } from 'react';
import * as styles from './style/Code';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import {
  useErrorsState,
  useNavigationState,
  useTheme,
  useTreesState,
} from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';
import { themed } from '@/Theming/utils';
import { darken, toHex } from 'color2k';
import { style } from 'typestyle';

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string, isInvalid?: boolean) => void;
  libraries?: string;
} & CodePaneOuterProps;

const ErrorLock = themed(({ background: { mainFurthest } }) =>
  style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: `${toHex(darken(mainFurthest, 0.9))}99`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);
const ErrorLockMessage = themed(({ error, background: { mainFurthest } }) =>
  style({
    width: `clamp(200px, 50vw, 500px)`,
    fontFamily,
    fontSize: 14,
    padding: 30,
    color: error,
    background: mainFurthest,
  }),
);
/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, readonly, onChange, libraries } = props;
  const { theme } = useTheme();
  const { selectedNode } = useTreesState();
  const { setMenuState } = useNavigationState();
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
      selectedNode
        ? ref.current.jumpToType(selectedNode.name)
        : ref.current.deselect();
    }
  }, [selectedNode]);

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
          onBlur={(v) => onChange(v)}
          schema={schema}
          libraries={libraries}
          options={codeSettings}
        />
      )}

      {lockCode && (
        <div
          className={ErrorLock(theme)}
          onClick={() => {
            setMenuState('code-diagram');
          }}
        >
          <div
            className={ErrorLockMessage(theme)}
          >{`Unable to parse GraphQL graph. Code editor is locked. Open graph editor to correct errors in GraphQL Schema`}</div>
        </div>
      )}
    </div>
  );
};
