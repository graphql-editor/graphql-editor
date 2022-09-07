import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useRelationsState,
} from '@/state/containers';
import { ErrorLock, Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { SearchInput } from '@/Graf/Node/components/SearchInput';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components/Heading';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { BasicNodes } from '@/Relation/BasicNodes';
import { PaintNode } from '@/Graf/Node';
import { toPng } from 'html-to-image';

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
  position: fixed;
  background-color: ${({ theme }) => theme.background.mainFar};
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 20px 0 8px;
  font-family: ${fontFamilySans};
  z-index: 3;
`;

const VerticalContainer = styled.div`
  padding-top: 100px;
  min-height: 100%;
`;

const ExportToPng = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  margin: 20px 20px 15px 15px;
  font-family: ${fontFamilySans};
  cursor: pointer;
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
      <TopBar>
        <Heading heading="RELATION VIEW" />
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
            <PaintNode node={selectedNode.field} />
            {isLoading ? (
              <ExportToPng>LOADING</ExportToPng>
            ) : (
              <ExportToPng onClick={() => downloadPng()}>
                EXPORT TO PNG
              </ExportToPng>
            )}
          </>
        )}
      </TopBar>
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
