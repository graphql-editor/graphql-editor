import React, { useEffect } from "react";
import { GqlCodePane } from "./code";
import { PassedSchema } from "@/Models";
import { useTreesState, useTheme, useLayoutState } from "@/state/containers";

import { EditorTheme } from "@/gshared/theme/MainTheme";
import styled from "@emotion/styled";

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;
`;

export interface GqlEditorProps {
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  gql: string;
  setGql: (gql: string) => void;
  theme?: EditorTheme;
}

export const GqlEditor = ({
  placeholder,
  schema = {
    code: "",
    libraries: "",
    source: "outside",
  },
  gql,
  readonly: editorReadOnly,
  theme,
  setGql,
}: GqlEditorProps) => {
  const { setTheme } = useTheme();

  const { setReadonly, readonly } = useTreesState();
  const { sidebarSize } = useLayoutState();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly]);

  return (
    <Main
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <GqlCodePane
        gql={gql}
        size={sidebarSize}
        onChange={(v) => {
          setGql(v);
        }}
        schema={schema}
        placeholder={placeholder}
        readonly={readonly}
      />
    </Main>
  );
};
