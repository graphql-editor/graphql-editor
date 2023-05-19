import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useRelationNodesState, useRelationsState } from '@/state/containers';
import styled from '@emotion/styled';
import { toPng } from 'html-to-image';
import * as vars from '@/vars';
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  useTransformContext,
} from 'react-zoom-pan-pinch';
import { Loader, useToasts } from '@aexol-studio/styling-system';
import { ParserField } from 'graphql-js-tree';
import { ControlsBar } from '@/Relation/PanZoom/ControlsBar';
import { useClickDetector } from '@/Relation/shared/useClickDetector';
import {
  LinesDiagram,
  ViewportParams,
} from '@/Relation/PanZoom/LinesDiagram/LinesDiagram';
import { nodeFilter } from '@/Relation/shared/nodeFilter';
import { useLazyControls } from '@/Relation/shared/useLazyControls';
import { useDomManagerTs } from '@/Relation/PanZoom/useDomManager';
export const PanZoom: React.FC<{
  nodes: ParserField[];
  className: 'all' | 'focused';
}> = ({ nodes, className }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { selectedNodeId, setSelectedNodeId, relatedNodeIdsToSelected } =
    useTreesState();
  const { focusMode } = useRelationNodesState();
  const { isClick, mouseDown } = useClickDetector();
  const { createToast } = useToasts();
  const { deselectNodes, selectNode, markRelated } = useDomManagerTs(className);

  const { getContext } = useTransformContext();
  const { setTransform, center } = useLazyControls();
  const { editMode, baseTypesOn, fieldsOn, inputsOn } = useRelationsState();
  const [largeSimulationLoading, setLargeSimulationLoading] = useState(false);
  const [zoomingMode, setZoomingMode] = useState<'zoom' | 'pan'>('pan');
  const [viewportParams, setViewportParams] = useState<ViewportParams>();
  const ref = useRef<ReactZoomPanPinchRef>(null);

  const filteredNodes = useMemo(() => {
    return nodeFilter(nodes, {
      baseTypesOn,
      inputsOn,
    });
  }, [nodes, baseTypesOn, inputsOn]);

  useEffect(() => {
    if (selectedNodeId?.value?.id) {
      selectNode(selectedNodeId.value.id, largeSimulationLoading);
      markRelated(relatedNodeIdsToSelected);
    } else {
      center();
    }
  }, [focusMode, largeSimulationLoading]);

  useEffect(() => {
    if (!selectedNodeId?.value?.id) {
      deselectNodes();
      return;
    }
    if (selectedNodeId?.source === 'relation') {
      markRelated(relatedNodeIdsToSelected);
      return;
    }
    if (selectedNodeId?.value?.id && selectedNodeId.value.id !== editMode) {
      deselectNodes();
      selectNode(selectedNodeId.value.id, largeSimulationLoading);
      if (relatedNodeIdsToSelected?.length) {
        markRelated(relatedNodeIdsToSelected);
      }
    }
  }, [selectedNodeId?.value?.id, relatedNodeIdsToSelected]);

  const downloadPng = useCallback(() => {
    if (mainRef.current === null || !viewportParams) {
      return;
    }
    toPng(mainRef.current, {
      cacheBust: true,
      width: viewportParams.width,
      height: viewportParams.height,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${'relation_view'}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((e) => {
        console.log(e);
        createToast({
          message: 'Export failed. Check browser console for details',
          variant: 'error',
        });
      });
  }, [mainRef, viewportParams]);

  useEffect(() => {
    const listenerDown = (ev: KeyboardEvent) => {
      if (
        ev.key === 'Control' ||
        ev.metaKey ||
        ev.key === 'OS' ||
        ev.key === 'Meta'
      ) {
        ev.preventDefault();
        setZoomingMode('zoom');
      }
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
    const scrollListenerZoom = (e: WheelEvent) => {
      e.preventDefault();
    };
    const scrollListener = (e: WheelEvent) => {
      e.preventDefault();
      if (!wrapperRef.current) return;
      if (zoomingMode === 'zoom') {
        return;
      }

      const factor =
        (e.detail
          ? -e.detail / 3
          : 'wheelDelta' in e
          ? (e as unknown as { wheelDelta: number }).wheelDelta
          : 0) * 2;
      const transformState = getContext().instance.transformState;
      const newX = e.deltaX
        ? (transformState.positionX || 0) + factor
        : transformState.positionX || 0;

      const newY = e.deltaY
        ? (transformState.positionY || 0) + factor
        : transformState.positionY || 0;

      setTransform(newX, newY, transformState.scale, 300, 'easeOutCubic');
    };
    wrapperRef.current?.addEventListener('wheel', scrollListener);
    document.addEventListener('wheel', scrollListenerZoom);
    document.addEventListener('keydown', listenerDown);
    document.addEventListener('keyup', listenerUp);

    return () => {
      document.removeEventListener('keydown', listenerDown);
      document.removeEventListener('keyup', listenerUp);
      document.removeEventListener('wheel', scrollListenerZoom);
      wrapperRef.current?.removeEventListener('wheel', scrollListener);
    };
  }, [ref, zoomingMode]);
  const memoizedDiagram = useMemo(() => {
    return (
      <LinesDiagram
        className={className}
        nodes={filteredNodes}
        setViewportParams={(p) => setViewportParams(p)}
        fieldsOn={fieldsOn}
        nodesWithoutFilter={nodes}
        mainRef={mainRef}
        loading={largeSimulationLoading}
        setLoading={(e) => setLargeSimulationLoading(e)}
      />
    );
  }, [
    filteredNodes,
    largeSimulationLoading,
    setLargeSimulationLoading,
    fieldsOn,
  ]);
  return (
    <Wrapper>
      <ControlsBar className={className} downloadPng={downloadPng} />
      <Main
        ref={wrapperRef}
        onMouseDown={mouseDown}
        onClick={(e) => {
          if (!isClick(e)) return;
          setSelectedNodeId({ source: 'relation', value: undefined });
        }}
      >
        <TransformComponent
          wrapperStyle={{
            flex: 1,
            height: '100%',
            filter: editMode ? `blur(4px)` : `blur(0px)`,
            transition: 'all 0.25s ease-in-out',
          }}
        >
          {memoizedDiagram}
        </TransformComponent>
        {largeSimulationLoading && (
          <LoadingContainer>
            <Loader size="lg" />
            <span>Loading {filteredNodes.length} nodes</span>
          </LoadingContainer>
        )}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: ${vars.transition};
  background: ${({ theme }) => theme.neutral[600]};
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

const Main = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  font-family: ${fontFamily};
  justify-content: flex-end;
  cursor: grab;
`;
