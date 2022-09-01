import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { sortByConnection } from '@/Relation/Algorithm';
import { useTreesState } from './trees';

const useRelationsContainer = createContainer(() => {
  const { tree, libraryTree } = useTreesState();

  const [focusedNode, setFocusedNode] = useState<ParserField>();
  const [currentNodes, setCurrentNodes] = useState<ParserField[]>(
    sortByConnection(tree.nodes.concat(libraryTree.nodes)),
  );
  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [refsLoaded, setRefsLoaded] = useState(false);
  const [relationDrawingNodes, setRelationDrawingNodes] = useState<
    ParserField[]
  >([]);

  return {
    focusedNode,
    setFocusedNode,
    currentNodes,
    setCurrentNodes,
    refs,
    setRefs,
    refsLoaded,
    setRefsLoaded,
    relationDrawingNodes,
    setRelationDrawingNodes,
  };
});

export const useRelationsState = useRelationsContainer.useContainer;
export const RelationsProvider = useRelationsContainer.Provider;
