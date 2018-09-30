import { TransformedInput, GraphQLNodeType } from '..';
import { resolveType } from './map';
import { SubTypes, nodeTypes } from '../../../nodeTypes';

export type TemplateProps = {
  node: GraphQLNodeType;
  inputs: TransformedInput[];
  outputs?: TransformedInput[];
};

export const notDefinition = (inputs: TransformedInput[]): TransformedInput[] =>
  inputs.filter((i) => i.subType !== SubTypes.definition);
export const notInterface = (inputs: TransformedInput[]): TransformedInput[] =>
  inputs.filter((i) => i.type !== nodeTypes.implements);

const implementsInterface = (inputs: TransformedInput[]) => {
  const interfaces = inputs.filter((i) => i.type === nodeTypes.implements).map((i) => i.kind);
  if (interfaces.length) {
    return ` implements ${interfaces.join(' & ')}`;
  }
  return '';
};
export const baseTypeContentTemplate = (node: GraphQLNodeType, inputs: TransformedInput[]) =>
  `\t${notInterface(notDefinition(inputs))
    .map((i) => resolveType(i, nodeTypes.type, 'input'))
    .join(',\n\t')}`;

export const baseTypeTemplate = (name: keyof typeof nodeTypes) => ({
  node,
  inputs
}: TemplateProps) => `${name} ${node.name}${implementsInterface(inputs)}{
${baseTypeContentTemplate(node, inputs)}
}`;
export const baseInputTemplate = (name: keyof typeof nodeTypes) => ({
  node,
  inputs
}: TemplateProps) => `${name} ${node.name}{
${baseTypeContentTemplate(node, inputs)}
}`;

export const typeTemplate = baseTypeTemplate('type');
export const interfaceTemplate = baseInputTemplate('interface');
export const inputTemplate = baseInputTemplate('input');
export const queryTemplate = ({ node, inputs, outputs }: TemplateProps) =>
  outputs && outputs.length > 0
    ? `\t${node.name}${
        inputs.length > 0
          ? `(${inputs.map((i) => `${resolveType(i, nodeTypes.type, 'input')}`).join(', ')})`
          : ''
      }:${
        outputs.length === 1
          ? resolveType(outputs[0], nodeTypes.query, 'output')
          : `[${outputs.map((o) => resolveType(o, nodeTypes.query, 'output')).join(', ')}]`
      }`
    : '';
export const rootQueryTemplate = (queries: string) => `type Query{
${queries}
}`;
export const rootMutationTemplate = (mutations: string) => `type Mutation{
${mutations}
}`;
export const rootSubscriptionTemplate = (subscriptions: string) => `type Subscription{
${subscriptions}
}`;

export const enumTemplate = ({ node, inputs }: TemplateProps) => `enum ${node.name}{
\t${inputs.map((i) => resolveType(i, 'enum', 'input')).join(',\n\t')}
}`;

//TODO: Implement front queries
export const frontQueries = () => `
  {
    allFilms(first: 5) {
      totalCount
      pageInfo {
        endCursor
      }
      films {
        title
      }
    }
  }
`;
