import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
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
  display: flex;
  margin: 0 20px 0 8px;
  flex-direction: column;
  & > div:first-of-type {
    flex: 1;
  }
`;
const ExportToPng = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  margin: 20px 20px 15px 15px;
  font-family: ${fontFamilySans};
  cursor: pointer;
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

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

  const downloadPng = useCallback(() => {
    if (mainRef.current === null) {
      return;
    }
    toPng(mainRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${'relation_view'}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mainRef]);

  return (
    <Wrapper>
      <TopBar>
        <HeadingWrapper>
          <Heading heading="RELATION VIEW" />
          {!lockGraf && selectedNode && (
            <ExportToPng onClick={() => downloadPng()}>
              EXPORT TO PNG
            </ExportToPng>
          )}
        </HeadingWrapper>
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
      {!lockGraf && selectedNode && <LinesDiagram mainRef={mainRef} />}
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
