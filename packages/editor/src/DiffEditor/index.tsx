import { DiffEditorPane } from "@/editor/code";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Parser, TreeToGraphQL } from "graphql-js-tree";
import { useSortState } from "@/state/containers/sort";
import { fontFamilySans } from "@/vars";
import { Arrow_AZ } from "@aexol-studio/styling-system";

interface DiffEditorProps {
  schemas: [string, string];
}

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.neutral[600]};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.black};
`;

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${fontFamilySans};
`;

const AZContainer = styled.div<{ active?: boolean }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.accents[200] : theme.text.disabled};
`;

export const DiffEditor = ({ schemas }: DiffEditorProps) => {
  const { sortAlphabetically } = useSortState();
  const [isSortActive, setIsSortActive] = useState(true);
  const sortSchema = (schema: string) => {
    if (!schema) return "";
    const tree = Parser.parse(schema);
    tree.nodes.sort(sortAlphabetically);
    tree.nodes = tree.nodes.filter(
      (n) => n.args?.sort(sortAlphabetically) && n
    );
    return TreeToGraphQL.parse(tree);
  };

  return (
    <Main>
      <TopBar>
        <Heading>DIFF VIEW</Heading>
        <AZContainer
          active={isSortActive}
          onClick={() => setIsSortActive((s) => !s)}
        >
          <Arrow_AZ />
        </AZContainer>
      </TopBar>
      <DiffEditorPane
        schema={isSortActive ? sortSchema(schemas[0]) : schemas[0]}
        newSchema={isSortActive ? sortSchema(schemas[1]) : schemas[1]}
        size={`100vw-50px`}
      />
    </Main>
  );
};
