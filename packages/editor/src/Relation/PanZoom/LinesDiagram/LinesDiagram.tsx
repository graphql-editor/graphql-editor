import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTreesState } from "@/state/containers/trees";
import { Node } from "./Node";
import styled from "@emotion/styled";
import * as vars from "@/vars";
import { ParserField, getTypeName, OperationType } from "graphql-js-tree";
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

const Main = styled.div`
  position: relative;
  overflow-x: visible;
  font-family: ${vars.fontFamilySans};
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
  parentClass: "focus" | "all";
  setViewportParams: (props: ViewportParams) => void;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = (props) => {
  const { nodes, setLoading, mainRef, nodesWithoutFilter } = props;
  const {
    isLibrary,
    setSelectedNodeId,
    selectedNodeId,
    focusMode,
    relatedToSelectedTypes,
    allNodes,
    activeNode,
  } = useTreesState();
  const {
    cullNodes,
    LoDNodes,
    changeZoomInTopBar,
    markRelated,
    selectNode,
    deselectNodes,
  } = useDomManagerTs(props.parentClass);
  const { setTransform, instance } = useControls();
  const { editMode } = useRelationsState();
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
            const ids = allNodes.nodes
              .filter((n) => rts?.includes(n.name))
              .map((n) => n.id);

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

  useEffect(() => {
    if (!selectedNodeId?.value?.id && simulatedNodes) {
      const queryNode = simulatedNodes?.find((sn) =>
        sn.parserField.type.operations?.includes(OperationType.query)
      );
      const mutationNode = simulatedNodes?.find((sn) =>
        sn.parserField.type.operations?.includes(OperationType.mutation)
      );
      const subscriptionNode = simulatedNodes?.find((sn) =>
        sn.parserField.type.operations?.includes(OperationType.subscription)
      );

      const centerToNode = queryNode || mutationNode || subscriptionNode;
      if (centerToNode) {
        zoomToNode(centerToNode.x, centerToNode.y);
      }
    }
  }, [simulatedNodes]);

  useLayoutEffect(() => {
    if (!props.loading) {
      if (instance.wrapperComponent) {
        transformEffect(instance.transformState, instance.wrapperComponent);
        setSelectedNodeId(
          activeNode
            ? selectedNodeId
            : {
                source: "relation",
                value: undefined,
              }
        );
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

  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

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
      },
    }).then((positionedNodes) => {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      positionedNodes.forEach((pn) => {
        const lastMinX = pn.x - pn.width;
        const lastMinY = pn.y - pn.height;
        if (lastMinX < minX) {
          minX = lastMinX;
        }
        if (lastMinY < minY) {
          minY = lastMinY;
        }
        const lastMaxX = pn.x + pn.width;
        const lastMaxY = pn.y + pn.height;
        if (lastMaxX > maxX) {
          maxX = lastMaxX;
        }
        if (lastMaxY > maxY) {
          maxY = lastMaxY;
        }
      });
      props.setViewportParams({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      });
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
        (nf) => nf.parserField.name === getTypeName(a.type.fieldType)
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
        .map((n) => ({
          ...n,
          parserField: {
            ...n.parserField,
            // args:unFilteredNodes.find(ufn => ufn.id === n.parserField.id)?.args || []
          },
        }))
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
          };
        })
        .filter((n) => n.from)
        .map(
          (n) =>
            n as {
              from: RelationPath[];
              to: RelationPath;
              fromLength: number;
            }
        )
    );
    runAfterFramePaint(() => setLoading(false));
  }, [simulatedNodes]);

  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} />;
  }, [relations]);

  const NodesContainer = useMemo(() => {
    return (
      <>
        {simulatedNodes?.map((n) => (
          <NodePane x={n.x} id={`${n.id}`} y={n.y} key={n.parserField.id}>
            <Node isLibrary={isLibrary(n.parserField.id)} numberNode={n} />
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
};
