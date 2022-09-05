import { DiffEditorPane } from '@/editor/code';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Parser, TreeToGraphQL } from 'graphql-js-tree';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans } from '@/vars';
import { Abc } from '@/editor/icons';
import { useTheme } from '@emotion/react';

interface DiffEditorProps {
  schemas: Record<string, string>;
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

export const DiffEditor = ({ schemas }: DiffEditorProps) => {
  const { sortAlphabetically } = useSortState();
  const { inactive, active } = useTheme();

  const [isSortActive, setIsSortActive] = useState(false);
  const [choosenLeftVersion, setChoosenLeftVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length - 1],
  );
  const [choosenRightVersion, setChoosenRightVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length],
  );

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
      <TopBar>
        <div>
          <p>SELECT VERSION:</p>
          <select onChange={(e) => setChoosenLeftVersion(e.target.value)}>
            {Object.keys(schemas).map((s) => (
              <option>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <p>SELECT VERSION:</p>
          <select onChange={(e) => setChoosenRightVersion(e.target.value)}>
            {Object.keys(schemas).map((s) => (
              <option>{s}</option>
            ))}
          </select>
        </div>
      </TopBar>
      <LineSpacer />
      <DiffEditorPane
        schema={
          isSortActive
            ? sortSchema(schemas[choosenLeftVersion])
            : schemas[choosenLeftVersion]
        }
        newSchema={
          isSortActive
            ? sortSchema(schemas[choosenRightVersion])
            : schemas[choosenRightVersion]
        }
        size={`100vw-50px`}
      />
    </Main>
  );
};
