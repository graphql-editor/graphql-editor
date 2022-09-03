import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useRelationsState } from '@/state/containers';
import { Node } from './Node';
import styled from '@emotion/styled';
import { compareNodesWithData } from '@/compare/compareNodes';
import { sortByConnection } from './Algorithm';
import { Lines, RelationPath } from '@/Relation/Lines';

const Main = styled.div`
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  animation: show 1 0.5s ease-in-out;
  min-height: 100%;

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
export type FilteredFieldsTypesProps = {
  fieldsTypes?: string[];
  searchValueEmpty: boolean;
};

export const LinesDiagram: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { libraryTree, selectedNode, schemaType, tree, setSelectedNode } =
    useTreesState();
  const {
    refsLoaded,
    refs,
    setRefs,
    setRefsLoaded,
    setRelationDrawingNodes,
    relationDrawingNodes,
  } = useRelationsState();

  const [filteredFieldsTypes, setFilteredFieldsTypes] = useState<
    FilteredFieldsTypesProps | undefined
  >({
    fieldsTypes: [],
    searchValueEmpty: true,
  });
  const [relations, setRelations] =
    useState<
      { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    >();

  useEffect(() => {
    if (selectedNode?.field?.name) {
      const together = tree.nodes.concat(libraryTree.nodes);
      const relatedNodes = together.filter(
        (n) =>
          n.args?.find((a) => a.type.name === selectedNode.field?.name) ||
          compareNodesWithData(n, selectedNode.field) ||
          selectedNode.field?.args?.find((a) => a.type.name === n.name),
      );
      const resorted = sortByConnection(relatedNodes);
      const filtered = filteredFieldsTypes?.searchValueEmpty
        ? resorted
        : [
            selectedNode.field,
            ...resorted.filter((rn) =>
              filteredFieldsTypes?.fieldsTypes?.includes(rn.name.toLowerCase()),
            ),
          ];
      setRelationDrawingNodes(filtered);
      return;
    }
  }, [selectedNode, tree, libraryTree, filteredFieldsTypes]);

  useLayoutEffect(() => {
    if (refsLoaded) {
      console.log('RESETING RELATIONS');
      let i = 0;
      setRelations(
        relationDrawingNodes
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            fromLength: n.args?.length || 0,
            from: n.args
              ?.map((a) => {
                const pn = relationDrawingNodes.find(
                  (nf) => nf.name === a.type.name,
                );
                if (!pn) {
                  return;
                }
                return {
                  htmlNode: refs[pn.name + pn.data.type],
                  field: pn,
                  index: i++,
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
        setFilteredFieldsTypes={setFilteredFieldsTypes}
        isLibrary={
          schemaType === 'library' ? true : libraryNodeNames.includes(n.name)
        }
        fade={
          selectedNode?.field
            ? compareNodesWithData(selectedNode.field, n)
              ? false
              : selectedNode.field.args?.find((a) => a.type.name === n.name)
              ? false
              : n.args?.find((na) => na.type.name === selectedNode.field?.name)
              ? false
              : n.interfaces?.includes(selectedNode.field.name)
              ? false
              : true
            : undefined
        }
        key={n.name + n.data.type + i}
        setRef={(ref) => {
          tRefs[n.name + n.data.type] = ref;
          if (i === relationDrawingNodes.length - 1) {
            setRefs(tRefs);
            setTimeout(() => {
              setRefsLoaded(true);
            }, 100);
          }
        }}
        field={n}
      />
    ));
  }, [selectedNode, schemaType, relationDrawingNodes, filteredFieldsTypes]);

  return (
    <Main ref={mainRef} onClick={() => setSelectedNode(undefined)}>
      {NodesContainer}
      {SvgLinesContainer}
    </Main>
  );
};
