import { TransformedInput, GraphQLNodeType } from '..';
import { resolveType } from './map';
import { SubTypes, nodeTypes } from '../../../nodeTypes';

export type TemplateProps = {
  node: GraphQLNodeType;
  inputs: TransformedInput[];
};

export const notDefinition = (inputs: TransformedInput[]): TransformedInput[] =>
  inputs.filter((i) => i.subType !== SubTypes.definition);
export const notInterface = (inputs: TransformedInput[]): TransformedInput[] =>
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
export const queryTemplate = ({ node, inputs }: TemplateProps) =>
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
