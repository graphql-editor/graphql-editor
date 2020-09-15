import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ParserTree, AllTypes } from 'graphql-zeus';
const useTreesStateContainer = createContainer(() => {
  const [tree, setTree] = useState<ParserTree>({ nodes: [] });
  const [libraryTree, setLibraryTree] = useState<ParserTree>({ nodes: [] });
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [undos, setUndos] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<{ name: string; dataType: AllTypes }>();
  const selectedNodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    offsetLeft: number;
    offsetTop: number;
    width: number;
  }>();

  const past = () => {
    const p = snapshots.pop();
    if (p) {
      setUndos((u) => [...u, p]);
      setSnapshots([...snapshots]);
      return p;
    }
  };

  const future = () => {
    const p = undos.pop();
    if (p) {
      setUndos([...undos]);
      setSnapshots((s) => [...s, p]);
      return p;
    }
  };

  return {
    tree,
    setTree,
    libraryTree,
    setLibraryTree,
    snapshots,
    setSnapshots,
    selectedNode,
    setSelectedNode,
    selectedNodeRef,
    position,
    setPosition,
    past,
    undos,
    setUndos,
    future,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;