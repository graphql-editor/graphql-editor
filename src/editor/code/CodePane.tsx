import cx from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { settings } from './monaco';
import { fontFamily } from '@/vars';
import { useTheme, useTreesState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SchemaEditorApi, SchemaEditor } from '@/editor/code/guild';
import { theme as MonacoTheme } from '@/editor/code/monaco';

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string, isInvalid?: boolean) => void;
  libraries?: string;
  scrollTo?: string;
} & CodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, readonly, onChange } = props;
  const { theme } = useTheme();
  const { selectedNode } = useTreesState();

  const ref: React.ForwardedRef<SchemaEditorApi> = React.createRef();
  const syncStatus = readonly ? StatusDotProps.readonly : StatusDotProps.sync;
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
    <>
      <TitleOfPane>
        <div
          className={cx(styles.Generate(theme), {
            disabled: !readonly,
          })}
        >
          {readonly ? 'readonly' : ''}
        </div>
        <StatusDot status={syncStatus} />
      </TitleOfPane>
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
            options={codeSettings}
          />
        )}
      </div>
    </>
  );
};
