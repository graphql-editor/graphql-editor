import { DiffEditorPane } from '@/editor/code';
import styled from '@emotion/styled';
import React from 'react';

interface DiffEditorProps {
  schema: string;
  newSchema: string;
}

const Main = styled.div`
  display: flex;
  width: 100%;
`;

export const DiffEditor = ({ schema, newSchema }: DiffEditorProps) => {
  return (
    <Main>
      <DiffEditorPane
        schema={schema}
        newSchema={newSchema}
        size={`100vw-50px`}
      />
    </Main>
  );
};
