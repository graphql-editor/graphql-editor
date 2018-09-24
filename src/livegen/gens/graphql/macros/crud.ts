import { TransformedInput, GraphQLNodeType } from '../..';
import { LinkType, generateId } from '@slothking-online/diagram';
import { argumentTypes, SubTypes, Macros, nodeTypes } from '../../../../nodeTypes';
import { getDefinitionInputs, find } from '../../utils';
import { TemplateProps } from '../template';

const IDInputGenerate: TransformedInput = {
  name: argumentTypes.ID,
  type: argumentTypes.ID,
  inputs: [],
  outputs: [],
  subType: SubTypes.field
};

export const crudMacroTemplate = (nodes: GraphQLNodeType[], links: LinkType[]): TemplateProps[] =>
  find(nodes, Macros.crud)
    .map((n) => {
      const newNodes: {
        node: GraphQLNodeType;
        inputs: TransformedInput[];
      }[] = [];
      const createBaseInputNode = (
        node: GraphQLNodeType,
        name: string,
        inputs: TransformedInput[],
        outputs?: TransformedInput[]
      ): TemplateProps => ({
        node: {
          ...node,
          id: generateId(),
          type: nodeTypes.input,
          name: `${node.name}${name}`
        },
        inputs,
        outputs: []
      });
      const createBaseQueryNode = (
        name: string,
        { inputs, outputs }: Partial<TemplateProps>
      ): TemplateProps => ({
        node: {
          id: generateId(),
          type: nodeTypes.query,
          subType: SubTypes.definition,
          name: `${name}`,
          inputs: [],
          outputs: []
        },
        inputs,
        outputs
      });
      const createBaseMutationNode = (
        name: string,
        { inputs, outputs }: Partial<TemplateProps>
      ): TemplateProps => ({
        node: {
          id: generateId(),
          type: nodeTypes.mutation,
          subType: SubTypes.definition,
          name: `${name}`,
          inputs: [],
          outputs: []
        },
        inputs,
        outputs
      });
      const macroTypeInputs = getDefinitionInputs(links, nodes, n);
      for (var typeInput of macroTypeInputs) {
        const originalNode = nodes.find((o) => o.id === typeInput.clone);
        const inps = getDefinitionInputs(links, nodes, originalNode);
        const [createInput, updateInput, readInput, removeInput] = [
          createBaseInputNode(typeInput, 'CreateInput', inps),
          createBaseInputNode(typeInput, 'UpdateInput', inps.concat([IDInputGenerate])),
          createBaseInputNode(typeInput, 'ReadInput', [IDInputGenerate]),
          createBaseInputNode(typeInput, 'RemoveInput', [IDInputGenerate])
        ];
        newNodes.push(createInput);
        newNodes.push(updateInput);
        newNodes.push(readInput);
        newNodes.push(removeInput);
        const clonedTypeNode = (n: GraphQLNodeType): GraphQLNodeType => ({
          ...n,
          id: generateId(),
          clone: n.id,
          subType: SubTypes.clone,
          kind: n.name
        });
        newNodes.push(
          createBaseQueryNode(`list${originalNode.name}`, {
            inputs: [createInput.node],
            outputs: [
              {
                array: true,
                ...clonedTypeNode(originalNode)
              }
            ]
          })
        );
        newNodes.push(
          createBaseQueryNode(`read${originalNode.name}`, {
            inputs: [{ ...clonedTypeNode(readInput.node), name: originalNode.name }],
            outputs: [
              {
                ...clonedTypeNode(originalNode)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`create${originalNode.name}`, {
            inputs: [{ ...clonedTypeNode(createInput.node), name: originalNode.name }],
            outputs: [
              {
                ...clonedTypeNode(originalNode)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`update${originalNode.name}`, {
            inputs: [{ ...clonedTypeNode(updateInput.node), name: originalNode.name }],
            outputs: [
              {
                ...clonedTypeNode(originalNode)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`remove${originalNode.name}`, {
            inputs: [{ ...clonedTypeNode(removeInput.node), name: originalNode.name }],
            outputs: [
              {
                ...clonedTypeNode(originalNode)
              }
            ]
          })
        );
      }
      return newNodes;
    })
    .reduce((a, b) => [...a, ...b], []);
