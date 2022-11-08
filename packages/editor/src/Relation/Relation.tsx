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
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from '@pronestor/react-zoom-pan-pinch';

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

const Text = styled.p`
  font-size: 14px;
  line-height: 40px;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.disabled}36;
`;

type DragMode = 'grab' | 'auto' | 'grabbing';

const Main = styled.div<{ dragMode: DragMode }>`
  height: calc(100% - 60px);
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  cursor: ${({ dragMode }) => dragMode};
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { selectedNode, tree, libraryTree, setSelectedNode } = useTreesState();
  const { grafErrors } = useErrorsState();
  const {
    setCurrentNodes,
    showRelatedTo,
    refsLoaded,
    setShowRelatedTo,
    setBaseTypesOn,
    baseTypesOn,
    setEnumsOn,
    enumsOn,
    refs,
  } = useRelationsState();

  const { filterNodes } = useSortState();

  const [isLoading, setIsLoading] = useState(false);
  const [draggingMode, setDraggingMode] = useState<DragMode>('grab');
  const [scaleFactor, setScaleFactor] = useState('100');
  const ref = useRef<ReactZoomPanPinchRef>(null);

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
  useEffect(() => {
    if (selectedNode?.field && ref.current && refsLoaded && refs) {
      const currentNode = refs[selectedNode.field.id];
      if (currentNode) {
        const bb = currentNode.getBoundingClientRect();
        if (bb.height > window.innerHeight / 1.2) {
          const currentScale = ref.current.state.scale;
          const newScaleFactor = window.innerHeight / 1.2 / bb.height;
          const newScale = Math.max(0.3, currentScale * newScaleFactor);
          ref.current.zoomToElement(currentNode as HTMLElement, newScale, 0);
          return;
        }
        ref.current.zoomToElement(currentNode, ref.current.state.scale, 0);
      }
    }
  }, [selectedNode, ref, refs]);

  const doubleClickHandler = () => {
    setScaleFactor((prevState) =>
      Math.min(parseInt(prevState) + 70, 150).toFixed(),
    );
  };

  useEffect(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.addEventListener('dblclick', doubleClickHandler);

    return () => {
      if (!wrapperRef.current) return;
      return wrapperRef.current.removeEventListener(
        'dblclick',
        doubleClickHandler,
      );
    };
  }, []);

  return (
    <Wrapper relationsOn={!!selectedNode?.field}>
      <TopBar heading="RELATION VIEW">
        {selectedNode?.field && (
          <Menu>
            <Text>{scaleFactor}%</Text>
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
        dragMode={selectedNode?.field ? draggingMode : 'auto'}
        ref={wrapperRef}
      >
        {!selectedNode?.field && <PaintNodes disableOps />}
        {selectedNode?.field && (
          <TransformWrapper
            ref={ref}
            wheel={{ activationKeys: ['Control'] }}
            centerOnInit={true}
            initialScale={1}
            maxScale={1.5}
            minScale={0.3}
            limitToBounds={false}
            onZoom={(e) => {
              setScaleFactor((Math.max(e.state.scale, 0.3) * 100).toFixed());
            }}
            panning={{
              velocityDisabled: true,
            }}
            onPanningStart={() => setDraggingMode('grabbing')}
            onPanningStop={() => setDraggingMode('grab')}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <LinesDiagram mainRef={mainRef} />
            </TransformComponent>
          </TransformWrapper>
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};
