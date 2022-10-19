import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useRelationsState } from '@/state/containers';
import { Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { toPng } from 'html-to-image';
import { Clear, Export, Eye } from '@/editor/icons';
import { ErrorLabel, ErrorWrapper } from '@/shared/components/ErrorStyles';
import { useRouter } from '@/state/containers/router';
import { PaintNodes } from '@/shared/components/PaintNodes/PaintNodes';
import { useSortState } from '@/state/containers/sort';
import * as vars from '@/vars';
import { TopBar } from '@/shared/components/TopBar';

const Wrapper = styled.div<{ relationsOn?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow: hidden;
  transition: ${vars.transition};
  background: ${({ theme, relationsOn }) =>
    relationsOn ? theme.background.mainFurthest : theme.background.mainFar};
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

const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.mainFurther};
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

const Main = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
  font-family: ${fontFamily};
`;

const Menu = styled.div`
  display: flex;
  font-family: ${fontFamilySans};
  gap: 12px;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { selectedNode, tree, libraryTree, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors, errorsItems } = useErrorsState();
  const { set } = useRouter();
  const {
    setCurrentNodes,
    showRelatedTo,
    setShowRelatedTo,
    setBaseTypesOn,
    baseTypesOn,
    setEnumsOn,
    enumsOn,
  } = useRelationsState();

  const { filterNodes } = useSortState();

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
    <Wrapper relationsOn={!!selectedNode?.field}>
      <TopBar heading={lockGraf ? 'ERRORS' : 'RELATION VIEW'}>
        {selectedNode?.field && (
          <Menu>
            <TogglesWrapper>
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
              <Clear size={22} />
            </IconWrapper>
            <IconWrapper
              data-tooltip="Focus selected node"
              onClick={(_e) => setSelectedNode({ ...selectedNode })}
            >
              <Eye size={22} />
            </IconWrapper>
            {isLoading ? (
              <IconWrapper data-tooltip="Loading...">...</IconWrapper>
            ) : (
              <IconWrapper
                data-tooltip="Export to png"
                onClick={() => downloadPng()}
              >
                <Export size={22} />
              </IconWrapper>
            )}
          </Menu>
        )}
      </TopBar>
      <Main onClick={() => setSelectedNode(undefined)}>
        {!lockGraf && !selectedNode?.field && <PaintNodes disableOps />}
        {!lockGraf && selectedNode?.field && <LinesDiagram mainRef={mainRef} />}
        {lockGraf && (
          <ErrorWrapper
            onClick={() => {
              set({ code: 'on' });
            }}
          >
            <ErrorLabel>{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:`}</ErrorLabel>
            {errorsItems}
          </ErrorWrapper>
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};
