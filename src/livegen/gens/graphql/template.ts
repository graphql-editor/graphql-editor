import { TransformedInput, GraphQLNodeType } from '..';
import { NodeType, LinkType } from '@slothking-online/diagram';
import { resolveType } from './map';
import { SubTypes, nodeTypes, allTypes } from '../../../nodeTypes';
import { getDefinitionInputs, find } from '../utils';

const notDefinition = (inputs: TransformedInput[]): TransformedInput[] =>
  inputs.filter((i) => i.subType !== SubTypes.definition);
const notInterface = (inputs: TransformedInput[]): TransformedInput[] =>
  inputs.filter((i) => i.type !== nodeTypes.interface);
const implementsInterface = (inputs: TransformedInput[]) => {
  const interfaces = inputs.filter((i) => i.type === 'interface').map((i) => i.kind);
  if (interfaces.length) {
    return ` implements ${interfaces.join(' & ')}`;
  }
  return '';
};
export const baseTypeContentTemplate = (node: GraphQLNodeType, inputs: TransformedInput[]) =>
  `\t${notInterface(notDefinition(inputs))
    .map((i) => resolveType(i, 'type', 'input'))
    .join(',\n\t')}`;

export const baseTypeTemplate = (name: keyof typeof nodeTypes) => (
  node: GraphQLNodeType,
  inputs: TransformedInput[]
) => `${name} ${node.name}${implementsInterface(inputs)}{
${baseTypeContentTemplate(node, inputs)}
}`;

export const typeTemplate = baseTypeTemplate('type');
export const interfaceTemplate = baseTypeTemplate('interface');
export const inputTemplate = baseTypeTemplate('input');
export const queryTemplate = (node: GraphQLNodeType, inputs: TransformedInput[]) =>
  `${notInterface(notDefinition(inputs))
    .map(
      (i) =>
        '\t' +
        resolveType(
          {
            ...i,
            name: `${i.name}${node.name}`
          },
          'query',
          'input'
        )
    )
    .join(',\n')}`;
export const rootQueryTemplate = (queries: string) => `type Query{
${queries}
}`;
export const rootMutationTemplate = (mutations: string) => `type Mutation{
${mutations}
}`;

export const enumTemplate = (node: NodeType, inputs: TransformedInput[]) => `enum ${node.name}{
\t${inputs.map((i) => resolveType(i, 'enum', 'input')).join(',\n\t')}
}`;

export const generateCode = (nodes: GraphQLNodeType[], links: LinkType[]) => (
  type: allTypes,
  func: (node: GraphQLNodeType, inputs: TransformedInput[]) => string
) =>
  find(nodes, type)
    .map((t) => func(t, getDefinitionInputs(links, nodes, t)))
    .join('\n\n');
