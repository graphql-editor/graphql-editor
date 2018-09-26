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

export const crudMacroTemplate = (
  nodes: GraphQLNodeType[],
  links: LinkType[],
  nodeInputs: TemplateProps[]
): TemplateProps[] =>
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
        const { node, inputs } = nodeInputs.find((n) => n.node.id === typeInput.clone);
        const [createInput, updateInput, readInput, removeInput] = [
          createBaseInputNode(typeInput, 'CreateInput', inputs),
          createBaseInputNode(typeInput, 'UpdateInput', inputs.concat([IDInputGenerate])),
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
          createBaseQueryNode(`list${node.name}`, {
            inputs: [],
            outputs: [
              {
                array: true,
                ...clonedTypeNode(node)
              }
            ]
          })
        );
        newNodes.push(
          createBaseQueryNode(`read${node.name}`, {
            inputs: [{ ...clonedTypeNode(readInput.node), name: node.name }],
            outputs: [
              {
                ...clonedTypeNode(node)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`create${node.name}`, {
            inputs: [{ ...clonedTypeNode(createInput.node), name: node.name }],
            outputs: [
              {
                ...clonedTypeNode(node)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`update${node.name}`, {
            inputs: [{ ...clonedTypeNode(updateInput.node), name: node.name }],
            outputs: [
              {
                ...clonedTypeNode(node)
              }
            ]
          })
        );
        newNodes.push(
          createBaseMutationNode(`remove${node.name}`, {
            inputs: [{ ...clonedTypeNode(removeInput.node), name: node.name }],
            outputs: [
              {
                ...clonedTypeNode(node)
              }
            ]
          })
        );
      }
      return newNodes;
    })
    .reduce((a, b) => [...a, ...b], []);
