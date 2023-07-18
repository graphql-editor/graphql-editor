import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fontFamily, fontFamilySans } from "@/vars";
import { useTreesState } from "@/state/containers/trees";
import { useRelationsState } from "@/state/containers";
import styled from "@emotion/styled";
import { toPng } from "html-to-image";
import * as vars from "@/vars";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  useControls,
  useTransformContext,
} from "react-zoom-pan-pinch";
import { Loader, useToasts } from "@aexol-studio/styling-system";
import { ParserField } from "graphql-js-tree";
import { ControlsBar } from "@/Relation/PanZoom/ControlsBar";
import {
  LinesDiagram,
  LinesDiagramApi,
  ViewportParams,
} from "@/Relation/PanZoom/LinesDiagram/LinesDiagram";
import { nodeFilter } from "@/Relation/shared/nodeFilter";
import { useClickDetector } from "@/shared/hooks/useClickDetector";
import { useDomManagerTs } from "@/shared/hooks/useDomManager";
export const PanZoom: React.FC<{
  nodes: ParserField[];
  hide?: boolean;
  parentClass: "focus" | "all";
}> = ({ nodes, hide, parentClass }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<LinesDiagramApi>(null);
  const { setSelectedNodeId } = useTreesState();
  const { isClick, mouseDown } = useClickDetector();
  const { createToast } = useToasts();
  const { setTransform } = useControls();

  const { getContext } = useTransformContext();
  const { editMode, baseTypesOn, fieldsOn, inputsOn, ctrlToZoom } =
    useRelationsState();
  const [largeSimulationLoading, setLargeSimulationLoading] = useState(false);
  const [zoomingMode, setZoomingMode] = useState<"zoom" | "pan">("pan");
  const [viewportParams, setViewportParams] = useState<ViewportParams>();
  const [paramsBeforeExport, setParamsBeforeExport] = useState<{
    x: number;
    y: number;
    scale: number;
  }>();
  const { showAllForExport } = useDomManagerTs(parentClass);
  const [loading, setLoading] = useState(false);
  const [loadingCounter, setLoadingCounter] = useState(30);
  const ref = useRef<ReactZoomPanPinchRef>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const filteredNodes = useMemo(() => {
    return nodeFilter(nodes, {
      baseTypesOn,
      inputsOn,
    });
  }, [nodes, baseTypesOn, inputsOn]);

  const downloadPng = useCallback(() => {
    if (viewportParams?.height) {
      const ctx = getContext();
      setParamsBeforeExport({
        x: ctx.state.positionX,
        y: ctx.state.positionY,
        scale: ctx.state.scale,
      });
      setTransform(-viewportParams.x, -viewportParams.y, 1, 0);
      setSelectedNodeId({ source: "relation", value: undefined });
    }
  }, [mainRef, viewportParams]);

  useEffect(() => {
    if (largeSimulationLoading) {
      setLoadingCounter(Math.floor(filteredNodes.length / 40));
      intervalRef.current = setInterval(
        () => setLoadingCounter((lc) => (lc - 1 >= 0 ? lc - 1 : 0)),
        1000
      );
    } else {
      clearInterval(intervalRef.current);
      setLoadingCounter(30);
    }
  }, [largeSimulationLoading]);

  useEffect(() => {
    if (paramsBeforeExport) {
      setLoading(true);
      setLoadingCounter(Math.floor(filteredNodes.length / 20));
      setTimeout(() => {
        showAllForExport();
      }, 500);
      const interval = setInterval(
        () => setLoadingCounter((lc) => (lc - 1 >= 0 ? lc - 1 : 0)),
        1000
      );

      setTimeout(() => {
        const refElem = mainRef.current?.parentElement as HTMLDivElement;
        if (!refElem || refElem === null || !viewportParams) {
          return;
        }
        toPng(refElem, {
          cacheBust: true,
          width: viewportParams.width,
          height: viewportParams.height,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `${"relation_view"}`;
            link.href = dataUrl;
            link.click();
          })
          .catch((e) => {
            console.log(e);
            createToast({
              message: "Export failed. Check browser console for details",
              variant: "error",
            });
          })
          .finally(() => {
            setTransform(
              paramsBeforeExport.x,
              paramsBeforeExport.y,
              paramsBeforeExport.scale,
              0
            );
            clearInterval(interval);
            setLoading(false);
            setParamsBeforeExport(undefined);
          });
      }, 2000);
    }
  }, [paramsBeforeExport, viewportParams]);

  useEffect(() => {
    const listenerDown = (ev: KeyboardEvent) => {
      if (
        ev.key === "Control" ||
        ev.metaKey ||
        ev.key === "OS" ||
        ev.key === "Meta"
      ) {
        setZoomingMode("zoom");
      }
    };
    const listenerUp = (ev: KeyboardEvent) => {
      if (
        ev.key === "Control" ||
        ev.metaKey ||
        ev.key === "OS" ||
        ev.key === "Meta"
      )
        setZoomingMode("pan");
    };
    const scrollListenerZoom = (e: WheelEvent) => {
      e.preventDefault();
    };
    const scrollListener = (e: WheelEvent) => {
      e.preventDefault();
      if (!wrapperRef.current) return;
      if (zoomingMode === "zoom" || !ctrlToZoom) {
        return;
      }

      const factor =
        (e.detail
          ? -e.detail / 3
          : "wheelDelta" in e
          ? (e as unknown as { wheelDelta: number }).wheelDelta
          : 0) * 2;
      const transformState = getContext().instance.transformState;
      const newX = e.deltaX
        ? (transformState.positionX || 0) + factor
        : transformState.positionX || 0;

      const newY = e.deltaY
        ? (transformState.positionY || 0) + factor
        : transformState.positionY || 0;

      setTransform(newX, newY, transformState.scale, 300, "easeOutCubic");
    };
    wrapperRef.current?.addEventListener("wheel", scrollListener);
    document.addEventListener("wheel", scrollListenerZoom);
    document.addEventListener("keydown", listenerDown);
    document.addEventListener("keyup", listenerUp);

    return () => {
      document.removeEventListener("keydown", listenerDown);
      document.removeEventListener("keyup", listenerUp);
      document.removeEventListener("wheel", scrollListenerZoom);
      wrapperRef.current?.removeEventListener("wheel", scrollListener);
    };
  }, [ref, zoomingMode, ctrlToZoom]);
  const memoizedDiagram = useMemo(() => {
    return (
      <LinesDiagram
        ref={linesRef}
        hide={hide}
        nodes={filteredNodes}
        setViewportParams={(p) => setViewportParams(p)}
        fieldsOn={fieldsOn}
        nodesWithoutFilter={nodes}
        parentClass={parentClass}
        mainRef={mainRef}
        loading={largeSimulationLoading}
        setLoading={(e) => {
          setLargeSimulationLoading(e);
        }}
      />
    );
  }, [
    filteredNodes,
    largeSimulationLoading,
    setLargeSimulationLoading,
    fieldsOn,
    hide,
  ]);
  return (
    <Wrapper className={parentClass}>
      <ControlsBar
        triggerResimulation={() => {
          linesRef.current?.triggerResimulation();
        }}
        downloadPng={downloadPng}
      />
      <Main
        ref={wrapperRef}
        onMouseDown={mouseDown}
        onClick={(e) => {
          if (!isClick(e)) return;
          setSelectedNodeId({ source: "relation", value: undefined });
        }}
      >
        <TransformComponent
          wrapperStyle={{
            flex: 1,
            height: "100%",
            filter: editMode ? `blur(4px)` : `blur(0px)`,
            transition: "all 0.25s ease-in-out",
          }}
        >
          {memoizedDiagram}
        </TransformComponent>
        {largeSimulationLoading && (
          <LoadingContainer>
            <Loader size="lg" />
            <span>
              Loading {filteredNodes.length} nodes estimated time:{" "}
              {loadingCounter} seconds
            </span>
          </LoadingContainer>
        )}
        {loading && (
          <LoadingContainer>
            <Loader size="lg" />
            <span>
              Exporting {filteredNodes.length} nodes estimated time:{" "}
              {loadingCounter} seconds
            </span>
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
  inset: 0;
  padding: 2rem;
  gap: 1rem;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutral[600]};
  inset: 0;
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
