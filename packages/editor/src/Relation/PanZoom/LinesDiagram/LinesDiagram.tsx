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
import { ParserField, getTypeName } from "graphql-js-tree";
import { GraphQLEditorWorker, NumberNode } from "graphql-editor-worker";
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
import { isExtensionNode } from "@/GraphQL/Resolve";

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

let lastTimestamp = 0;

export const LinesDiagram = React.forwardRef<
  LinesDiagramApi,
  LinesDiagramProps
>((props, ref) => {
  const { nodes, setLoading, mainRef, nodesWithoutFilter, isReadOnly } = props;
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
        }).then(({ nodes: positionedNodes, ...positionParams }) => {
          props.setViewportParams(positionParams);
          setSimulatedNodes(positionedNodes);
        });
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
      requestAnimationFrame((timeStamp) => {
        const delta = timeStamp - lastTimestamp;
        if (delta < 60) {
          return;
        }
        lastTimestamp = timeStamp;
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

  const [relations, setRelations] = useState<RelationInterface[]>();

  useEffect(() => {
    // compose existing positions
    if (!nodes.length) {
      setSimulatedNodes([]);
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
    }).then(({ nodes: positionedNodes, ...positionParams }) => {
      props.setViewportParams(positionParams);
      setSimulatedNodes(positionedNodes);
    });
    return;
  }, [nodes]);

  useLayoutEffect(() => {
    if (!simulatedNodes) {
      return;
    }
    const findRelative = (a: ParserField, index: number) => {
      const pn = simulatedNodes.find(
        (nf) =>
          nf.parserField.name === getTypeName(a.type.fieldType) &&
          !isExtensionNode(nf.parserField.data.type)
      );
      if (!pn) {
        return;
      }
      return {
        field: pn,
        index,
        connectingField: a,
      } as RelationPath;
    };

    setRelations(
      simulatedNodes
        .map((n, i) => {
          const args =
            nodesWithoutFilter.find((ufn) => ufn.id === n.parserField.id)
              ?.args || n.parserField.args;
          return {
            to: { field: n, connectingField: n.parserField, index: i },
            fromLength: n.parserField.args?.length || 0,
            from: args
              .flatMap((a, index) => {
                const argNodes = a.args.map((ar, ind) => findRelative(ar, ind));
                const main = findRelative(a, index);
                const nodes = [main, ...argNodes];
                return nodes.filter((node, i) => nodes.indexOf(node) === i);
              })
              .filter((o) => !!o),
            interfaces: n.parserField.interfaces
              .map((interfaceName) =>
                simulatedNodes.find((n) => n.parserField.name === interfaceName)
              )
              .filter((i) => !!i),
            extensions:
              (!isExtensionNode(n.parserField.data.type) &&
                simulatedNodes.filter(
                  (node) =>
                    isExtensionNode(node.parserField.data.type) &&
                    node.parserField.name === n?.parserField.name &&
                    node.id !== n.id
                )) ||
              [],
          };
        })
        .filter((n) => n.from)
        .map((n) => n as RelationInterface)
    );
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
      <Lines relations={relations} isPrintPreviewActive={printPreviewActive} />
    );
  }, [relations]);

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
