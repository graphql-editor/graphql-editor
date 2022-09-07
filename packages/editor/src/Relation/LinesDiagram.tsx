import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useRelationsState } from '@/state/containers';
import { Node } from './Node';
import styled from '@emotion/styled';
import { sortByConnection } from './Algorithm';
import { Lines, RelationPath } from '@/Relation/Lines';
import { isScalarArgument } from '@/GraphQL/Resolve';
import * as vars from '@/vars';

const Main = styled.div`
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  gap: 80px;
  flex-wrap: wrap;
  animation: show 1 0.5s ease-in-out;
  min-height: 100%;
  transition: ${vars.transition};

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

let tRefs: Record<string, HTMLDivElement> = {};
let refTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
export type FilteredFieldsTypesProps = {
  fieldsTypes?: string[];
  searchValueEmpty: boolean;
};

const scrollToRef = (fieldName: string): unknown => {
  const ref = tRefs[fieldName];
  if (!ref) {
    return setTimeout(scrollToRef, 10);
  }
  ref.scrollIntoView({
    block: 'center',
    inline: 'center',
    behavior: 'smooth',
  });
};

type LinesDiagramProps = {
  mainRef: React.RefObject<HTMLDivElement>;
};

export const LinesDiagram: React.FC<LinesDiagramProps> = ({ mainRef }) => {
  const { libraryTree, selectedNode, schemaType, tree, setSelectedNode } =
    useTreesState();
  const {
    refsLoaded,
    refs,
    setRefs,
    setRefsLoaded,
    setRelationDrawingNodes,
    relationDrawingNodes,
    showRelatedTo,
    baseTypesOn,
    enumsOn,
  } = useRelationsState();

  const [filteredFieldsTypes, setFilteredFieldsTypes] = useState<
    Record<string, string>
  >({});
  const [scrolledTo, setScrolledTo] = useState('');
  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();
  useEffect(() => {
    if (scrolledTo == selectedNode?.field?.name) {
      return;
    }
    if (selectedNode?.field?.name && refsLoaded) {
      scrollToRef(selectedNode.field.name + selectedNode.field.data.type);
      setScrolledTo(selectedNode.field.name);
    }
  }, [refsLoaded]);
  useEffect(() => {
    if (!selectedNode) {
      setFilteredFieldsTypes({});
    } else {
      if (selectedNode?.field?.name && refsLoaded) {
        scrollToRef(selectedNode.field.name + selectedNode.field.data.type);
      }
    }
  }, [selectedNode]);

  useEffect(() => {
    setRefsLoaded(false);
    if (selectedNode?.field?.name) {
      const compareNode = {
        ...selectedNode.field,
        args: selectedNode.field.args?.filter((a) =>
          a.name
            .toLowerCase()
            .includes(
              filteredFieldsTypes[
                '' + selectedNode.field?.name + selectedNode.field?.data.type
              ] || '',
            ),
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
        .filter((n) => compareNode.args?.find((a) => a.type.name === n.name))
        .filter((n) => n.name !== selectedNode.field?.name);
      const relatedNames = relatedNodes.map((r) => r.name);
      const relatedToNodes = showRelatedTo
        ? based
            .filter((n) =>
              n.args?.find((arg) => arg.type.name === selectedNode.field?.name),
            )
            .filter((n) => n.name !== selectedNode.field?.name)
            .filter((n) => !relatedNames.includes(n.name))
        : [];
      const resorted = sortByConnection(relatedNodes);
      const resortedRelatedTo = sortByConnection(relatedToNodes);
      setRelationDrawingNodes([...resortedRelatedTo, selected, ...resorted]);
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
        relationDrawingNodes
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            fromLength: n.args?.length || 0,
            from: n.args
              ?.filter((a) =>
                a.name
                  .toLowerCase()
                  .includes(filteredFieldsTypes[n.name + n.data.type] || ''),
              )
              .map((a, index) => {
                const pn = relationDrawingNodes.find(
                  (nf) => nf.name === a.type.name,
                );
                if (!pn) {
                  return;
                }
                return {
                  htmlNode: refs[pn.name + pn.data.type],
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
  }, [refs, relationDrawingNodes, refsLoaded]);
  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} selectedNode={selectedNode?.field} />;
  }, [relations]);

  const NodesContainer = useMemo(() => {
    const libraryNodeNames = libraryTree.nodes.map((l) => l.name);

    const nodes =
      schemaType === 'library'
        ? [...relationDrawingNodes].filter((e) =>
            libraryNodeNames.includes(e.name),
          )
        : [...relationDrawingNodes];
    return nodes.map((n, i) => (
      <Node
        enums={enumsOn}
        filteredFieldTypes={filteredFieldsTypes[n.name + n.data.type] || ''}
        setFilteredFieldsTypes={(q) =>
          setFilteredFieldsTypes((ftt) => ({
            ...ftt,
            [n.name + n.data.type]: q,
          }))
        }
        isLibrary={
          schemaType === 'library' ? true : libraryNodeNames.includes(n.name)
        }
        key={n.name + n.data.type + i}
        setRef={(ref) => {
          tRefs[n.name + n.data.type] = ref;
          if (i === relationDrawingNodes.length - 1) {
            if (refTimeout) {
              clearTimeout(refTimeout);
            }
            refTimeout = setTimeout(() => {
              setRefs(tRefs);
              setRefsLoaded(true);
            }, 10);
          }
        }}
        field={n}
      />
    ));
  }, [schemaType, relationDrawingNodes]);

  return (
    <Main ref={mainRef} onClick={() => setSelectedNode(undefined)}>
      {NodesContainer}
      {SvgLinesContainer}
    </Main>
  );
};
