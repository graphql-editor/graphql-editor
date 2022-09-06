import React, { useMemo } from 'react';
import { theme as MonacoTheme, diffEditorSettings } from './monaco';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { fontFamily } from '@/vars';
import { useTheme } from '@/state/containers';
import { SchemaDiffEditor } from '@/editor/code/guild';
import { CodeContainer } from '@/editor/code/style/Code';

export type DiffEditorPaneProps = {
  size: number | string;
  schema: string;
  newSchema: string;
};

/**
 * React compontent holding GraphQL IDE
 */
export const DiffEditorPane = ({ schema, newSchema }: DiffEditorPaneProps) => {
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
        <CodeContainer
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
        </CodeContainer>
      )}
    </>
  );
};
