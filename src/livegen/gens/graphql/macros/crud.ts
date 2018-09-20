import { TransformedInput, GraphQLNodeType } from '../..';
import { LinkType, generateId } from '@slothking-online/diagram';
import { argumentTypes, SubTypes, Macros, nodeTypes } from '../../../../nodeTypes';
import { getDefinitionInputs, find } from '../../utils';

const IDInputGenerate: TransformedInput = {
  name: argumentTypes.ID,
  type: argumentTypes.ID,
  inputs: [],
  outputs: [],
  subType: SubTypes.field
};

export const crudMacroTemplate = (
  nodes: GraphQLNodeType[],
  links: LinkType[]
): {
  node: GraphQLNodeType;
  inputs: TransformedInput[];
}[][] =>
  find(nodes, Macros.crud).map((n) => {
    const newNodes: {
      node: GraphQLNodeType;
      inputs: TransformedInput[];
    }[] = [];
    const createBaseInputNode = (
      node: GraphQLNodeType,
      name: string,
      inputs: TransformedInput[]
    ) => ({
      node: {
        ...node,
        id: generateId(),
        type: nodeTypes.input,
        name: `${node.name}${name}`
      },
      inputs
    });
    const createBaseQueryNode = (
      name: string,
      inputs: TransformedInput[]
    ): { node: GraphQLNodeType; inputs: TransformedInput[] } => ({
      node: {
        id: generateId(),
        type: nodeTypes.query,
        subType: SubTypes.definition,
        name: `${name}`,
        inputs: [],
        outputs: []
      },
      inputs
    });
    const createBaseMutationNode = (
      name: string,
      inputs: TransformedInput[]
    ): { node: GraphQLNodeType; inputs: TransformedInput[] } => ({
      node: {
        id: generateId(),
        type: nodeTypes.mutation,
        subType: SubTypes.definition,
        name: `${name}`,
        inputs: [],
        outputs: []
      },
      inputs
    });
    const macroTypeInputs = getDefinitionInputs(links, nodes, n);
    for (var typeInput of macroTypeInputs) {
      const originalNode = nodes.find((o) => o.id === typeInput.clone);
      const inps = getDefinitionInputs(links, nodes, originalNode);
      const [createInput, updateInput, readInput, deleteInput] = [
        createBaseInputNode(typeInput, 'CreateInput', inps),
        createBaseInputNode(typeInput, 'UpdateInput', inps.concat([IDInputGenerate])),
        createBaseInputNode(typeInput, 'ReadInput', [IDInputGenerate]),
        createBaseInputNode(typeInput, 'DeleteInput', [IDInputGenerate])
      ];
      newNodes.push(createInput);
      newNodes.push(updateInput);
      newNodes.push(readInput);
      newNodes.push(deleteInput);
      const clonedTypeNode = (n: GraphQLNodeType): GraphQLNodeType => ({
        ...n,
        id: generateId(),
        clone: n.id,
        subType: SubTypes.clone,
        kind: n.name
      });
      newNodes.push(
        createBaseQueryNode(typeInput.name, [
          {
            ...clonedTypeNode(originalNode),
            name: 'list',
            array: true
          },
          {
            ...clonedTypeNode(originalNode),
            name: 'read',
            args: [
              {
                ...clonedTypeNode(readInput.node),
                name: originalNode.name
              }
            ]
          }
        ])
      );
      newNodes.push(
        createBaseMutationNode(typeInput.name, [
          {
            ...clonedTypeNode(originalNode),
            name: 'create',
            args: [
              {
                ...clonedTypeNode(createInput.node),
                name: originalNode.name
              }
            ]
          },
          {
            ...clonedTypeNode(originalNode),
            name: 'update',
            args: [
              {
                ...clonedTypeNode(updateInput.node),
                name: originalNode.name
              }
            ]
          },
          {
            ...clonedTypeNode(originalNode),
            name: 'delete',
            args: [
              {
                ...clonedTypeNode(deleteInput.node),
                name: originalNode.name
              }
            ]
          }
        ])
      );
    }
    // const createBaseCloneTypeNode = (
    //   node: GraphQLNodeType,
    //   name: string,
    //   inputs: TransformedInput[]
    // ) => ({
    //   node: {
    //     ...node,
    //     id: generateId(),
    //     clone: node.id,
    //     type: nodeTypes.type,
    //     name
    //   },
    //   inputs
    // });
    return newNodes;
  });
