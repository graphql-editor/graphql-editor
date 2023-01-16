import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTreesState } from '@/state/containers/trees';
import { useRelationsState } from '@/state/containers';
import { Node } from './Node';
import styled from '@emotion/styled';
import { layerSort } from './Algorithm';
import { Lines, RelationPath } from '@/Relation/Lines';
import { isScalarArgument } from '@/GraphQL/Resolve';
import * as vars from '@/vars';
import { ParserField, getTypeName, TypeDefinition } from 'graphql-js-tree';
import { useRouter } from '@/state/containers/router';
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

const NodePane = styled.div`
  align-self: center;
  flex-flow: column nowrap;
  gap: 2rem;
  margin: auto;
  z-index: 1;
  font-size: 12px;
  align-items: flex-end;
  display: flex;
  padding: 10vh 0;
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
  nodes: ParserField[];
  panState?: 'grabbing' | 'grab' | 'auto';
  zoomPanPinch?: (refs: Record<string, HTMLElement>) => void;
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
  nodes,
  panState,
  zoomPanPinch,
}) => {
  const { selectedNode, libraryTree, isLibrary } = useTreesState();
  const { routes } = useRouter();
  const { baseTypesOn } = useRelationsState();

  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [refsLoaded, setRefsLoaded] = useState(false);
  const [relationDrawingNodes, setRelationDrawingNodes] =
    useState<ParserField[][]>();
  const relationDrawingNodesArray = useMemo(() => {
    return relationDrawingNodes?.flatMap((r) => r);
  }, [relationDrawingNodes]);

  const [filteredFieldsTypes, setFilteredFieldsTypes] = useState<
    Record<string, string>
  >({});
  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

  useEffect(() => {
    if (refsLoaded) {
      zoomPanPinch?.(refs);
    }
  }, [selectedNode?.field, refsLoaded]);

  useEffect(() => {
    setRefsLoaded(false);
    const scalarTypes = nodes
      .filter((n) => n.data.type === TypeDefinition.ScalarTypeDefinition)
      .map((n) => n.name);
    const filterScalars = passScalars(baseTypesOn, scalarTypes);

    const togetherFiltered = nodes
      .map(filterScalars)
      .filter((n) => !scalarTypes.includes(n.name));
    setRelationDrawingNodes(layerSort(togetherFiltered));
    return;
  }, [nodes, libraryTree, filteredFieldsTypes, baseTypesOn]);

  useLayoutEffect(() => {
    if (refsLoaded && relationDrawingNodesArray) {
      setRelations(
        relationDrawingNodesArray
          .map((n) => ({
            to: { htmlNode: refs[n.id], field: n, connectingField: n },
            fromLength: n.args?.length || 0,
            from: n.args
              ?.filter((a) =>
                a.name.toLowerCase().includes(filteredFieldsTypes[n.id] || ''),
              )
              .map((a, index) => {
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
    }
  }, [refs, refsLoaded]);

  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} />;
  }, [relations, selectedNode]);

  useEffect(() => {
    setRefsLoaded(false);
    setRelations([]);
  }, [routes.code]);

  const NodesContainer = useMemo(() => {
    tRefs = {};
    tRefsToLoad =
      relationDrawingNodes?.map((rdn) => rdn.length).reduce((a, b) => a + b) ||
      0;

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
        }, 10);
      }
    };
    return (
      <>
        {relationDrawingNodes?.map((nodesArray, i) => (
          <NodePane key={i}>
            {nodesArray.map((n) => (
              <Node
                filteredFieldTypes={filteredFieldsTypes[n.id] || ''}
                setFilteredFieldsTypes={(q) =>
                  setFilteredFieldsTypes((ftt) => ({
                    ...ftt,
                    [n.id]: q,
                  }))
                }
                isLibrary={isLibrary(n.id)}
                key={n.id}
                setRef={(ref) => {
                  setRef(n, ref);
                }}
                field={n}
              />
            ))}
          </NodePane>
        ))}
      </>
    );
  }, [isLibrary, relationDrawingNodes, relationDrawingNodesArray, routes.code]);

  return (
    <Wrapper>
      <Main clickable={panState !== 'grabbing'} ref={mainRef}>
        {NodesContainer}
        {SvgLinesContainer}
      </Main>
    </Wrapper>
  );
};
