import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { dataIt } from "@/Models";

const MAX_SCHEMA_SIZE = 20000 * 20000;

export const PanZoom: React.FC<{
  nodes: ParserField[];
  hide?: boolean;
  title?: React.ReactNode;
  parentClass: "focus" | "all";
}> = ({ nodes, hide, parentClass, title }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<LinesDiagramApi>(null);
  const {
    setSelectedNodeId,
    readonly: isReadOnly,
    activeNode,
  } = useTreesState();
  const { isClick, mouseDown } = useClickDetector();
  const { createToast } = useToasts();
  const { setTransform } = useControls();

  const { getContext } = useTransformContext();
  const {
    editMode,
    baseTypesOn,
    fieldsOn,
    omitNodes,
    ctrlToZoom,
    libraryNodesOn,
    printPreviewReady,
    printPreviewActive,
  } = useRelationsState();
  const [largeSimulationLoading, setLargeSimulationLoading] = useState(false);
  const [zoomingMode, setZoomingMode] = useState<"zoom" | "pan">("pan");
  const [viewportParams, setViewportParams] = useState<ViewportParams>();
  const [paramsBeforeExport, setParamsBeforeExport] = useState<{
    x: number;
    y: number;
    scale: number;
  }>();
  const [loading, setLoading] = useState(false);
  const [loadingCounter, setLoadingCounter] = useState(30);
  const [isGraphReloadingAfterPrint, setIsGraphReloadingAfterPrint] =
    useState(false);
  const ref = useRef<ReactZoomPanPinchRef>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const filteredNodes = useMemo(() => {
    return nodeFilter(nodes, {
      baseTypesOn,
      omitNodes,
      libraryNodesOn,
    });
  }, [nodes, baseTypesOn, omitNodes, libraryNodesOn]);

  const downloadPng = useCallback(() => {
    if (viewportParams?.height && viewportParams?.width) {
      if (viewportParams.height * viewportParams.width > MAX_SCHEMA_SIZE) {
        createToast({
          message:
            "Schema is too big to be printed as a whole. Please focus some nodes or hide part of them before printing.",
          variant: "error",
          closeMethod: {
            method: "closeManually",
          },
        });
        return;
      }
      setLoading(true);
      const ctx = getContext();
      setParamsBeforeExport({
        x: ctx.state.positionX,
        y: ctx.state.positionY,
        scale: ctx.state.scale,
      });
      linesRef.current?.triggerResimulation(true);
    }
  }, [mainRef, JSON.stringify(viewportParams)]);

  useEffect(() => {
    if (largeSimulationLoading) {
      setLoadingCounter(Math.floor(filteredNodes.length / 100));
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
    if (
      paramsBeforeExport &&
      viewportParams &&
      printPreviewReady &&
      printPreviewActive &&
      !hide &&
      !isGraphReloadingAfterPrint
    ) {
      setTimeout(() => {
        setTransform(-viewportParams.x, -viewportParams.y, 1, 0);
        setSelectedNodeId({ source: "relation", value: undefined });
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
            const message = e instanceof Error ? e.message : "Unknown error";
            createToast({
              message: "Export failed: " + message,
              variant: "error",
            });
          })
          .finally(() => {
            setIsGraphReloadingAfterPrint(true);
            linesRef.current?.triggerResimulation(false);
          });
      }, 2000);
    }
  }, [
    JSON.stringify(paramsBeforeExport),
    JSON.stringify(viewportParams),
    printPreviewReady,
    hide,
    isGraphReloadingAfterPrint,
    printPreviewActive,
  ]);

  useEffect(() => {
    if (
      paramsBeforeExport &&
      isGraphReloadingAfterPrint &&
      !largeSimulationLoading &&
      !printPreviewReady
    ) {
      setTimeout(() => {
        setTransform(
          paramsBeforeExport.x,
          paramsBeforeExport.y,
          paramsBeforeExport.scale,
          0
        );
        setParamsBeforeExport(undefined);
        setIsGraphReloadingAfterPrint(false);
        setLoading(false);
      }, 1000);
    }
  }, [isGraphReloadingAfterPrint, largeSimulationLoading]);

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
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // horizontal pan
        const newX = e.deltaX
          ? (transformState.positionX || 0) + factor
          : transformState.positionX || 0;
        setTransform(
          newX,
          transformState.positionY,
          transformState.scale,
          300,
          "easeOutCubic"
        );
        return;
      } else {
        // vertical pan
        const newY = e.deltaY
          ? (transformState.positionY || 0) + factor
          : transformState.positionY || 0;
        setTransform(
          transformState.positionX,
          newY,
          transformState.scale,
          300,
          "easeOutCubic"
        );
      }
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
        isReadOnly={isReadOnly}
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
    <Wrapper {...dataIt("relationView")} className={parentClass}>
      <ControlsBar
        title={title}
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
            filter: activeNode && editMode ? `blur(4px)` : `blur(0px)`,
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
            <span>Exporting {filteredNodes.length} nodes</span>
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
  background: ${({ theme }) => theme.neutrals.L6};
`;

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  padding: 2rem;
  gap: 1rem;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutrals.L6};
  inset: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  font-family: ${({ theme }) => theme.fontFamily};
  justify-content: flex-end;
  cursor: grab;
`;
