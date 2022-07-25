import React, { useEffect } from 'react';
import { GqlCodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { useTreesState, useTheme, useLayoutState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { DarkTheme, EditorTheme } from '@/gshared/theme/DarkTheme';
import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;
`;

export interface GqlEditorProps extends Theming {
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
    code: '',
    libraries: '',
  },
  gql,
  readonly: editorReadOnly,
  theme = DarkTheme,
  setGql,
}: GqlEditorProps) => {
  const { setTheme } = useTheme();

  const { setReadonly, schemaType, readonly } = useTreesState();
  const { sidebarSize } = useLayoutState();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly, schemaType]);

  return (
    <Main
      data-cy={GraphQLEditorDomStructure.tree.editor}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <GqlCodePane
        gql={gql}
        size={sidebarSize}
        onChange={(v, isInvalid) => {
          setGql(v);
        }}
        schema={[schema.libraries || '', schema.code].join('\n')}
        placeholder={placeholder}
        readonly={readonly}
      />
    </Main>
  );
};
