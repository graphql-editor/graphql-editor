import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ParserTree } from 'graphql-zeus';
const useTreesStateContainer = createContainer(() => {
  const [tree, _setTree] = useState<ParserTree>({ nodes: [] });
  const [libraryTree, setLibraryTree] = useState<ParserTree>({ nodes: [] });
  const [snapshots, setSnapshots] = useState<ParserTree[]>([]);
  const [undoCursor, setUndoCursor] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string>();

  const setTree = (t: ParserTree) => {
    const newUndoCursor = undoCursor + 1;
    setUndoCursor(newUndoCursor);
    setSnapshots((s) => {
      return [...s.slice(0, newUndoCursor), t];
    });
    _setTree(t);
  };
  return {
    tree,
    setTree,
    libraryTree,
    setLibraryTree,
    snapshots,
    setSnapshots,
    undoCursor,
    setUndoCursor,
    selectedNode,
    setSelectedNode,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;
