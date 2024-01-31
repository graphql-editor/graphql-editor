import { DiffEditorPane, DiffSchema } from "@/editor/code";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Parser, TreeToGraphQL } from "graphql-js-tree";
import { useSortState } from "@/state/containers/sort";
import { Arrow_AZ, Stack, Typography } from "@aexol-studio/styling-system";

interface DiffEditorProps {
  schemas: [DiffSchema, DiffSchema];
}

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.neutrals.L6};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.neutrals.L8};
`;

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${({ theme }) => theme.fontFamilySans};
`;

const AZContainer = styled.div<{ active?: boolean }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.accent.L2 : theme.text.disabled};
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
      <CompareBar justify="between" align="center">
        <Typography fontWeight={600} variant="body2">
          {schemas[0].name}
        </Typography>
        <Typography fontWeight={600} variant="body2">
          {schemas[1].name}
        </Typography>
      </CompareBar>
      <DiffEditorPane
        schema={
          isSortActive
            ? { content: sortSchema(schemas[1].content), name: schemas[1].name }
            : schemas[1]
        }
        newSchema={
          isSortActive
            ? { content: sortSchema(schemas[0].content), name: schemas[0].name }
            : schemas[0]
        }
        size={`100vw-50px`}
      />
    </Main>
  );
};

const CompareBar = styled(Stack)`
  padding-top: 3rem;
  padding-left: 64px;
  padding-right: 32px;
  position: absolute;
  width: 100%;
`;
