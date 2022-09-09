import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useRelationsState,
} from '@/state/containers';
import { SearchInput, Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components/Heading';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { BasicNodes } from '@/Relation/BasicNodes';
import { toPng } from 'html-to-image';
import { Clear, Export, Eye } from '@/editor/icons';
import { useTheme } from '@emotion/react';
import { ErrorLabel, ErrorWrapper } from '@/shared/components/ErrorStyles';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow-y: auto;
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
  justify-content: flex-end;
  gap: 12px;
  padding: 4px 16px;
  height: 60px;
  font-family: ${fontFamilySans};
  border-bottom: 2px solid ${({ theme }) => theme.contra};
`;

const VerticalContainer = styled.div`
  padding-top: 100px;
  min-height: 100%;
`;

const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
  cursor: pointer;
  background-color: ${({ theme }) => theme.contra};
  padding: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  user-select: none;

  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.dimmed};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
  }
`;

const TogglesWrapper = styled.div`
  height: 40px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.disabled}36;
`;

const Label = styled.p`
  margin-left: 12px;
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamilySans};
`;

const HeadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { selectedNode, tree, libraryTree, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors, errorsItems } = useErrorsState();
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
  const { text } = useTheme();

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
        <HeadingWrapper>
          <Heading heading="RELATION VIEW" />
        </HeadingWrapper>
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
            <TogglesWrapper>
              <Label>View:</Label>
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
            </TogglesWrapper>
            <IconWrapper
              data-tooltip="Deselect node"
              onClick={(_e) => setSelectedNode(undefined)}
            >
              <Clear size={22} fill={text} />
            </IconWrapper>
            <IconWrapper
              data-tooltip="Focus selected node"
              onClick={(_e) => setSelectedNode({ ...selectedNode })}
            >
              <Eye size={22} fill={text} />
            </IconWrapper>
            {isLoading ? (
              <IconWrapper data-tooltip="Loading...">...</IconWrapper>
            ) : (
              <IconWrapper
                data-tooltip="Export to png"
                onClick={() => downloadPng()}
              >
                <Export size={22} fill={text} />
              </IconWrapper>
            )}
          </>
        )}
      </TopBar>
      <VerticalContainer onClick={() => setSelectedNode(undefined)}>
        {!lockGraf && !selectedNode && <BasicNodes />}
        {!lockGraf && selectedNode && <LinesDiagram mainRef={mainRef} />}
        {lockGraf && (
          <ErrorWrapper
            onClick={() => {
              setMenuState({ code: 'on' });
            }}
          >
            <ErrorLabel>{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:`}</ErrorLabel>
            {errorsItems}
          </ErrorWrapper>
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </VerticalContainer>
    </Wrapper>
  );
};
