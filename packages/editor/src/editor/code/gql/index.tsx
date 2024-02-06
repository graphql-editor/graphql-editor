import React, { useEffect, useMemo } from "react";
import { useErrorsState, useTheme, useTreesState } from "@/state/containers";

import { SchemaEditorApi } from "@/editor/code/guild";
import { settings, theme as MonacoTheme } from "@/editor/code/monaco";
import { GqlSchemaEditor } from "@/editor/code/guild/editor/GqlSchemaEditor";
import { CodeContainer } from "@/editor/code/style/Code";
import { PassedSchema } from "@/Models";

export interface GqlCodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type GqlCodePaneProps = {
  size: number | string;
  schema: PassedSchema;
  gql: string;
  onChange: (v: string, isInvalid?: string) => void;
} & GqlCodePaneOuterProps;

/**
 * React compontent holding GraphQL IDE
 */
export const GqlCodePane = (props: GqlCodePaneProps) => {
  const { schema, readonly, onChange, gql } = props;
  const { theme } = useTheme();
  const { selectedNodeId, setSelectedNodeId, allNodes } = useTreesState();
  const { errorRowNumber } = useErrorsState();

  const ref: React.ForwardedRef<SchemaEditorApi> = React.createRef();
  const codeSettings = useMemo(
    () => ({
      ...settings,
      fontFamily: theme.fontFamily,
      readOnly: readonly,
    }),
    [readonly]
  );

  useEffect(() => {
    if (ref.current) {
      if (selectedNodeId?.source === "code") {
        return;
      }
      selectedNodeId?.value?.name
        ? ref.current.jumpToType(selectedNodeId.value.name)
        : ref.current.deselect();
    }
  }, [selectedNodeId?.value?.id]);

  useEffect(() => {
    if (ref.current && errorRowNumber) {
      ref.current.jumpToError(errorRowNumber);
    }
  }, [errorRowNumber]);

  return (
    <CodeContainer>
      {theme && (
        <GqlSchemaEditor
          setGql={(e) => {
            onChange(e);
          }}
          gql={gql}
          height="100%"
          ref={ref}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme("graphql-editor", MonacoTheme(theme))
          }
          onChange={(v) => {
            if (!props.readonly) onChange(v || "");
          }}
          schema={schema}
          options={codeSettings}
          select={(e) => {
            if (e) {
              const n = allNodes.nodes.find((an) => an.name === e);
              setSelectedNodeId({
                source: "code",
                value: n && {
                  id: n.id,
                  name: n.name,
                },
              });
            }
          }}
        />
      )}
    </CodeContainer>
  );
};
