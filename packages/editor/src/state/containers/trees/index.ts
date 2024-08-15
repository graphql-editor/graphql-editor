import { createContainer } from "unstated-next";
import React, { useState, useCallback, useMemo } from "react";
import {
  ParserTree,
  ParserField,
  TypeDefinition,
  getTypeName,
  mutate,
  OperationType,
  Instances,
  TypeSystemDefinition,
  createPlainField,
  createSchemaDefinition,
  TypeSystemExtension,
} from "graphql-js-tree";
import { GraphQLEditorWorker } from "graphql-editor-worker";
import {
  BuiltInScalars,
  isBaseScalar,
  isExtensionNode,
} from "@/GraphQL/Resolve";
import { PassedSchema } from "@/Models";
import { useErrorsState } from "@/state/containers";
import { ActiveSource } from "@/editor/menu/Menu";
import { DOMEvents } from "@/shared/hooks/DOMClassNames";

type SelectedNodeId = {
  value?: {
    name: string;
    id: string;
  };
  source: ActiveSource;
  justCreated?: boolean;
};

type TreeWithSource = ParserTree & { schema: boolean; initial: boolean };
let snapLock = true;

const useTreesStateContainer = createContainer(() => {
  const [tree, _setTree] = useState<TreeWithSource>({
    nodes: [],
    schema: false,
    initial: true,
  });
  const [libraryTree, setLibraryTree] = useState<ParserTree>({ nodes: [] });
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [focusMode, setFocusMode] = useState<string>();
  const [undos, setUndos] = useState<string[]>([]);
  const [selectedNodeId, _setSelectedNodeId] = useState<SelectedNodeId>();
  const [readonly, setReadonly] = useState(false);
  const { setCodeErrors } = useErrorsState();

  const allNodes = useMemo(() => {
    return { nodes: tree.nodes };
  }, [tree]);

  const activeNode = useMemo(() => {
    return allNodes.nodes.find((n) => n.id === selectedNodeId?.value?.id);
  }, [selectedNodeId, allNodes]);

  const scalars = useMemo(() => {
    const ownScalars = allNodes.nodes
      .filter(
        (node) =>
          (node.data.type === TypeDefinition.ScalarTypeDefinition ||
            node.data.type === TypeDefinition.EnumTypeDefinition) &&
          node.name
      )
      .map((scalar) => scalar.name)
      .concat(BuiltInScalars.map((a) => a.name));
    return ownScalars;
  }, [allNodes]);

  const mutationRoot = useMemo(
    () => mutate(tree, allNodes.nodes),
    [tree, allNodes]
  );

  const parentTypes = useMemo(
    () => ({
      ...allNodes.nodes.reduce(
        (obj: Record<string, string>, item: ParserField) =>
          Object.assign(obj, { [item.name]: getTypeName(item.type.fieldType) }),
        {}
      ),
    }),
    [allNodes]
  );

  const isLibrary = useCallback((node: ParserField) => !!node.fromLibrary, []);

  const updateNode = (node: ParserField, fn?: () => void) => {
    const isSelected = node.id === selectedNodeId?.value?.id;
    makeSnapshot();
    fn?.();
    setTree(tree);
    if (isSelected) {
      if (selectedNodeId.value?.id !== node.id) {
        setSelectedNodeId({
          source: "relation",
          value: {
            id: node.id,
            name: node.name,
          },
        });
      } else {
        if (!tree.nodes.find((n) => n.id === node.id)) {
          setSelectedNodeId({
            source: "relation",
            value: undefined,
          });
        }
      }
    }
  };

  const setTree = (
    v: React.SetStateAction<Omit<TreeWithSource, "schema" | "initial">>,
    blockSchemaUpdate?: boolean
  ) => {
    if (typeof v === "function") {
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

  const past = () => {
    const p = snapshots.pop();
    if (p) {
      setUndos((u) => [...u, p]);
      setSnapshots([...snapshots]);
      return JSON.parse(p) as SnapshotType;
    }
  };

  const future = () => {
    const p = undos.pop();
    if (p) {
      setUndos([...undos]);
      setSnapshots((s) => [...s, p]);
      return JSON.parse(p) as SnapshotType;
    }
  };

  const makeSnapshot = () => {
    if (snapLock) {
      snapLock = false;
      return;
    }
    const copyTree = JSON.stringify({ tree, selectedNodeId } as SnapshotType);
    if (snapshots.length === 0) {
      setSnapshots([copyTree]);
      return;
    }
    if (snapshots[snapshots.length - 1] !== copyTree) {
      setSnapshots([...snapshots, copyTree]);
    }
  };
  const undo = () => {
    const p = past();
    if (p) {
      snapLock = true;
      setTree(p.tree);
      setSelectedNodeId(p.selectedNodeId);
    }
  };
  const redo = () => {
    const f = future();
    if (f) {
      snapLock = true;
      setTree(f.tree);
      setSelectedNodeId(f.selectedNodeId);
    }
  };

  const relatedToSelectedTypes = (activeNode?: ParserField) => {
    const parents = allNodes.nodes.filter((node) =>
      activeNode?.args
        .flatMap((ana) => ana.args)
        .map((ana) => getTypeName(ana.type.fieldType))
        .includes(node.name)
    );
    const inputs = allNodes.nodes.filter((an) =>
      an.args.find(
        (ana) =>
          getTypeName(ana.type.fieldType) === activeNode?.name ||
          ana.args.find(
            (nestedArg) =>
              getTypeName(nestedArg.type.fieldType) === activeNode?.name
          )
      )
    );
    const interfacesRelatedToActiveNode = allNodes.nodes.filter((node) =>
      activeNode?.interfaces.includes(node.name)
    );
    const nodesRelatedToActiveInterface =
      activeNode &&
      activeNode.data.type === TypeDefinition.InterfaceTypeDefinition
        ? allNodes.nodes.filter((node) =>
            node.interfaces.includes(activeNode.name)
          )
        : [];
    const nodeExtensions = allNodes.nodes.filter(
      (node) =>
        isExtensionNode(node.data.type) &&
        node.name === activeNode?.name &&
        node.id !== activeNode.id
    );
    const basicNodeToNodeExtension =
      (activeNode &&
        isExtensionNode(activeNode?.data.type) &&
        allNodes.nodes.filter(
          (node) =>
            node.name === activeNode.name &&
            !isExtensionNode(node.data.type) &&
            node.id !== activeNode.id
        )) ||
      [];
    const argsTypeRelated = allNodes.nodes.filter((node) =>
      activeNode?.args
        .map((arg) => getTypeName(arg.type.fieldType))
        .includes(node.name)
    );

    const notBaseTypes = argsTypeRelated
      .concat(parents)
      .concat(inputs)
      .concat(interfacesRelatedToActiveNode)
      .concat(nodesRelatedToActiveInterface)
      .concat(nodeExtensions)
      .concat(basicNodeToNodeExtension)
      .filter((n) => !isBaseScalar(n.name));
    const filtered = notBaseTypes?.filter(
      (t, index) => index === notBaseTypes.indexOf(t)
    );
    return filtered;
  };

  const relatedToSelected = useMemo(
    () => relatedToSelectedTypes(activeNode),
    [activeNode]
  );

  const relatedNodeIdsToSelected = useMemo(() => {
    return relatedToSelected?.map((n) => n.id);
  }, [relatedToSelected, allNodes]);
  const setSelectedNodeId = useCallback(
    (_selectedNodeId: SelectedNodeId) => {
      const nodeId = _selectedNodeId?.value?.id;
      if (
        nodeId !== selectedNodeId?.value?.id ||
        _selectedNodeId?.justCreated !== selectedNodeId?.justCreated
      ) {
        DOMEvents.selectNode.trigger(nodeId);
        setTimeout(() => {
          return _setSelectedNodeId(_selectedNodeId);
        }, 250);
      }
    },
    [_setSelectedNodeId, allNodes, selectedNodeId?.value?.id, focusMode]
  );
  const setSelectedNodeIdThatWillBeAdded = useCallback(
    (_selectedNodeId: SelectedNodeId) => {
      const nodeId = _selectedNodeId?.value?.id;
      if (
        nodeId !== selectedNodeId?.value?.id ||
        _selectedNodeId?.justCreated !== selectedNodeId?.justCreated
      ) {
        return _setSelectedNodeId(_selectedNodeId);
      }
    },
    [_setSelectedNodeId, allNodes, selectedNodeId?.value?.id, focusMode]
  );
  const generateTreeFromSchema = async (schema: PassedSchema) => {
    if (!schema.code && !schema.libraries) {
      setTree({ nodes: [] }, true);
      return;
    }
    try {
      await GraphQLEditorWorker.generateTree({
        schema: schema.code,
        libraries: schema.libraries,
      }).then((parsedResult) => {
        setTree(
          {
            nodes: parsedResult.nodes,
          },
          true
        );
      });
      await GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
        (errors) => {
          setCodeErrors(errors);
        }
      );
    } catch (error) {
      await GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
        (errors) => {
          setCodeErrors(errors);
        }
      );
    }
  };

  const updateFieldOnNode = (
    node: ParserField,
    i: number,
    updatedField: ParserField,
    parentNode: string
  ) => {
    updateNode(node, () =>
      mutationRoot.updateFieldOnNode(node, i, updatedField, parentNode)
    );
  };

  const addFieldToNode = (
    node: ParserField,
    f: ParserField,
    name: string,
    parentNode: string
  ) => {
    updateNode(node, () => {
      let newName = name || f.name[0].toLowerCase() + f.name.slice(1);
      const existingNodes =
        // eslint-disable-next-line no-useless-escape
        node.args?.filter((a) => a.name.match(`${newName}\d?`)) || [];
      if (existingNodes.length > 0) {
        newName = `${newName}${existingNodes.length}`;
      }
      mutationRoot.addFieldToNode(
        node,
        {
          ...f,
          name: newName,
        },
        parentNode
      );
    });
  };
  const renameNode = (node: ParserField, newName: string) => {
    const isError = allNodes.nodes.map((n) => n.name).includes(newName);
    if (isError) {
      return;
    }
    updateNode(node, () => mutationRoot.renameRootNode(node, newName));
  };
  const removeFieldFromNode = (
    node: ParserField,
    field: ParserField,
    parentNode: string
  ) => {
    updateNode(node, () => {
      if (field.data.type === Instances.Argument) {
        node.args = node.args.filter((a) => a.id !== field.id);
        return;
      }
      mutationRoot.removeNode(field, parentNode);
    });
  };
  const removeNode = (node: ParserField) => {
    updateNode(node, () => {
      mutationRoot.removeNode(node);
    });
  };
  const implementInterface = (
    node: ParserField,
    interfaceNode: ParserField
  ) => {
    updateNode(node, () =>
      mutationRoot.implementInterface(node, interfaceNode)
    );
  };
  const deImplementInterface = (node: ParserField, interfaceName: string) => {
    updateNode(node, () =>
      mutationRoot.deImplementInterface(node, interfaceName)
    );
  };
  const setValue = (node: ParserField, value?: string) => {
    updateNode(node, () => {
      if (!value) {
        delete node.value;
        return;
      }
      mutationRoot.setValueNode(node, value);
    });
  };
  const idempotentOperationAssign = (node: ParserField) => {
    const nodeName = node.name.toLowerCase();
    if (
      !(
        nodeName === "query" ||
        nodeName === "mutation" ||
        nodeName === "subscription"
      )
    ) {
      return;
    }
    let schemaNode = allNodes.nodes.find(
      (n) => n.data.type === TypeSystemDefinition.SchemaDefinition
    );
    if (!schemaNode) {
      schemaNode = createSchemaDefinition({});
    }
    if (
      node.name.toLowerCase() === "query" &&
      !schemaNode.args.find((a) => a.name === OperationType.query)
    ) {
      schemaNode.args.push(
        createPlainField({ name: OperationType.query, type: node.name })
      );
    }
    if (
      node.name.toLowerCase() === "mutation" &&
      !schemaNode.args.find((a) => a.name === OperationType.mutation)
    ) {
      schemaNode.args.push(
        createPlainField({ name: OperationType.mutation, type: node.name })
      );
    }
    if (
      node.name.toLowerCase() === "subscription" &&
      !schemaNode.args.find((a) => a.name === OperationType.subscription)
    ) {
      schemaNode.args.push(
        createPlainField({ name: OperationType.subscription, type: node.name })
      );
    }
    tree.nodes = tree.nodes.filter(
      (n) => n.data.type !== TypeSystemDefinition.SchemaDefinition
    );
    tree.nodes.push(schemaNode);
  };
  const setOperationNode = (
    operationType: OperationType,
    node: ParserField
  ) => {
    let noSchemaDefinitionNode = true;
    tree.nodes.forEach((n) => {
      if (n.data.type === TypeSystemDefinition.SchemaDefinition) {
        noSchemaDefinitionNode = false;
        n.args = [
          ...n.args.filter((a) => a.name !== operationType),
          createPlainField({
            name: operationType,
            type: node.name,
          }),
        ];
      }
    });
    if (noSchemaDefinitionNode) {
      tree.nodes.push(
        createSchemaDefinition({
          operations: {
            [operationType]: node.name,
          },
        })
      );
    }
    setTree(tree);
  };
  const removeSchemaNodeField = (operationType: OperationType) => {
    let removeSchemaNodeDefinition = false;
    tree.nodes.forEach((n) => {
      if (n.data.type === TypeSystemDefinition.SchemaDefinition) {
        n.args = n.args.filter((a) => a.name !== operationType);
        if (n.args.length === 0) {
          removeSchemaNodeDefinition = true;
        }
      }
    });
    if (removeSchemaNodeDefinition) {
      tree.nodes = tree.nodes.filter(
        (n) =>
          n.data.type !== TypeSystemDefinition.SchemaDefinition &&
          n.data.type !== TypeSystemExtension.SchemaExtension
      );
    }
    setTree(tree);
  };
  const queryNode = useMemo(() => {
    const schemaNode = allNodes.nodes.find(
      (n) => n.data.type === TypeSystemDefinition.SchemaDefinition
    );
    const query = schemaNode?.args.find((a) => a.name === OperationType.query);
    const queryNode =
      query &&
      allNodes.nodes.find((n) => n.name === getTypeName(query.type.fieldType));
    return queryNode;
  }, [allNodes]);
  const getParentOfField = (f: ParserField) => {
    const tName = getTypeName(f.type.fieldType);
    if (isBaseScalar(tName)) return;
    const node = allNodes.nodes.find(
      (n) => n.name === tName && !isExtensionNode(n.data.type)
    );
    return node;
  };

  const focusNode = useCallback(
    (n: ParserField) => {
      setSelectedNodeId({
        source: "deFocus",
        value: {
          id: n.id,
          name: n.name,
        },
      });
      setFocusMode(n.id);
    },
    [setSelectedNodeId, setFocusMode]
  );
  const exitFocus = useCallback(() => {
    setSelectedNodeId({
      source: "deFocus",
      value: selectedNodeId?.value,
    });
    setFocusMode(undefined);
  }, [selectedNodeId, setSelectedNodeId]);
  const focusedNode = useMemo(() => {
    if (!focusMode) return;
    return allNodes.nodes.find((n) => n.id === focusMode);
  }, [focusMode, allNodes]);
  return {
    allNodes,
    tree,
    setTree,
    libraryTree,
    setLibraryTree,
    snapshots,
    setSnapshots,
    selectedNodeId,
    setSelectedNodeId,
    setSelectedNodeIdThatWillBeAdded,
    queryNode,
    getParentOfField,
    activeNode,
    past,
    undos,
    setUndos,
    undo,
    redo,
    makeSnapshot,
    future,
    relatedNodeIdsToSelected,
    relatedToSelectedTypes,
    relatedToSelected,
    parentTypes,
    scalars,
    generateTreeFromSchema,
    readonly,
    setReadonly,
    updateNode,
    isLibrary,
    /// new mutations
    updateFieldOnNode,
    addFieldToNode,
    renameNode,
    removeNode,
    removeFieldFromNode,
    implementInterface,
    deImplementInterface,
    setValue,
    //schema
    setOperationNode,
    removeSchemaNodeField,
    idempotentOperationAssign,
    // focus
    focusMode,
    focusedNode,
    focusNode,
    exitFocus,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;

type SnapshotType = {
  tree: ParserTree;
  selectedNodeId: SelectedNodeId;
};
