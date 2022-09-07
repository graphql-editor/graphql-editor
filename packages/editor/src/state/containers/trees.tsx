import { createContainer } from 'unstated-next';
import React, { useState, useCallback, useEffect } from 'react';
import {
  ParserTree,
  ParserField,
  TypeDefinition,
  Parser,
  getTypeName,
} from 'graphql-js-tree';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { PassedSchema } from '@/Models';
import { useErrorsState } from '@/state/containers';
import { compareNodesWithData } from '@/compare/compareNodes';
import { ActiveSource } from '@/editor/menu/Menu';

type SchemaType = 'user' | 'library';

type SelectedNode = {
  field?: ParserField;
  source: ActiveSource;
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
  const [schemaType, setSchemaType] = useState<SchemaType>('user');

  const { setLockGraf, setCodeErrors, transformCodeError, codeErrors } =
    useErrorsState();

  useEffect(() => {
    updateScallars();
  }, [tree]);

  useEffect(() => {
    codeErrors.length && setSelectedNode(undefined);
  }, [codeErrors]);

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

  const switchSchema = () => {
    setSelectedNode(undefined);
    setSchemaType(schemaType === 'library' ? 'user' : 'library');
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
      tree?.nodes.find((n) => compareNodesWithData(n, selectedNode?.field)) ||
      libraryTree.nodes.find((n) =>
        compareNodesWithData(n, selectedNode?.field),
      );
    if (node) {
      return node.args?.map((a) => getTypeName(a.type.fieldType));
    }
  }, [selectedNode]);

  const parentTypes = {
    ...tree.nodes.reduce(
      (obj: Record<string, string>, item: ParserField) =>
        Object.assign(obj, { [item.name]: getTypeName(item.type.fieldType) }),
      {},
    ),
    ...libraryTree.nodes.reduce(
      (obj: Record<string, string>, item: ParserField) =>
        Object.assign(obj, { [item.name]: getTypeName(item.type.fieldType) }),
      {},
    ),
  };

  const generateTreeFromSchema = (schema: PassedSchema) => {
    if (!schema.code) {
      setTree({ nodes: [] }, true);
      return;
    }
    try {
      if (schema.libraries) {
        const excludeLibraryNodesFromDiagram = Parser.parse(schema.libraries);
        const parsedResult = Parser.parse(schema.code, [], schema.libraries);
        setTree(
          {
            nodes: parsedResult.nodes.filter(
              (n) =>
                !excludeLibraryNodesFromDiagram.nodes.find(
                  (eln) => eln.name === n.name && eln.data.type === n.data.type,
                ),
            ),
          },
          true,
        );
      } else {
        const parsedCode = Parser.parse(schema.code);
        setTree({ nodes: parsedCode.nodes }, true);
      }
      if (schemaType === 'user') {
        GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
          (errors) => {
            const tranformedErrors = transformCodeError(errors);
            setCodeErrors(tranformedErrors);
            setLockGraf(
              tranformedErrors
                .map((e) => JSON.stringify(e, null, 4))
                .join('\n'),
            );
          },
        );
      }
      setLockGraf(undefined);
    } catch (error) {
      GraphQLEditorWorker.validate(schema.code, schema.libraries).then(
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
    parentTypes,
    scalars,
    schemaType,
    switchSchema,
    generateTreeFromSchema,
    readonly,
    setReadonly,
  };
});

export const useTreesState = useTreesStateContainer.useContainer;
export const TreesStateProvider = useTreesStateContainer.Provider;
