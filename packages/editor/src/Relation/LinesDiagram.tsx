import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTreesState } from '@/state/containers/trees';
import { useRelationsState } from '@/state/containers';
import { Node } from './Node';
import styled from '@emotion/styled';
import { sortByConnection } from './Algorithm';
import { Lines, RelationPath } from '@/Relation/Lines';
import { isScalarArgument } from '@/GraphQL/Resolve';
import * as vars from '@/vars';
import { ParserField, getTypeName } from 'graphql-js-tree';
import { useRouter } from '@/state/containers/router';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Main = styled.div`
  position: relative;
  overflow-x: visible;
  font-family: ${vars.fontFamilySans};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  gap: 120px;
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

const NodePane = styled.div`
  align-self: center;
  flex-flow: column nowrap;
  margin: auto;
  z-index: 1;
  font-size: 12px;
  align-items: flex-end;
  display: flex;
  padding: 50vh 50vw;
`;
let tRefs: Record<string, HTMLDivElement> = {};
let refTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
export type FilteredFieldsTypesProps = {
  fieldsTypes?: string[];
  searchValueEmpty: boolean;
};

// const scrollToRef = (fieldName: string): unknown => {
//   const ref = tRefs[fieldName];
//   if (!ref) {
//     return setTimeout(scrollToRef, 10);
//   }
//   const scrollableArea = ref.parentElement?.parentElement?.parentElement;
//   console.log('scrollableArea', scrollableArea);

//   scrollableArea?.scrollTo({
//     top: scrollableArea.scrollHeight / 2,
//     left: scrollableArea.scrollLeft / 2,
//   });
// };

type LinesDiagramProps = {
  mainRef: React.RefObject<HTMLDivElement>;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = ({ mainRef }) => {
  const { libraryTree, selectedNode, schemaType, tree } = useTreesState();
  const { routes } = useRouter();
  const {
    refsLoaded,
    refs,
    setRefs,
    setRefsLoaded,
    setRelationDrawingNodes,
    relationDrawingNodes,
    relationDrawingNodesArray,
    showRelatedTo,
    baseTypesOn,
    enumsOn,
  } = useRelationsState();

  const [filteredFieldsTypes, setFilteredFieldsTypes] = useState<
    Record<string, string>
  >({});
  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

  useEffect(() => {
    setRefsLoaded(false);
    if (selectedNode?.field?.name) {
      const compareNode = {
        ...selectedNode.field,
        args: selectedNode.field.args?.filter((a) =>
          a.name
            .toLowerCase()
            .includes(filteredFieldsTypes['' + selectedNode.field?.id] || ''),
        ),
      };
      const selected = !baseTypesOn
        ? {
            ...selectedNode.field,
            args: selectedNode.field.args?.filter((a) => !isScalarArgument(a)),
          }
        : selectedNode.field;
      const together = tree.nodes.concat(libraryTree.nodes);
      const based = !baseTypesOn
        ? together.map((n) => ({
            ...n,
            args: n.args?.filter((a) => !isScalarArgument(a)),
          }))
        : together;
      const relatedNodes = based
        .filter((n) =>
          compareNode.args?.find(
            (a) => getTypeName(a.type.fieldType) === n.name,
          ),
        )
        .filter((n) => n.name !== selectedNode.field?.name);
      const relatedNames = relatedNodes.map((r) => r.name);
      const relatedToNodes = showRelatedTo
        ? based
            .filter((n) =>
              n.args?.find(
                (arg) =>
                  getTypeName(arg.type.fieldType) === selectedNode.field?.name,
              ),
            )
            .filter((n) => n.name !== selectedNode.field?.name)
            .filter((n) => !relatedNames.includes(n.name))
        : [];
      const resorted = sortByConnection(relatedNodes);
      const resortedRelatedTo = sortByConnection(relatedToNodes);
      setRelationDrawingNodes({
        parent: resortedRelatedTo,
        selected,
        children: resorted,
      });
      return;
    }
  }, [
    selectedNode,
    tree,
    libraryTree,
    filteredFieldsTypes,
    baseTypesOn,
    enumsOn,
    showRelatedTo,
  ]);

  useLayoutEffect(() => {
    if (refsLoaded) {
      setRelations(
        relationDrawingNodesArray
          .map((n) => ({
            to: { htmlNode: refs[n.id], field: n },
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
  }, [refs, relationDrawingNodesArray, refsLoaded]);

  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} selectedNode={selectedNode?.field} />;
  }, [relations]);

  useEffect(() => {
    setRefsLoaded(false);
    setRelations([]);
  }, [routes.code, selectedNode, enumsOn]);

  const NodesContainer = useMemo(() => {
    tRefs = {};
    const libraryNodeNames = libraryTree.nodes.map((l) => l.name);

    const filterNodes = (nodes?: ParserField[]) =>
      nodes
        ? schemaType === 'library'
          ? [...nodes].filter((e) => libraryNodeNames.includes(e.name))
          : [...nodes]
        : [];
    const setRef = (n: ParserField, ref: HTMLDivElement) => {
      tRefs[n.id] = ref;
      const renderedRefs = Object.keys(tRefs).length;
      const length =
        (showRelatedTo ? relationDrawingNodes?.parent.length || 0 : 0) +
        (relationDrawingNodes?.children.length || 0) +
        1;
      if (renderedRefs === length) {
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
        {relationDrawingNodes?.parent.length ? (
          <NodePane style={{ alignItems: 'start', paddingRight: 0 }}>
            {filterNodes(relationDrawingNodes?.parent).map((n, i) => (
              <Node
                enums={enumsOn}
                filteredFieldTypes={filteredFieldsTypes[n.id] || ''}
                setFilteredFieldsTypes={(q) =>
                  setFilteredFieldsTypes((ftt) => ({
                    ...ftt,
                    [n.id]: q,
                  }))
                }
                isLibrary={
                  schemaType === 'library'
                    ? true
                    : libraryNodeNames.includes(n.name)
                }
                key={n.id}
                setRef={(ref) => {
                  setRef(n, ref);
                }}
                field={n}
              />
            ))}
          </NodePane>
        ) : null}
        <NodePane
          style={{
            zIndex: 2,
            alignItems: 'center',
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          {relationDrawingNodes?.selected && (
            <Node
              enums={enumsOn}
              filteredFieldTypes={
                filteredFieldsTypes[relationDrawingNodes.selected.id] || ''
              }
              setFilteredFieldsTypes={(q) =>
                setFilteredFieldsTypes((ftt) => ({
                  ...ftt,
                  [relationDrawingNodes.selected.id]: q,
                }))
              }
              isLibrary={
                schemaType === 'library'
                  ? true
                  : libraryNodeNames.includes(
                      relationDrawingNodes.selected.name,
                    )
              }
              key={relationDrawingNodes.selected.id}
              setRef={(ref) => {
                setRef(relationDrawingNodes.selected, ref);
              }}
              field={relationDrawingNodes.selected}
            />
          )}
        </NodePane>
        <NodePane style={{ paddingLeft: 0 }}>
          {filterNodes(relationDrawingNodes?.children)
            .sort((a, b) => {
              const aIndex =
                relationDrawingNodes?.selected.args.findIndex(
                  (n) => getTypeName(n.type.fieldType) === a.name,
                ) || -1;
              const bIndex =
                relationDrawingNodes?.selected.args.findIndex(
                  (n) => getTypeName(n.type.fieldType) === b.name,
                ) || -1;

              return aIndex > bIndex ? 1 : -1;
            })
            .map((n, i) => (
              <Node
                enums={enumsOn}
                filteredFieldTypes={filteredFieldsTypes[n.id] || ''}
                setFilteredFieldsTypes={(q) =>
                  setFilteredFieldsTypes((ftt) => ({
                    ...ftt,
                    [n.id]: q,
                  }))
                }
                isLibrary={
                  schemaType === 'library'
                    ? true
                    : libraryNodeNames.includes(n.name)
                }
                key={n.id}
                setRef={(ref) => {
                  setRef(n, ref);
                }}
                field={n}
              />
            ))}
        </NodePane>
      </>
    );
  }, [schemaType, relationDrawingNodes, routes.code]);

  return (
    <Wrapper>
      <Main ref={mainRef}>
        {NodesContainer}
        {SvgLinesContainer}
      </Main>
    </Wrapper>
  );
};
