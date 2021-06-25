import cx from 'classnames';
import React, { useMemo } from 'react';
import * as styles from './style/Code';
import { theme as MonacoTheme, diffEditorSettings } from './monaco';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { fontFamily } from '@/vars';
import { useTheme } from '@/state/containers';
import { SchemaDiffEditor } from '@/editor/code/guild';

export type DiffEditorPaneProps = {
  size: number | string;
  schema: string;
  newSchema: string;
};

/**
 * React compontent holding GraphQL IDE
 */
export const DiffEditorPane = (props: DiffEditorPaneProps) => {
  const { schema, newSchema } = props;
  const { theme } = useTheme();

  const codeSettings = useMemo(
    () => ({
      ...diffEditorSettings,
      fontFamily,
    }),
    [],
  );
  return (
    <>
      {theme && (
        <div
          className={cx(styles.CodeContainer(theme))}
          data-cy={GraphQLEditorDomStructure.tree.elements.DiffEditor.name}
        >
          <SchemaDiffEditor
            height="100%"
            beforeMount={(monaco) =>
              monaco.editor.defineTheme('graphql-editor', MonacoTheme(theme))
            }
            original={schema}
            modified={newSchema}
            theme="graphql-editor"
            options={codeSettings}
          />
        </div>
      )}
    </>
  );
};
