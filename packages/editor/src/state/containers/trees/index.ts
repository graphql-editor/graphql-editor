import { createContainer } from 'unstated-next';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ParserTree,
  ParserField,
  TypeDefinition,
  Parser,
  getTypeName,
  compareParserFields,
  generateNodeId,
  mutate,
} from 'graphql-js-tree';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { PassedSchema } from '@/Models';
import { useErrorsState } from '@/state/containers';
import { ActiveSource } from '@/editor/menu/Menu';

type SelectedNode = {
  field?: ParserField;
  source: ActiveSource;
  justCreated?: boolean;
};

type TreeWithSource = ParserTree & { schema: boolean; initial: boolean };

const useTreesStateContainer = createContainer(() => {
  const [tree, _setTree] = useState<TreeWithSource>({
    nodes: [],
    schema: false,
    initial: true,
  });
  const [libraryTree, setLibraryTree] = useState<ParserTree>({ nodes: [] });
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [undos, setUndos] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const [readonly, setReadonly] = useState(false);
  const [scalars, setScalars] = useState(BuiltInScalars.map((a) => a.name));
  const { setLockGraf, setCodeErrors, transformCodeError } = useErrorsState();
  const allNodes = useMemo(() => {
    return { nodes: tree.nodes.concat(libraryTree.nodes) };
  }, [libraryTree, tree]);

  useEffect(() => {
    updateScallars();
  }, [tree]);

  const mutationRoot = useMemo(
    () => mutate(tree, allNodes.nodes),
    [tree, allNodes],
  );

  const parentTypes = useMemo(
    () => ({
      ...allNodes.nodes.reduce(
        (obj: Record<string, string>, item: ParserField) =>
          Object.assign(obj, { [item.name]: getTypeName(item.type.fieldType) }),
        {},
      ),
    }),
    [allNodes],
  );

  const libraryNodeIds = useMemo(
    () => libraryTree.nodes.map((n) => n.id),
    [libraryTree],
  );
  const isLibrary = useCallback(
    (id: string) => libraryNodeIds.includes(id),
    [libraryNodeIds],
  );
  const regenerateId = (n: ParserField) => {
    const id = generateNodeId(n.name, n.data.type, n.args);
    const shouldBeReselected = n.id === selectedNode?.field?.id && id !== n.id;
    n.id = id;
    return { id, shouldBeReselected };
  };
  const updateNode = (n: ParserField) => {
    const { shouldBeReselected } = regenerateId(n);
    setTree({ ...tree });
    if (shouldBeReselected) {
      setSelectedNode({
        source: 'diagram',
        field: {
          ...n,
        },
      });
    }
  };

  const setTree = (
    v: React.SetStateAction<Omit<TreeWithSource, 'schema' | 'initial'>>,
    blockSchemaUpdate?: boolean,
  ) => {
    if (typeof v === 'function') {
      _setTree((prevState) => {
        const result = v(prevState);
        return {
          ...result,
          schema: !!blockSchemaUpdate,
          initial: false,
        };
      });
      return;
    }
    _setTree({
      ...v,
      schema: !!blockSchemaUpdate,
      initial: false,
    });
  };

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
    if (selectedNode?.field) {
      const comparator = compareParserFields(selectedNode.field);
      const node =
        tree?.nodes.find(comparator) || libraryTree.nodes.find(comparator);
      if (node) {
        return node.args?.map((a) => getTypeName(a.type.fieldType));
      }
    }
  }, [selectedNode]);

  const generateTreeFromSchema = async (schema: PassedSchema) => {
    if (!schema.code) {
      setTree({ nodes: [] }, true);
      return;
    }
    try {
      if (schema.libraries) {
        const excludeLibraryNodesFromDiagram = Parser.parse(schema.libraries);
        await GraphQLEditorWorker.generateTree(
          schema.code,
          schema.libraries,
        ).then((parsedResult) => {
          const nodes = parsedResult.nodes.filter(
            (n) =>
              !excludeLibraryNodesFromDiagram.nodes.find(
                compareParserFields(n),
              ),
          );
          setTree(
            {
              nodes,
            },
            true,
          );
        });
      } else {
        await GraphQLEditorWorker.generateTree(schema.code).then(
          (parsedCode) => {
            setTree({ nodes: parsedCode.nodes }, true);
          },
        );
      }
      await GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
        (errors) => {
          const tranformedErrors = transformCodeError(errors);
          setCodeErrors(tranformedErrors);
          setLockGraf(
            tranformedErrors.map((e) => JSON.stringify(e, null, 4)).join('\n'),
          );
        },
      );
    } catch (error) {
      await GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
        (errors) => {
          const tranformedErrors = transformCodeError(errors);
          setCodeErrors(tranformedErrors);
          setLockGraf(
            tranformedErrors.map((e) => JSON.stringify(e, null, 4)).join('\n'),
          );
        },
      );
    }
  };
  const selectByTypeName = (typeName: string) => {
    let n = allNodes.nodes.find((tn) => tn.name === typeName);
    setSelectedNode(
      n && {
        field: n,
        source: 'relation',
      },
    );
  };
  const selectFieldParent = (field: ParserField) => {
    const fieldParentName = getTypeName(field.type.fieldType);
    selectByTypeName(fieldParentName);
  };

  const deleteFieldFromNode = (n: ParserField, i: number) => {
    mutationRoot.deleteFieldFromNode(n, i);
    updateNode(n);
  };

  const updateFieldOnNode = (
    node: ParserField,
    i: number,
    updatedField: ParserField,
  ) => {
    mutationRoot.updateFieldOnNode(node, i, updatedField);
    updateNode(node);
  };

  const addFieldToNode = (node: ParserField, f: ParserField, name?: string) => {
    let newName = name || f.name[0].toLowerCase() + f.name.slice(1);
    const existingNodes =
      node.args?.filter((a) => a.name.match(`${newName}\d?`)) || [];
    if (existingNodes.length > 0) {
      newName = `${newName}${existingNodes.length}`;
    }
    mutationRoot.addFieldToNode(node, {
      ...f,
      name: newName,
    });
    updateNode(node);
  };
  const renameNode = (node: ParserField, newName: string) => {
    const isError = allNodes.nodes.map((n) => n.name).includes(newName);
    if (isError) {
      return;
    }
    mutationRoot.renameNode(node, newName);
    updateNode(node);
  };
  const removeNode = (node: ParserField) => {
    const deselect = node.id === selectedNode?.field?.id;
    mutationRoot.removeNode(node);
    setTree({ ...tree });
    if (deselect) {
      setSelectedNode({
        source: 'relation',
        field: undefined,
      });
    }
  };
  const implementInterface = (
    node: ParserField,
    interfaceNode: ParserField,
  ) => {
    mutationRoot.implementInterface(node, interfaceNode);
    updateNode(node);
  };
  const deImplementInterface = (node: ParserField, interfaceName: string) => {
    mutationRoot.deImplementInterface(node, interfaceName);
    updateNode(node);
  };

  return {
    allNodes,
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
    parentTypes,
    scalars,
    generateTreeFromSchema,
    readonly,
    setReadonly,
    updateNode,
    selectByTypeName,
    selectFieldParent,
    isLibrary,
    /// new mutations
    deleteFieldFromNode,
    updateFieldOnNode,
    addFieldToNode,
    renameNode,
    removeNode,
    implementInterface,
    deImplementInterface,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;
