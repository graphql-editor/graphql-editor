import { TransformedInput, GraphQLNodeType } from '..';
import { NodeType } from '@slothking-online/diagram';
import { resolveType } from './map';
import { SubTypes, nodeTypes } from '../../../nodeTypes';

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

export const baseTypeTemplate = (name: keyof typeof nodeTypes) => (
  node: GraphQLNodeType,
  inputs: TransformedInput[]
) => `${name} ${node.name}${implementsInterface(inputs)}{
\t${notInterface(notDefinition(inputs))
  .map((i) => resolveType(i, 'type', 'input'))
  .join(',\n\t')}
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

export const enumTemplate = (node: NodeType, inputs: TransformedInput[]) => `enum ${node.name}{
\t${inputs.map((i) => resolveType(i, 'enum', 'input')).join(',\n\t')}
}`;
