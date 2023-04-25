import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTreesState } from '@/state/containers/trees';
import { Node } from './Node';
import styled from '@emotion/styled';
import { Lines, RelationPath } from '@/Relation/Lines';
import * as vars from '@/vars';
import { ParserField, getTypeName } from 'graphql-js-tree';
import { useRouter } from '@/state/containers/router';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { GraphQLEditorWorker, NumberNode } from 'graphql-editor-worker';
import { runAfterFramePaint } from '@/shared/hooks/useMarkFramePaint';
import { nodeFilter } from '@/Relation/shared/nodeFilter';
import { useRelationsState } from '@/state/containers';

const Wrapper = styled.div<{ hide?: boolean }>`
  width: 100%;
  height: 100%;
  display: ${(p) => (p.hide ? 'none' : 'block')};
`;
const Main = styled.div<{ clickable?: boolean }>`
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
  pointer-events: ${({ clickable }) => (clickable ? 'all' : 'none')};
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
  panRef: React.RefObject<ReactZoomPanPinchRef>;
  nodes: ParserField[];
  hide?: boolean;
  panState?: 'grabbing' | 'grab' | 'auto';
  setLoading: (b: boolean) => void;
  loading?: boolean;
  name: string;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = ({
  mainRef,
  panRef,
  nodes: unFilteredNodes,
  panState,
  setLoading,
  name,
  hide,
}) => {
  const { selectedNodeId, isLibrary } = useTreesState();
  const { routes } = useRouter();
  const { baseTypesOn, fieldsOn, inputsOn } = useRelationsState();
  const isOnMountCentered = useRef(false);
  const [relationDrawingNodes, setRelationDrawingNodes] =
    useState<NumberNode[]>();

  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

  const nodes = useMemo(() => {
    return nodeFilter(unFilteredNodes, {
      baseTypesOn,
      fieldsOn,
      inputsOn,
    });
  }, [unFilteredNodes, baseTypesOn, fieldsOn, inputsOn]);

  useEffect(() => {
    // compose existing positions
    if (!nodes.length) {
      setRelationDrawingNodes([]);
      return;
    }
    if (!relationDrawingNodes?.length) {
      setLoading(true);
    }

    GraphQLEditorWorker.simulateSort({
      nodes,
      options: {
        existingNumberNodes: relationDrawingNodes,
        iterations: 200,
      },
    }).then((positionedNodes) => {
      setRelationDrawingNodes(positionedNodes);
    });
    return;
  }, [nodes]);

  useLayoutEffect(() => {
    if (!relationDrawingNodes) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const findRelative = (a: ParserField, index: number) => {
      const pn = relationDrawingNodes.find(
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
      relationDrawingNodes
        .map((n) => ({
          ...n,
          parserField: {
            ...n.parserField,
            // args:unFilteredNodes.find(ufn => ufn.id === n.parserField.id)?.args || []
          },
        }))
        .map((n, i) => {
          const args =
            unFilteredNodes.find((ufn) => ufn.id === n.parserField.id)?.args ||
            n.parserField.args;
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
  }, [relationDrawingNodes]);

  const SvgLinesContainer = useMemo(() => {
    if (!selectedNodeId?.value?.id) {
      return <Lines relations={relations} />;
    }
    return <Lines relations={relations} />;
  }, [relations, selectedNodeId]);

  useEffect(() => {
    setRelations([]);
  }, [routes.code]);

  useEffect(() => {
    if (isOnMountCentered.current) return;
    if (selectedNodeId) {
      isOnMountCentered.current = true;
      return;
    }
    if (!panRef.current) return;

    isOnMountCentered.current = true;
    panRef.current.centerView();
  }, [panRef.current, selectedNodeId]);
  const NodesContainer = useMemo(() => {
    return (
      <>
        {relationDrawingNodes?.map((n, i) => (
          <NodePane
            x={n.x}
            id={`${name}-${n.id}`}
            y={n.y}
            key={n.parserField.id}
          >
            <Node
              canSelect={panState !== 'grabbing'}
              isLibrary={isLibrary(n.parserField.id)}
              field={n.parserField}
            />
          </NodePane>
        ))}
      </>
    );
  }, [isLibrary, relationDrawingNodes, routes.code, panState]);

  return (
    <Wrapper hide={hide}>
      <Main clickable={panState !== 'grabbing'} ref={mainRef}>
        {NodesContainer}
        {SvgLinesContainer}
      </Main>
    </Wrapper>
  );
};
