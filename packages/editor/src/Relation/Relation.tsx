import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useRelationNodesState,
  useRelationsState,
} from '@/state/containers';
import styled from '@emotion/styled';
import { toPng } from 'html-to-image';
import * as vars from '@/vars';
import { TopBar } from '@/shared/components/TopBar';
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { Graf } from '@/Graf/Graf';
import { NewNode } from '@/shared/components/NewNode';
import {
  Checkbox,
  ImageSquareCheck,
  Minus,
  Plus,
  Loader,
} from '@aexol-studio/styling-system';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  transition: ${vars.transition};
  background: ${({ theme }) => theme.neutral[600]};
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
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutral[600]};
  border: 1px solid ${({ theme }) => theme.error};
`;

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 2;
  inset:0
  padding: 2rem;
  gap:1rem;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutral[600]};inset: 0;
  font-family: ${fontFamilySans};
display: flex;
align-items: center;
justify-content: center;
`;

const TooltippedZoom = styled.div`
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  width: 4ch;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.default};
  font-family: ${fontFamilySans};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text.default};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.text.disabled};
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
const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${fontFamilySans};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text.default};
  }

  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text.default};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.text.disabled};
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

const ZoomWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.275rem 0.75rem;
  background-color: ${({ theme }) => theme.neutral[700]};
  border-color: ${({ theme }) => theme.neutral[200]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${(p) => p.theme.radius}px;
  gap: 8px;
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
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  font-family: ${fontFamily};
  justify-content: flex-end;
  cursor: ${({ dragMode }) => dragMode};
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { selectedNodeId, setSelectedNodeId, readonly, activeNode } =
    useTreesState();
  const { filteredRelationNodes, isFocused, deFocusNode } =
    useRelationNodesState();
  const { grafErrors } = useErrorsState();
  const {
    setBaseTypesOn,
    baseTypesOn,
    editMode,
    setEditMode,
    largeSimulationLoading,
  } = useRelationsState();
  const [isLoading, setIsLoading] = useState(false);
  const [draggingMode, setDraggingMode] = useState<DragMode>('grab');
  const [scaleFactor, setScaleFactor] = useState(100);
  const [zoomingMode, setZoomingMode] = useState<'zoom' | 'pan'>('pan');
  const ref = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (!selectedNodeId?.value?.id) {
      setScaleFactor(100);
      setEditMode('');
    }
    if (selectedNodeId?.value?.id && selectedNodeId.value.id !== editMode) {
      setEditMode('');
    }
  }, [selectedNodeId]);

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
        setIsLoading(false);
      });
  }, [mainRef]);
  const zoomPanPinch = (
    refs: Record<string, HTMLElement>,
    animationTime = 300,
  ) => {
    if (selectedNodeId?.value && ref.current && refs) {
      const currentNode = refs[selectedNodeId.value.id];
      if (currentNode) {
        const bb = currentNode.getBoundingClientRect();
        if (bb.height > window.innerHeight / 1.2) {
          const currentScale = ref.current.state.scale;
          const newScaleFactor = window.innerHeight / 1.2 / bb.height;
          const newScale = Math.max(0.3, currentScale * newScaleFactor);
          ref.current.zoomToElement(
            currentNode as HTMLElement,
            newScale,
            animationTime,
            'easeInOutQuad',
          );
          return;
        }
        ref.current.zoomToElement(
          currentNode,
          ref.current.state.scale,
          animationTime,
          'easeInOutQuad',
        );
      }
    }
  };
  const doubleClickHandler = () => {
    setScaleFactor((prevState) => Math.min(prevState + 70, 150));
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
  useEffect(() => {
    const listenerDown = (ev: KeyboardEvent) => {
      if (
        ev.key === 'Control' ||
        ev.metaKey ||
        ev.key === 'OS' ||
        ev.key === 'Meta'
      )
        setZoomingMode('zoom');
    };
    const listenerUp = (ev: KeyboardEvent) => {
      if (
        ev.key === 'Control' ||
        ev.metaKey ||
        ev.key === 'OS' ||
        ev.key === 'Meta'
      )
        setZoomingMode('pan');
    };
    const scrollListener = (e: WheelEvent) => {
      if (zoomingMode === 'zoom') return;
      if (!wrapperRef.current) return;

      const factor =
        (e.detail
          ? -e.detail / 3
          : 'wheelDelta' in e
          ? ((e as any).wheelDelta as number)
          : 0) * 2;

      const newX = e.deltaX
        ? (ref.current?.state.positionX || 0) + factor
        : ref.current?.state.positionX || 0;

      const newY = e.deltaY
        ? (ref.current?.state.positionY || 0) + factor
        : ref.current?.state.positionY || 0;

      ref.current?.setTransform(
        newX,
        newY,
        ref.current.state.scale,
        300,
        'easeOutCubic',
      );
    };
    wrapperRef.current?.addEventListener('wheel', scrollListener);
    document.addEventListener('keydown', listenerDown);
    document.addEventListener('keyup', listenerUp);

    return () => {
      document.removeEventListener('keydown', listenerDown);
      document.removeEventListener('keyup', listenerUp);
      wrapperRef.current?.removeEventListener('wheel', scrollListener);
    };
  }, [ref, zoomingMode]);
  const step = 0.2;
  return (
    <Wrapper>
      <TopBar>
        <Menu>
          {!readonly && <NewNode />}
          <ZoomWrapper>
            <IconWrapper
              data-tooltip="Zoom out"
              onClick={() => {
                if (!ref.current) return;
                const targetScale =
                  ref.current.state.scale * Math.exp(-1 * step);
                setScaleFactor(toScaleFactor(targetScale));
                ref.current?.zoomOut(step);
              }}
            >
              <Minus />
            </IconWrapper>
            <TooltippedZoom data-tooltip="Ctrl/Cmd + Scroll to zoom in/out">
              <span>{scaleFactor.toFixed() + '%'}</span>
            </TooltippedZoom>
            <IconWrapper
              data-tooltip="Zoom in"
              onClick={() => {
                if (!ref.current) return;
                const targetScale =
                  ref.current.state.scale * Math.exp(1 * step);
                setScaleFactor(toScaleFactor(targetScale));
                ref.current?.zoomIn(step);
              }}
            >
              <Plus />
            </IconWrapper>
          </ZoomWrapper>
          <Checkbox
            label="scalars"
            labelPosition="start"
            onChange={(e) => setBaseTypesOn(!baseTypesOn)}
            checked={baseTypesOn}
          />
          {isLoading ? (
            <IconWrapper data-tooltip="Loading...">...</IconWrapper>
          ) : (
            <IconWrapper
              data-tooltip="Export to png"
              onClick={() => downloadPng()}
            >
              <ImageSquareCheck />
            </IconWrapper>
          )}
        </Menu>
      </TopBar>
      <Main
        dragMode={selectedNodeId?.value ? draggingMode : 'auto'}
        ref={wrapperRef}
        onClick={(e) => {
          if (draggingMode === 'grabbing') return;
          if (isFocused && selectedNodeId?.value) {
            deFocusNode();
            setSelectedNodeId({
              source: 'deFocus',
              value: {
                ...selectedNodeId.value,
              },
            });
          } else {
            setSelectedNodeId({ source: 'relation', value: undefined });
          }
        }}
      >
        {editMode == activeNode?.id && <Graf node={activeNode} />}
        <TransformWrapper
          ref={ref}
          initialScale={1}
          maxScale={1.5}
          wheel={{ activationKeys: ['Control', 'OS', 'Meta'] }}
          minScale={0.1}
          panning={{
            velocityDisabled: true,
          }}
          onZoom={(e) => {
            setScaleFactor(toScaleFactor(e.state.scale));
          }}
          limitToBounds={false}
          onPanningStart={() => setDraggingMode('grab')}
          onPanning={() => setDraggingMode('grabbing')}
          onPanningStop={() => setTimeout(() => setDraggingMode('auto'), 1)}
        >
          <TransformComponent
            wrapperStyle={{
              flex: 1,
              height: '100%',
              filter: editMode ? `blur(4px)` : `blur(0px)`,
              transition: 'all 0.25s ease-in-out',
            }}
          >
            <LinesDiagram
              zoomPanPinch={zoomPanPinch}
              panState={draggingMode}
              nodes={filteredRelationNodes}
              mainRef={mainRef}
              panRef={ref}
            />
          </TransformComponent>
        </TransformWrapper>
        {largeSimulationLoading && (
          <LoadingContainer>
            <Loader size="lg" />
            <span>Loading {filteredRelationNodes.length} nodes</span>
          </LoadingContainer>
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};
const toScaleFactor = (scale: number) =>
  Math.min(Math.max(scale, 0.1), 1.5) * 100;
