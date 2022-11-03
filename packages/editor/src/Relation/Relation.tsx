import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useRelationsState } from '@/state/containers';
import { Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { toPng } from 'html-to-image';
import { Clear, Export, Eye } from '@/editor/icons';
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

const Menu = styled.div`
  display: flex;
  font-family: ${fontFamilySans};
  gap: 12px;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;

type DragMode = 'grab' | 'auto' | 'grabbing';

const Main = styled.div<{ dragMode: DragMode }>`
  height: calc(120vh - 60px);
  width: 100%;
  overflow: scroll;
  font-family: ${fontFamily};
  cursor: ${({ dragMode }) => dragMode};
`;

const scaleStep =
  (step = 0.015, max = 1.5, min = 0.3) =>
  (scaleVector: number) =>
    Math.max(min, Math.min(Math.round(scaleVector / step) * step, max));

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNode, tree, libraryTree, setSelectedNode } = useTreesState();
  const { grafErrors } = useErrorsState();
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
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [scaleFactor, setScaleFactor] = useState(1);

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

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = (e: React.MouseEvent) => {
    setDragMode(true);
    if (!containerRef.current) return;
    pos = {
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    containerRef.current.scrollTop = pos.top - dy;
    containerRef.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = () => {
    setDragMode(false);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  useEffect(() => {
    document.addEventListener('wheel', scrollHandler);

    return () => {
      document.removeEventListener('wheel', scrollHandler);
    };
  }, [scaleFactor]);

  const scrollHandler = (e: WheelEvent) => {
    if (e.ctrlKey && containerRef.current) {
      e.stopPropagation();
      const zoomSpeed = e.deltaY / (4 / 0.015);
      const zoomingFn = scaleStep(0.015, 1.5, 0.3);
      setScaleFactor((prevValue) => zoomingFn(prevValue - zoomSpeed));
      return false;
    }
  };

  return (
    <Wrapper relationsOn={!!selectedNode?.field}>
      <TopBar heading="RELATION VIEW">
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
      <Main
        dragMode={dragMode ? 'grabbing' : selectedNode?.field ? 'grab' : 'auto'}
        ref={containerRef}
        onMouseDown={(e) => mouseDownHandler(e)}
      >
        {!selectedNode?.field && <PaintNodes disableOps />}
        {selectedNode?.field && (
          <LinesDiagram
            mainRef={mainRef}
            scaleVector={selectedNode?.field ? scaleFactor : 1}
          />
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};
