import React, { useEffect, useState } from 'react';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useRelationsState,
} from '@/state/containers';
import { ErrorLock } from '@/shared/components';
import styled from '@emotion/styled';
import { SearchInput } from '@/Graf/Node/components/SearchInput';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components/Heading';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { BasicNodes } from '@/Relation/BasicNodes';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow-y: auto;
  scrollbar-color: ${({
    theme: {
      background: { mainClose, mainFurthest },
    },
  }) => `${mainClose} ${mainFurthest}`};
`;

const ErrorContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  font-size: 12px;
  font-family: ${fontFamily};
  letter-spacing: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background.mainFurthest};
  border: 1px solid ${({ theme }) => theme.error};
`;

const TopBar = styled.div`
  display: flex;
  margin: 0 20px 0 8px;
  flex-direction: column;
  & > div:first-of-type {
    flex: 1;
  }
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

export const Relation: React.FC = () => {
  const { selectedNode, tree, libraryTree } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const { setCurrentNodes } = useRelationsState();

  const [filterNodes, setFilterNodes] = useState('');

  useEffect(() => {
    const together = tree.nodes.concat(libraryTree.nodes);
    const filteered = together.filter((tn) =>
      tn.name.toLowerCase().includes(filterNodes),
    );
    setCurrentNodes(filteered);
  }, [tree, libraryTree, filterNodes]);

  return (
    <Wrapper>
      <TopBar>
        <Heading heading="RELATION VIEW" />
        <SearchInput
          cypressName={GraphQLEditorDomStructure.tree.elements.Graf.searchInput}
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          onSubmit={() => {}}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </TopBar>
      <LineSpacer />
      {!lockGraf && !selectedNode && <BasicNodes />}
      {!lockGraf && selectedNode && <LinesDiagram />}
      {lockGraf && (
        <ErrorLock
          onClick={() => {
            setMenuState((ms) => ({ ...ms, code: true }));
          }}
          value={`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:\n${lockGraf}`}
        />
      )}
      {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
    </Wrapper>
  );
};
