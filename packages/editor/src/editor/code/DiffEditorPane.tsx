import React, { useMemo } from "react";
import { useTheme } from "@/state/containers";
import { CodeContainer } from "@/editor/code/style/Code";
import { dataIt } from "@/Models";
import SchemaDiffEditor from "@/GraphQLCodeEditor/SchemaDiffEditor";
import { diffEditorSettings, MonacoTheme } from "@/GraphQLCodeEditor/monaco";

export interface DiffSchema {
  name: string;
  content: string;
}
export type DiffEditorPaneProps = {
  size: number | string;
  schema: DiffSchema;
  newSchema: DiffSchema;
};

/**
 * React component holding GraphQL IDE
 */
export const DiffEditorPane = ({ schema, newSchema }: DiffEditorPaneProps) => {
  const { theme } = useTheme();

  const codeSettings = useMemo(
    () => ({
      ...diffEditorSettings,
      fontFamily: theme.fontFamily,
    }),
    []
  );
  return (
    <>
      {theme && (
        <CodeContainer {...dataIt("diffView")}>
          <SchemaDiffEditor
            height="100%"
            beforeMount={(monaco) =>
              monaco.editor.defineTheme("graphql-editor", MonacoTheme(theme))
            }
            original={newSchema.content}
            modified={schema.content}
            theme="graphql-editor"
            options={{
              ...codeSettings,
            }}
          />
        </CodeContainer>
      )}
    </>
  );
};
