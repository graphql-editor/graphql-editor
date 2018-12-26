import { TransformedInput, GraphQLNodeType } from '../..';
import { LinkType, generateId } from '@slothking-online/diagram';
import { argumentTypes, SubTypes, Macros, nodeTypes } from '../../../../nodeTypes';
import { getDefinitionInputs, find } from '../../utils';
import { TemplateProps } from '../template';

const IDInputGenerate: TransformedInput = {
  name: 'id',
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
          type: nodeTypes.Query,
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
          type: nodeTypes.Mutation,
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
        let { node, inputs } = nodeInputs.find((n) => n.node.id === typeInput.clone);
        const hasId = inputs.find((i) => i.type === argumentTypes.ID && i.name === 'id');
        const InputIDNode: TransformedInput = hasId || IDInputGenerate;
        if (!!hasId) {
          inputs = inputs.filter((i) => i.id !== hasId.id);
        } else {
          nodeInputs = nodeInputs.map(
            (i) => (i.node.id === node.id ? { ...i, inputs: [...i.inputs, InputIDNode] } : i)
          );
        }
        const [createInput, updateInput, readInput, deleteInput] = [
          createBaseInputNode(typeInput, 'CreateInput', inputs),
          createBaseInputNode(typeInput, 'UpdateInput', inputs.concat([InputIDNode])),
          createBaseInputNode(typeInput, 'ReadInput', [InputIDNode]),
          createBaseInputNode(typeInput, 'DeleteInput', [InputIDNode])
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
          createBaseMutationNode(`delete${node.name}`, {
            inputs: [{ ...clonedTypeNode(deleteInput.node), name: node.name }],
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
    .reduce((a, b) => [...a, ...b], [])
    .concat(nodeInputs);
