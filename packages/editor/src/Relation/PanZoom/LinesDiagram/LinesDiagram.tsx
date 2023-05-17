import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTreesState } from '@/state/containers/trees';
import { Node } from './Node';
import styled from '@emotion/styled';
import * as vars from '@/vars';
import { ParserField, getTypeName } from 'graphql-js-tree';
import { GraphQLEditorWorker, NumberNode } from 'graphql-editor-worker';
import { runAfterFramePaint } from '@/shared/hooks/useMarkFramePaint';
import { useRelationsState } from '@/state/containers';
import { RelationPath, Lines } from '@/Relation/PanZoom/LinesDiagram/Lines';
import { useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';
import { useDomManagerTs } from '@/Relation/PanZoom/useDomManager';

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
  hide?: boolean;
  setLoading: (b: boolean) => void;
  loading?: boolean;
  fieldsOn?: boolean;
  className: 'all' | 'focused';
  setViewportParams: (props: ViewportParams) => void;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = (props) => {
  const { nodes, setLoading, mainRef, nodesWithoutFilter } = props;
  const { isLibrary } = useTreesState();
  const { cullNodes, LoDNodes, changeZoomInTopBar } = useDomManagerTs(
    props.className,
  );
  const { editMode } = useRelationsState();
  const {
    transformState: { scale },
  } = useTransformContext();
  const [simulatedNodes, setSimulatedNodes] = useState<NumberNode[]>();
  useTransformEffect((r) => {
    if (simulatedNodes) {
      const size = r.instance.wrapperComponent?.getBoundingClientRect();
      changeZoomInTopBar(r.state);
      if (!size) return;
      requestAnimationFrame(() => {
        cullNodes(simulatedNodes, r.state, size);
        if (props.fieldsOn) {
          LoDNodes(r.state.scale);
        } else {
          LoDNodes(0.2);
        }
      });
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
        if (pn.x < minX) {
          minX = pn.x;
        }
        if (pn.y < minY) {
          minY = pn.y;
        }
        const lastX = pn.x + pn.width;
        const lastY = pn.y + pn.height;
        if (lastX > maxX) {
          maxX = lastX;
        }
        if (lastY > maxY) {
          maxY = lastY;
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
        (nf) => nf.parserField.name === getTypeName(a.type.fieldType),
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
            },
        ),
    );
    runAfterFramePaint(() => setLoading(false));
  }, [simulatedNodes]);

  const SvgLinesContainer = useMemo(() => {
    return <Lines className={props.className} relations={relations} />;
  }, [relations]);

  const NodesContainer = useMemo(() => {
    return (
      <>
        {simulatedNodes?.map((n) => (
          <NodePane x={n.x} id={`${n.id}`} y={n.y} key={n.parserField.id}>
            <Node
              className={props.className}
              isLibrary={isLibrary(n.parserField.id)}
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
};
