import { DiffEditorPane } from '@/editor/code';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Parser, TreeToGraphQL } from 'graphql-js-tree';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans } from '@/vars';
import { Abc } from '@/editor/icons';
import { useTheme } from '@emotion/react';

interface DiffEditorProps {
  schema: string;
  newSchema: string;
}

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.mainFurthest};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 20px 0px;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

export const DiffEditor = ({ schema, newSchema }: DiffEditorProps) => {
  const { sortAlphabetically } = useSortState();
  const { inactive, active } = useTheme();

  const [isSortActive, setIsSortActive] = useState(false);

  const sortSchema = (schema: string) => {
    const tree = Parser.parse(schema);
    tree.nodes.sort(sortAlphabetically);
    tree.nodes = tree.nodes.filter(
      (n) => n.args?.sort(sortAlphabetically) && n,
    );
    return TreeToGraphQL.parse(tree);
  };

  return (
    <Main>
      <TopBar>
        <Heading>DIFF VIEW</Heading>
        <div onClick={() => setIsSortActive((s) => !s)}>
          <Abc size={28} fill={isSortActive ? active : inactive} />
        </div>
      </TopBar>
      <LineSpacer />
      <DiffEditorPane
        schema={isSortActive ? sortSchema(schema) : schema}
        newSchema={isSortActive ? sortSchema(newSchema) : newSchema}
        size={`100vw-50px`}
      />
    </Main>
  );
};
