import { createContainer } from 'unstated-next';
import { useMemo, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { sortByConnection } from '@/Relation/Algorithm';
import { useTreesState } from './trees';

const useRelationsContainer = createContainer(() => {
  const { tree, libraryTree } = useTreesState();

  const [currentNodes, setCurrentNodes] = useState<ParserField[]>(
    sortByConnection(tree.nodes.concat(libraryTree.nodes)),
  );
  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [refsLoaded, setRefsLoaded] = useState(false);
  const [relationDrawingNodes, setRelationDrawingNodes] = useState<{
    parent: ParserField[];
    selected: ParserField;
    children: ParserField[];
  }>();
  const relationDrawingNodesArray = useMemo(() => {
    return (
      relationDrawingNodes?.parent
        .concat([relationDrawingNodes.selected])
        .concat(relationDrawingNodes.children) || []
    );
  }, [relationDrawingNodes]);

  const [showRelatedTo, setShowRelatedTo] = useState(true);
  const [baseTypesOn, setBaseTypesOn] = useState(false);
  const [enumsOn, setEnumsOn] = useState(false);

  return {
    currentNodes,
    setCurrentNodes,
    refs,
    setRefs,
    refsLoaded,
    setRefsLoaded,
    relationDrawingNodesArray,
    relationDrawingNodes,
    setRelationDrawingNodes,
    showRelatedTo,
    setShowRelatedTo,
    setBaseTypesOn,
    baseTypesOn,
    enumsOn,
    setEnumsOn,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;
