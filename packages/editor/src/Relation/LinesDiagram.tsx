import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTreesState } from '@/state/containers/trees';
import { useRelationsState } from '@/state/containers';
import { Node } from './Node';
import styled from '@emotion/styled';
import { Lines, RelationPath } from '@/Relation/Lines';
import { isScalarArgument } from '@/GraphQL/Resolve';
import * as vars from '@/vars';
import { ParserField, getTypeName, TypeDefinition } from 'graphql-js-tree';
import { useRouter } from '@/state/containers/router';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { GraphQLEditorWorker, NumberNode } from 'graphql-editor-worker';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
let tRefs: Record<string, HTMLDivElement> = {};
let tRefsToLoad = 0;
let refTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
export type FilteredFieldsTypesProps = {
  fieldsTypes?: string[];
  searchValueEmpty: boolean;
};

type LinesDiagramProps = {
  mainRef: React.RefObject<HTMLDivElement>;
  panRef: React.RefObject<ReactZoomPanPinchRef>;
  nodes: ParserField[];
  panState?: 'grabbing' | 'grab' | 'auto';
  zoomPanPinch?: (
    refs: Record<string, HTMLElement>,
    animationTime?: number,
  ) => void;
};

const passScalars = (pass: boolean, scalars: string[]) => (n: ParserField) =>
  !pass
    ? {
        ...n,
        args: n.args?.filter((a) => !isScalarArgument(a, scalars)),
      }
    : n;

export const LinesDiagram: React.FC<LinesDiagramProps> = ({
  mainRef,
  panRef,
  nodes,
  panState,
  zoomPanPinch,
}) => {
  const { selectedNodeId, libraryTree, isLibrary } = useTreesState();
  const { routes } = useRouter();
  const { baseTypesOn, editMode, setLargeSimulationLoading } =
    useRelationsState();
  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [refsLoaded, setRefsLoaded] = useState(false);
  const isOnMountCentered = useRef(false);
  const [relationDrawingNodes, setRelationDrawingNodes] =
    useState<NumberNode[]>();
  const relationDrawingNodesArray = useMemo(() => {
    return relationDrawingNodes?.flatMap((r) => r).map((r) => r.parserField);
  }, [relationDrawingNodes]);

  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

  useEffect(() => {
    if (refsLoaded && selectedNodeId?.value) {
      if (selectedNodeId?.source === 'deFocus') {
        zoomPanPinch?.(refs, 0);
        return;
      }
      zoomPanPinch?.(refs);
    }
  }, [selectedNodeId?.value, refsLoaded]);

  useEffect(() => {
    // compose existing positions
    if (!editMode) {
      setRefsLoaded(false);
      const scalarTypes = nodes
        .filter((n) => n.data.type === TypeDefinition.ScalarTypeDefinition)
        .map((n) => n.name);
      const filterScalars = passScalars(baseTypesOn, scalarTypes);

      const togetherFiltered = nodes
        .map(filterScalars)
        .filter((n) => !scalarTypes.includes(n.name));
      setLargeSimulationLoading(true);
      GraphQLEditorWorker.simulateSort({
        nodes: togetherFiltered,
        options: {
          existingNumberNodes: relationDrawingNodes,
          iterations: 200,
        },
      }).then((positionedNodes) => {
        setRelationDrawingNodes(positionedNodes);
      });
    }
    return;
  }, [nodes, libraryTree, baseTypesOn]);

  useLayoutEffect(() => {
    if (!refsLoaded || !relationDrawingNodesArray) {
      setRelations([]);
      return;
    }
    const findRelative = (a: ParserField, index: number) => {
      const pn = relationDrawingNodesArray.find(
        (nf) => nf.name === getTypeName(a.type.fieldType),
      );
      if (!pn) {
        return;
      }
      return {
        htmlNode: refs[pn.id],
        field: pn,
        index,
        connectingField: a,
      } as RelationPath;
    };
    setRelations(
      relationDrawingNodesArray
        .map((n) => ({
          to: { htmlNode: refs[n.id], field: n, connectingField: n },
          fromLength: n.args?.length || 0,
          from: n.args
            .flatMap((a, index) => {
              const argNodes = a.args.map((ar, ind) => findRelative(ar, ind));
              const main = findRelative(a, index);
              const nodes = [main, ...argNodes];
              return nodes.filter((node, i) => nodes.indexOf(node) === i);
            })
            .filter((o) => !!o),
        }))
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
  }, [refs, refsLoaded]);

  const SvgLinesContainer = useMemo(() => {
    if (!selectedNodeId?.value?.id) {
      return <Lines relations={relations} />;
    }
    return <Lines relations={relations} />;
  }, [relations, selectedNodeId]);

  useEffect(() => {
    setRefsLoaded(false);
    setRelations([]);
  }, [routes.code]);

  useEffect(() => {
    if (isOnMountCentered.current) return;
    if (selectedNodeId) {
      isOnMountCentered.current = true;
      return;
    }
    if (!panRef.current || !refsLoaded) return;

    isOnMountCentered.current = true;
    panRef.current.centerView();
  }, [panRef.current, refsLoaded, selectedNodeId]);

  const NodesContainer = useMemo(() => {
    tRefs = {};
    tRefsToLoad = relationDrawingNodes?.length || 0;
    const setRef = (n: ParserField, ref: HTMLDivElement) => {
      if (tRefs[n.id]) return;
      tRefs[n.id] = ref;
      const renderedRefs = Object.keys(tRefs).length;
      if (renderedRefs === tRefsToLoad) {
        if (refTimeout) {
          clearTimeout(refTimeout);
        }
        refTimeout = setTimeout(() => {
          setRefs(tRefs);
          setRefsLoaded(true);
          setLargeSimulationLoading(false);
        }, 10);
      }
    };
    return (
      <>
        {relationDrawingNodes?.map((n, i) => (
          <NodePane
            ref={(ref) => {
              if (ref) {
                setRef(n.parserField, ref);
              }
            }}
            x={n.x}
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
  }, [
    isLibrary,
    relationDrawingNodes,
    relationDrawingNodesArray,
    routes.code,
    panState,
  ]);

  return (
    <Wrapper>
      <Main clickable={panState !== 'grabbing'} ref={mainRef}>
        {NodesContainer}
        {SvgLinesContainer}
      </Main>
    </Wrapper>
  );
};
