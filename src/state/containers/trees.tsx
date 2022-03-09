import { createContainer } from 'unstated-next';
import { useState, useCallback, useEffect } from 'react';
import { ParserTree, ParserField, TypeDefinition } from 'graphql-js-tree';
import { BuiltInScalars } from '@/GraphQL/Resolve';

type SchemaType = 'user' | 'library';

const useTreesStateContainer = createContainer(() => {
  const [tree, setTree] = useState<ParserTree>({ nodes: [] });
  const [treeCopy, setTreeCopy] = useState<ParserTree>({ nodes: [] });

  const [libraryTree, setLibraryTree] = useState<ParserTree>({ nodes: [] });
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [undos, setUndos] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<ParserField>();
  const [readonly, setReadonly] = useState(false);
  const [isTreeInitial, setIsTreeInitial] = useState(true);
  const [scalars, setScalars] = useState(BuiltInScalars.map((a) => a.name));
  const [nodesImplementsInterface, setNodesImplementsInterface] = useState<
    ParserField[]
  >([]);
  const [schemaType, setSchemaType] = useState<SchemaType>('user');

  useEffect(() => {
    updateScallars();
  }, [tree]);

  const updateScallars = () => {
    const ownScalars = tree.nodes
      .filter(
        (node) =>
          (node.data.type === TypeDefinition.ScalarTypeDefinition ||
            node.data.type === TypeDefinition.EnumTypeDefinition) &&
          node.name,
      )
      .map((scalar) => scalar.name);
    setScalars((prevValue) => [...prevValue, ...ownScalars]);
  };

  const switchSchema = (schemaType: SchemaType) => {
    setSchemaType(schemaType);
    if (schemaType === 'library') {
      setTreeCopy(tree);
      setTree({ nodes: [] });
      setReadonly(true);
    } else if (schemaType === 'user') {
      setTree(treeCopy);
      setReadonly(false);
    }
  };

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

  const relatedToSelected = useCallback(() => {
    const node =
      tree.nodes.find(
        (n) =>
          n.name === selectedNode?.name &&
          n.data.type === selectedNode.data.type,
      ) ||
      libraryTree.nodes.find(
        (n) =>
          n.name === selectedNode?.name &&
          n.data.type === selectedNode.data.type,
      );
    if (node) {
      return node.args?.map((a) => a.type.name);
    }
  }, [selectedNode]);

  const parentTypes = {
    ...tree.nodes.reduce(
      (obj: Record<string, string>, item: ParserField) =>
        Object.assign(obj, { [item.name]: item.type.name }),
      {},
    ),
    ...libraryTree.nodes.reduce(
      (obj: Record<string, string>, item: ParserField) =>
        Object.assign(obj, { [item.name]: item.type.name }),
      {},
    ),
  };

  const checkRelatedNodes = (node: ParserField) => {
    if (node.data.type === TypeDefinition.InterfaceTypeDefinition) {
      setNodesImplementsInterface(
        tree.nodes.filter((a) => a.interfaces?.includes(node.name)),
      );
    } else {
      setNodesImplementsInterface([]);
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
    past,
    undos,
    setUndos,
    future,
    relatedToSelected,
    readonly,
    setReadonly,
    isTreeInitial,
    setIsTreeInitial,
    parentTypes,
    scalars,
    nodesImplementsInterface,
    checkRelatedNodes,
    schemaType,
    switchSchema,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;
