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
import {
  Checkbox,
  ImageSquareCheck,
  Minus,
  Plus,
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
  border-radius: ${(p) => p.theme.radius}px;
  font-size: 12px;
  font-family: ${fontFamily};
  letter-spacing: 1;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutral[600]};
  border: 1px solid ${({ theme }) => theme.error};
`;

const TooltippedZoom = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  width: 3rem;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${fontFamilySans};
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius}px;
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

const TogglesWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.neutral[500]};
  border-radius: ${(p) => p.theme.radius}px;
  gap: 1rem;
`;
const ZoomWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.neutral[600]};
  border-color: ${({ theme }) => theme.neutral[500]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${(p) => p.theme.radius}px;
  gap: 1rem;
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
  const { selectedNodeId, setSelectedNodeId } = useTreesState();
  const { filteredRelationNodes } = useRelationNodesState();
  const { grafErrors } = useErrorsState();
  const { setBaseTypesOn, baseTypesOn } = useRelationsState();
  const [isLoading, setIsLoading] = useState(false);
  const [draggingMode, setDraggingMode] = useState<DragMode>('grab');
  const [scaleFactor, setScaleFactor] = useState('100');
  const ref = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (!selectedNodeId) setScaleFactor('100');
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
        console.log(err);
        setIsLoading(false);
      });
  }, [mainRef]);
  const zoomPanPinch = (refs: Record<string, HTMLElement>) => {
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
            300,
            'easeInOutQuad',
          );
          return;
        }
        ref.current.zoomToElement(
          currentNode,
          ref.current.state.scale,
          300,
          'easeInOutQuad',
        );
      }
    }
  };

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

  const step = 0.2;
  return (
    <Wrapper>
      <TopBar>
        <Menu>
          <ZoomWrapper>
            <IconWrapper
              data-tooltip="Zoom out"
              onClick={() => {
                setScaleFactor((prevState) =>
                  Math.max(parseInt(prevState) - step * 100, 30).toFixed(),
                );
                ref.current?.zoomOut(step);
              }}
            >
              <Minus />
            </IconWrapper>
            <TooltippedZoom data-tooltip="Ctrl/Cmd + Scroll to zoom in/out">
              <span>{scaleFactor + '%'}</span>
            </TooltippedZoom>
            <IconWrapper
              data-tooltip="Zoom in"
              onClick={() => {
                ref.current?.zoomIn(step);
                setScaleFactor((prevState) =>
                  Math.min(parseInt(prevState) + step * 100, 150).toFixed(),
                );
              }}
            >
              <Plus />
            </IconWrapper>
          </ZoomWrapper>
          <TogglesWrapper>
            <Checkbox
              checked={baseTypesOn}
              label="scalars"
              onClick={() => setBaseTypesOn(!baseTypesOn)}
            />
          </TogglesWrapper>
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
      >
        <TransformWrapper
          ref={ref}
          wheel={{ activationKeys: ['Control'] }}
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
          onPanningStart={() => setDraggingMode('grab')}
          onPanning={() => setDraggingMode('grabbing')}
          onPanningStop={() => setTimeout(() => setDraggingMode('auto'), 1)}
        >
          <TransformComponent
            wrapperStyle={{
              flex: 1,
              height: '100%',
              cursor: draggingMode,
            }}
          >
            <Deselect
              onMouseUp={(e) => {
                if (draggingMode !== 'grabbing') {
                  setSelectedNodeId({ source: 'relation', value: undefined });
                }
              }}
            >
              <DeselectOverlay />
              <LinesDiagram
                zoomPanPinch={zoomPanPinch}
                panState={draggingMode}
                nodes={filteredRelationNodes}
                mainRef={mainRef}
                panRef={ref}
              />
            </Deselect>
          </TransformComponent>
        </TransformWrapper>
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};

const Deselect = styled.div`
  height: 100%;
  width: 100%;
`;

const DeselectOverlay = styled.div`
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: calc(100% + 2000px);
  width: calc(100% + 2000px);
`;
