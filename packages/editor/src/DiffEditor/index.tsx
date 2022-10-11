import { DiffEditorPane } from '@/editor/code';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Parser, TreeToGraphQL } from 'graphql-js-tree';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans } from '@/vars';
import { Abc } from '@/editor/icons';
import { useTheme } from '@emotion/react';
import { Select } from '@/shared/components/Select';

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
  position: relative;
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

const Selects = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  right: 16px;
  position: absolute;
`;

const AZContainer = styled.div`
  display: flex;
`;

export const DiffEditor = ({ schemas }: DiffEditorProps) => {
  const { sortAlphabetically } = useSortState();
  const { inactive, active } = useTheme();
  const [isSortActive, setIsSortActive] = useState(true);
  const [leftVersion, setLeftVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length - 1],
  );
  const [rightVersion, setRightVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length - 2],
  );

  const selectOptions = Object.keys(schemas).map((el) => {
    return {
      label: el,
      value: el,
    };
  });

  const sortSchema = (schema: string) => {
    if (!schema) return '';
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
        <Selects>
          <Select
            options={selectOptions}
            onChange={setLeftVersion}
            placeholder="Select version..."
            value={leftVersion}
          />
          <Select
            options={selectOptions}
            onChange={setRightVersion}
            placeholder="Select version..."
            value={rightVersion}
          />
        </Selects>
        <AZContainer onClick={() => setIsSortActive((s) => !s)}>
          <Abc size={28} fill={isSortActive ? active : inactive} />
        </AZContainer>
      </TopBar>

      <LineSpacer />
      <DiffEditorPane
        schema={
          isSortActive ? sortSchema(schemas[leftVersion]) : schemas[leftVersion]
        }
        newSchema={
          isSortActive
            ? sortSchema(schemas[rightVersion])
            : schemas[rightVersion]
        }
        size={`100vw-50px`}
      />
    </Main>
  );
};
