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
import { useTransformEffect } from 'react-zoom-pan-pinch';
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

type LinesDiagramProps = {
  mainRef: React.RefObject<HTMLDivElement>;
  nodes: ParserField[];
  nodesWithoutFilter: ParserField[];
  hide?: boolean;
  setLoading: (b: boolean) => void;
  loading?: boolean;
  className: string;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = (props) => {
  const { nodes, setLoading, mainRef, nodesWithoutFilter } = props;
  const { isLibrary } = useTreesState();
  const { cullNodes } = useDomManagerTs(props.className);
  const { editMode } = useRelationsState();
  const [simulatedNodes, setSimulatedNodes] = useState<NumberNode[]>();
  useTransformEffect((r) => {
    if (simulatedNodes) {
      const size = r.instance.wrapperComponent?.getBoundingClientRect();
      if (!size) return;
      requestAnimationFrame(() => {
        cullNodes(simulatedNodes, r.state, size);
      });
    }
  });

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
    return <Lines relations={relations} />;
  }, [relations]);

  const NodesContainer = useMemo(() => {
    return (
      <>
        {simulatedNodes?.map((n) => (
          <NodePane x={n.x} id={`${n.id}`} y={n.y} key={n.parserField.id}>
            <Node
              className={props.className}
              isLibrary={isLibrary(n.parserField.id)}
              field={n.parserField}
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
