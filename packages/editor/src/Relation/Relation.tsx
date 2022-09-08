import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useRelationsState,
} from '@/state/containers';
import { ErrorLock, SearchInput, Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components/Heading';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { BasicNodes } from '@/Relation/BasicNodes';
import { toPng } from 'html-to-image';
import * as vars from '@/vars';

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
  background-color: ${({ theme }) => theme.background.mainFar};
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 15px;
  font-family: ${fontFamilySans};
  z-index: 3;
`;
const HeadingWrapper = styled.div`
  position: fixed;
  z-index: 3;
`;

const VerticalContainer = styled.div`
  padding-top: 100px;
  min-height: 100%;
`;

const ExportToPng = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
  cursor: pointer;
`;

const Selected = styled.div`
  color: ${({ theme }) => theme.dimmed};
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 12px;
  transition: ${vars.transition};
  :hover {
    border-color: ${({ theme }) => theme.active};
    color: ${({ theme }) => theme.active};
  }
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { selectedNode, tree, libraryTree, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const {
    setCurrentNodes,
    showRelatedTo,
    setShowRelatedTo,
    setBaseTypesOn,
    baseTypesOn,
    setEnumsOn,
    enumsOn,
  } = useRelationsState();

  const [filterNodes, setFilterNodes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const together = tree.nodes.concat(libraryTree.nodes);
    const filtered = together.filter((tn) =>
      tn.name.toLowerCase().includes(filterNodes.toLowerCase()),
    );
    setCurrentNodes(filtered);
  }, [tree, libraryTree, filterNodes]);

  const downloadPng = useCallback(() => {
    setIsLoading(true);
    if (mainRef.current === null) {
      return;
    }
    toPng(mainRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${'relation_view'}`;
        link.href = dataUrl;
        link.click();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [mainRef]);

  return (
    <Wrapper>
      <HeadingWrapper>
        <Heading heading="RELATION VIEW" />
        <TopBar>
          {!selectedNode?.field && (
            <SearchInput
              cypressName={
                GraphQLEditorDomStructure.tree.elements.Graf.searchInput
              }
              autoFocus={false}
              onClear={() => {
                setFilterNodes('');
              }}
              onSubmit={() => {}}
              value={filterNodes}
              onChange={setFilterNodes}
            />
          )}
          {selectedNode?.field && (
            <>
              <Toggle
                toggled={showRelatedTo}
                label="parent"
                onToggle={() => setShowRelatedTo(!showRelatedTo)}
              />
              <Toggle
                toggled={baseTypesOn}
                label="scalars"
                onToggle={() => setBaseTypesOn(!baseTypesOn)}
              />
              <Toggle
                toggled={enumsOn}
                label="enums"
                onToggle={() => setEnumsOn(!enumsOn)}
              />
              <Selected onClick={(e) => setSelectedNode({ ...selectedNode })}>
                {selectedNode.field.name}
              </Selected>
              {isLoading ? (
                <ExportToPng>LOADING</ExportToPng>
              ) : (
                <ExportToPng onClick={() => downloadPng()}>
                  export image
                </ExportToPng>
              )}
            </>
          )}
        </TopBar>
      </HeadingWrapper>
      <VerticalContainer onClick={() => setSelectedNode(undefined)}>
        {!lockGraf && !selectedNode && <BasicNodes />}
        {!lockGraf && selectedNode && <LinesDiagram mainRef={mainRef} />}
        {lockGraf && (
          <ErrorLock
            onClick={() => {
              setMenuState({ code: 'on' });
            }}
            value={`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:\n${lockGraf}`}
          />
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </VerticalContainer>
    </Wrapper>
  );
};
