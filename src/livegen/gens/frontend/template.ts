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
    .join('\n\t')}`;

export const baseTypeTemplate = (name: keyof typeof nodeTypes) => ({
  node,
  inputs
}: TemplateProps) => `${name} ${node.name}${implementsInterface(inputs)} = {
${baseTypeContentTemplate(node, inputs)}
}`;
export const baseInterfaceTemplate = (name: keyof typeof nodeTypes) => ({
  node,
  inputs
}: TemplateProps) => `${name} ${node.name}${implementsInterface(inputs)}  {
${baseTypeContentTemplate(node, inputs)}
}`;
export const baseInputTemplate = (name: keyof typeof nodeTypes) => ({
  node,
  inputs
}: TemplateProps) => `${name} ${node.name} = {
${baseTypeContentTemplate(node, inputs)}
}`;
export const operationTemplate = ({ node, inputs, outputs }: TemplateProps) =>
  outputs && outputs.length > 0
    ? `\t${node.name}${`:(props: {\n\t\t${inputs
        .map((i) => `${resolveType(i, nodeTypes.type, 'input')}`)
        .join(',\n\t\t')}\n\t})`} => ${
        outputs.length === 1
          ? resolveType(outputs[0], nodeTypes.Query, 'output')
          : `[${outputs.map((o) => resolveType(o, nodeTypes.Query, 'output')).join(', ')}]`
      }`
    : '';

export const templates = {
  [nodeTypes.type]: baseTypeTemplate('type'),
  [nodeTypes.interface]: baseInterfaceTemplate('interface'),
  [nodeTypes.input]: baseTypeTemplate('type'),
  [nodeTypes.union]: ({ node, inputs }: TemplateProps) =>
    `type ${node.name} = ${inputs.map((i) => i.kind).join(' | ')}`,
  [nodeTypes.scalar]: ({ node }: TemplateProps) => `type ${node.name} = any;`,
  [nodeTypes.enum]: ({ node, inputs }: TemplateProps) => `enum ${node.name} {
    \t${inputs.map((i) => resolveType(i, 'enum', 'input')).join(',\n\t')}
    }`,
  [nodeTypes.Query]: operationTemplate,
  [nodeTypes.Mutation]: operationTemplate,
  [nodeTypes.Subscription]: operationTemplate
};
export const rootQueryTemplate = (queries: string) =>
  queries &&
  `type Query = {
${queries}
}`;
export const rootMutationTemplate = (mutations: string) =>
  mutations &&
  `type Mutation = {
${mutations}
}`;
export const rootSubscriptionTemplate = (subscriptions: string) =>
  subscriptions &&
  `type Subscription = {
${subscriptions}
}`;
