import { GraphQLNodeType } from '../';
import {
  TemplateProps,
  templates,
  rootQueryTemplate,
  rootMutationTemplate,
  rootSubscriptionTemplate
} from './template';
import { nodeTypes } from '../../../nodeTypes';
import { arrayToDict, generateFakerResolverOperation, generateFakerResolverType } from '../faker';
import { NodeType, LinkType } from '@slothking-online/diagram';
import { regenerateNodes } from '../../serialize';
export const serializeSchema = (
  node: NodeType[],
  links: LinkType[],
  tabs: string[]
): {
  code: string;
  nodes: GraphQLNodeType[];
  links: LinkType[];
} => {
  const nodes = [...node] as GraphQLNodeType[];
  const nodeInputs: TemplateProps[] = regenerateNodes(nodes, links);
  const generator = (
    type: keyof typeof nodeTypes,
    template: (props: TemplateProps) => string,
    joinString = '\n\n'
  ) =>
    nodeInputs
      .filter((n) => n.node.type === type)
      .map(template)
      .join(joinString);
  const queriesCode = rootQueryTemplate(generator(nodeTypes.Query, templates.Query, '\n'));
  const mutationsCode = rootMutationTemplate(
    generator(nodeTypes.Mutation, templates.Mutation, '\n')
  );
  const subscriptionsCode = rootSubscriptionTemplate(
    generator(nodeTypes.Subscription, templates.Subscription, '\n')
  );
  const fakeResolvers = [nodeTypes.type, nodeTypes.interface, nodeTypes.input].reduce((a, b) => {
    a = {
      ...a,
      ...arrayToDict(nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverType))
    };
    return a;
  }, {});
  const fakeOperationResolvers = [
    nodeTypes.Query,
    nodeTypes.Mutation,
    nodeTypes.Subscription
  ].reduce((a, b) => {
    a[b] = arrayToDict(
      nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverOperation)
    );
    return a;
  }, {});
  const fakeSchema = { ...fakeOperationResolvers, ...fakeResolvers };
  console.log(fakeSchema);
  let mainCode = 'schema{';
  if (queriesCode) {
    mainCode += '\n\tquery: Query';
  }
  if (mutationsCode) {
    mainCode += '\n\tmutation: Mutation';
  }
  if (subscriptionsCode) {
    mainCode += '\n\tsubscription: Subscription';
  }
  mainCode += '\n}';
  const code = [
    nodeTypes.scalar,
    nodeTypes.enum,
    nodeTypes.interface,
    nodeTypes.type,
    nodeTypes.input,
    nodeTypes.union
  ]
    .map((n) => generator(nodeTypes[n], templates[nodeTypes[n]]))
    .filter((c) => c.length > 0)
    .join('\n\n')
    .concat('\n\n')
    .concat(
      [queriesCode, mutationsCode, subscriptionsCode].filter((c) => c.length > 0).join('\n\n')
    )
    .concat('\n\n')
    .concat(mainCode);
  return {
    code,
    nodes,
    links
  };
};
