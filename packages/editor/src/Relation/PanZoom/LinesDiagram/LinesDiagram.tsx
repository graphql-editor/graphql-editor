import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTreesState } from "@/state/containers/trees";
import { Node } from "./Node";
import styled from "@emotion/styled";
import { ParserField } from "graphql-js-tree";
import {
  GraphQLEditorWorker,
  NumberNode,
  RelativeNumberConnection,
} from "graphql-editor-worker";
import { runAfterFramePaint } from "@/shared/hooks/useMarkFramePaint";
import { useRelationsState } from "@/state/containers";
import { RelationPath, Lines } from "@/Relation/PanZoom/LinesDiagram/Lines";
import {
  ReactZoomPanPinchState,
  useControls,
  useTransformContext,
  useTransformEffect,
} from "react-zoom-pan-pinch";
import { useDomManagerTs } from "@/shared/hooks/useDomManager";
import { DOMEvents } from "@/shared/hooks/DOMClassNames";
import {
  RELATION_NODE_MAX_FIELDS,
  RELATION_NODE_MAX_WIDTH,
  PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS,
  PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH,
} from "@/Relation/shared/nodeLook";

const Main = styled.div`
  position: relative;
  overflow-x: visible;
  font-family: ${({ theme }) => theme.fontFamilySans};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  gap: 4rem;
  flex-wrap: nowrap;
  animation: show 1 0.5s ease-in-out;
  min-height: 100%;
  margin: auto;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NodePane = styled.div<{ x: number; y: number }>`
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
  transform-origin: center;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
`;
export type FilteredFieldsTypesProps = {
  fieldsTypes?: string[];
  searchValueEmpty: boolean;
};

export interface ViewportParams {
  width: number;
  height: number;
  x: number;
  y: number;
}

type LinesDiagramProps = {
  mainRef: React.RefObject<HTMLDivElement>;
  nodes: ParserField[];
  nodesWithoutFilter: ParserField[];
  setLoading: (b: boolean) => void;
  loading?: boolean;
  fieldsOn?: boolean;
  hide?: boolean;
  isReadOnly?: boolean;
  parentClass: "focus" | "all";
  setViewportParams: (props: ViewportParams) => void;
};

export interface LinesDiagramApi {
  triggerResimulation: (printingProcessingFlag?: boolean) => void;
}

export interface RelationInterface {
  to: RelationPath;
  from: RelationPath[];
  fromLength: number;
  interfaces: NumberNode[];
  extensions: NumberNode[];
}

export const LinesDiagram = React.forwardRef<
  LinesDiagramApi,
  LinesDiagramProps
>((props, ref) => {
  const { nodes, setLoading, mainRef, isReadOnly } = props;
  const {
    isLibrary,
    setSelectedNodeId,
    selectedNodeId,
    focusMode,
    relatedToSelectedTypes,
    activeNode,
  } = useTreesState();
  const {
    cullNodes,
    LoDNodes,
    lodCache,
    changeZoomInTopBar,
    markRelated,
    selectNode,
    deselectNodes,
  } = useDomManagerTs(props.parentClass);
  const { setTransform, instance } = useControls();
  const {
    editMode,
    printPreviewActive,
    printPreviewReady,
    setPrintPreviewReady,
    setPrintPreviewActive,
  } = useRelationsState();
  const {
    transformState: { scale },
  } = useTransformContext();
  const [simulatedNodes, setSimulatedNodes] = useState<NumberNode[]>();
  const [connections, setConnections] = useState<RelativeNumberConnection[]>();
  const zoomToNode = (nodeX: number, nodeY: number) => {
    const wrapper = instance.wrapperComponent;
    if (wrapper) {
      const size = wrapper.getBoundingClientRect();
      const s = instance.transformState.scale;
      const transformTo = {
        x: -nodeX * s + size.width / 2.0,
        y: -nodeY * s + size.height / 2.0,
      };
      setTransform(transformTo.x, transformTo.y, s, 200, "easeOut");
    }
  };

  useEffect(() => {
    const selectDisposable = DOMEvents.selectNode.disposable(
      (nodeId?: string) => {
        if (nodeId) {
          const toNode = simulatedNodes?.find(
            (sn) => sn.parserField.id === nodeId
          );
          selectNode(nodeId);
          if (toNode) {
            const rts = relatedToSelectedTypes(toNode.parserField);
            const ids = rts?.map((n) => n.id);

            if (ids?.length) {
              markRelated(ids);
            }
            zoomToNode(toNode.x, toNode.y);
          }
        } else {
          deselectNodes();
        }
      }
    );
    return () => selectDisposable.dispose();
  }, [simulatedNodes]);

  useImperativeHandle(
    ref,
    () => ({
      triggerResimulation: (printingProcessingFlag?: boolean) => {
        setLoading(true);
        if (printingProcessingFlag !== undefined) {
          setPrintPreviewActive(printingProcessingFlag);
        }

        GraphQLEditorWorker.simulateSort({
          nodes,
          options: {
            iterations: 200,
            maxWidth: printingProcessingFlag
              ? PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
              : RELATION_NODE_MAX_WIDTH,
            maxFields: printingProcessingFlag
              ? PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS
              : RELATION_NODE_MAX_FIELDS,
            ignoreAlphaCalculation: true,
          },
        }).then(
          ({ nodes: positionedNodes, connections, ...positionParams }) => {
            props.setViewportParams(positionParams);
            setSimulatedNodes(positionedNodes);
            setConnections(connections);
          }
        );
      },
    }),
    [nodes]
  );

  useEffect(() => {
    if (!selectedNodeId?.value?.id && simulatedNodes && !printPreviewActive) {
      const schemaNode = simulatedNodes?.find(
        (sn) => sn.parserField.name === "Query"
      );
      if (schemaNode) {
        zoomToNode(schemaNode.x, schemaNode.y);
      } else {
        if (simulatedNodes.length > 0) {
          const randomFirstNode = simulatedNodes[0];
          zoomToNode(randomFirstNode.x, randomFirstNode.y);
        }
      }
    }
  }, [simulatedNodes]);

  useLayoutEffect(() => {
    if (!props.loading) {
      if (instance.wrapperComponent) {
        transformEffect(instance.transformState, instance.wrapperComponent);
        setSelectedNodeId({
          source: "relation",
          value:
            activeNode && selectedNodeId?.value
              ? selectedNodeId.value
              : undefined,
        });
      }
    }
  }, [props.loading, focusMode]);

  const transformEffect = (
    state: ReactZoomPanPinchState,
    wrapper: HTMLDivElement
  ) => {
    if (simulatedNodes && !props.hide) {
      const size = wrapper.getBoundingClientRect();
      changeZoomInTopBar(state.scale);
      if (!size) return;
      requestAnimationFrame(() => {
        cullNodes(simulatedNodes, state, size);
        if (props.fieldsOn) {
          LoDNodes(state.scale);
        } else {
          LoDNodes(0.2);
        }
      });
    }
  };

  useTransformEffect((r) => {
    if (r.instance.wrapperComponent) {
      transformEffect(r.state, r.instance.wrapperComponent);
    }
  });

  useEffect(() => {
    if (!props.fieldsOn) {
      LoDNodes(0.2);
    } else {
      LoDNodes(scale);
    }
  }, [props.fieldsOn]);

  useEffect(() => {
    // compose existing positions
    if (!nodes.length) {
      setSimulatedNodes([]);
      setConnections([]);
      return;
    }
    if (!editMode) {
      setLoading(true);
    }
    GraphQLEditorWorker.simulateSort({
      nodes,
      options: {
        existingNumberNodes: simulatedNodes,
        iterations: 200,
        maxWidth: printPreviewActive
          ? PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
          : RELATION_NODE_MAX_WIDTH,
        maxFields: printPreviewActive
          ? PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS
          : RELATION_NODE_MAX_FIELDS,
      },
    }).then(({ nodes: positionedNodes, connections, ...positionParams }) => {
      props.setViewportParams(positionParams);
      setSimulatedNodes(positionedNodes);
      setConnections(connections);
    });
    return;
  }, [nodes]);

  useLayoutEffect(() => {
    if (!simulatedNodes) {
      return;
    }
    runAfterFramePaint(() => {
      setLoading(false);
      DOMEvents.selectNode.trigger(selectedNodeId?.value?.id);
      if (printPreviewActive && !printPreviewReady) {
        lodCache.current = undefined;
        setPrintPreviewReady(true);
      } else if (!printPreviewActive && printPreviewReady) {
        lodCache.current = undefined;
        setPrintPreviewReady(false);
      }
    });
  }, [simulatedNodes]);

  const SvgLinesContainer = useMemo(() => {
    return (
      <Lines
        relations={connections}
        isPrintPreviewActive={printPreviewActive}
      />
    );
  }, [connections]);

  const NodesContainer = useMemo(() => {
    return (
      <>
        {simulatedNodes?.map((n) => (
          <NodePane x={n.x} id={`${n.id}`} y={n.y} key={n.parserField.id}>
            <Node
              isReadOnly={isReadOnly}
              isLibrary={isLibrary(n.parserField)}
              numberNode={n}
            />
          </NodePane>
        ))}
      </>
    );
  }, [isLibrary, simulatedNodes]);

  return (
    <Main ref={mainRef}>
      {NodesContainer}
      {SvgLinesContainer}
    </Main>
  );
});

LinesDiagram.displayName = "LinesDiagram";
