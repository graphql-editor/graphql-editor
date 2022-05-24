import { createContainer } from 'unstated-next';
import { useState, useCallback, useEffect } from 'react';
import {
  ParserTree,
  ParserField,
  TypeDefinition,
  Parser,
  OperationType,
} from 'graphql-js-tree';
import { Workers } from '@/worker';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { PassedSchema } from '@/Models';
import { useErrorsState } from '@/state/containers';

type SchemaType = 'user' | 'library';

const useTreesStateContainer = createContainer(() => {
  const [tree, setTree] = useState<ParserTree>({ nodes: [] });
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

  const { setLockGraf, setCodeErrors, transformCodeError } = useErrorsState();

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

  const switchSchema = (schema: PassedSchema) => {
    setSchemaType(schemaType === 'library' ? 'user' : 'library');
    if (schemaType === 'user') {
      setTree({ nodes: [] });
    } else if (schemaType === 'library') {
      setSelectedNode(undefined);
      generateTreeFromSchema(schema);
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

  const generateTreeFromSchema = (schema: PassedSchema) => {
    if (!schema.code) {
      setTree({ nodes: [] });
      return;
    }
    try {
      if (schema.libraries) {
        const excludeLibraryNodesFromDiagram = Parser.parse(schema.libraries);
        const parsedResult = Parser.parse(schema.code, [], schema.libraries);
        setTree({
          nodes: parsedResult.nodes.filter(
            (n) =>
              !excludeLibraryNodesFromDiagram.nodes.find(
                (eln) => eln.name === n.name && eln.data.type === n.data.type,
              ),
          ),
        });
      } else {
        const parsedCode = Parser.parse(schema.code);
        setTree(parsedCode);
      }
      if (schemaType === 'user') {
        Workers.validate(schema.code, schema.libraries).then((errors) => {
          const tranformedErrors = transformCodeError(errors);
          setCodeErrors(tranformedErrors);
          setLockGraf(
            tranformedErrors.map((e) => JSON.stringify(e, null, 4)).join('\n'),
          );
        });
      }
      setLockGraf(undefined);
    } catch (error) {
      Workers.validate(schema.code, schema.libraries).then((errors) => {
        const tranformedErrors = transformCodeError(errors);
        setCodeErrors(tranformedErrors);
        setLockGraf(
          tranformedErrors.map((e) => JSON.stringify(e, null, 4)).join('\n'),
        );
      });
    }
  };

  const isNodeBaseType = (nodeName: string) =>
    nodeName === OperationType.mutation ||
    nodeName === OperationType.query ||
    nodeName === OperationType.subscription;

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
    isTreeInitial,
    setIsTreeInitial,
    parentTypes,
    scalars,
    nodesImplementsInterface,
    checkRelatedNodes,
    schemaType,
    switchSchema,
    generateTreeFromSchema,
    readonly,
    setReadonly,
    isNodeBaseType,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;
