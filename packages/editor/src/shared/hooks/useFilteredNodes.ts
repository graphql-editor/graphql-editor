import { ParserField } from 'graphql-js-tree';
import { useEffect, useRef, useState } from 'react';

export const useFilteredNodes = (allNodes: { nodes: ParserField[] }) => {
  const [allNodesFiltered, setAllNodesFiltered] = useState(allNodes);
  const firstMount = useRef(true);

  console.log('ąallNodesFiltered', allNodesFiltered);

  useEffect(() => {
    if (!firstMount) return;

    if (allNodes.nodes.length) {
      firstMount.current = false;
    }

    setAllNodesFiltered(allNodes);
  }, [allNodes]);

  const hideAllNodes = () => setAllNodesFiltered({ nodes: [] });

  return {
    allNodesFiltered,
    hideAllNodes,
  };
};
