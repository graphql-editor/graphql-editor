import { GraphQLNodeType } from './gens';
import {
  TemplateProps,
  templates,
  rootQueryTemplate,
  rootMutationTemplate,
  rootSubscriptionTemplate
} from './gens/graphql/template';
import { getDefinitionInputs, getDefinitionOutputs } from './gens/utils';
import { SubTypes, nodeTypes } from '../nodeTypes';
import { crudMacroTemplate } from './gens/graphql/macros/crud';
import {
  arrayToDict,
  generateFakerResolverOperation,
  generateFakerResolverType
} from './gens/faker';
import { NodeType, LinkType } from '@slothking-online/diagram';

export const serialize = (
  node: NodeType[],
  links: LinkType[],
  tabs: string[]
): {
  schema: string;
  nodes: GraphQLNodeType[];
  links: LinkType[];
  tabs: string[];
} => {
  console.time('serialize');
  let nodes = node as GraphQLNodeType[];
  nodes = [...nodes];
  let nodeInputs: TemplateProps[] = nodes
    .filter((n) => n.subType === SubTypes.definition)
    .map((n) => ({
      node: n,
      inputs: getDefinitionInputs(links, nodes, n),
      outputs: getDefinitionOutputs(links, nodes, n)
    }));
  nodeInputs = nodeInputs.map(
    (n) =>
      n.node.type === nodeTypes.type
        ? {
            ...n,
            inputs: [
              ...n.inputs,
              ...n.inputs
                .filter((ni) => ni.type === nodeTypes.implements)
                .map(
                  (interfaceTypeInput) =>
                    nodeInputs.find((ni) => ni.node.id === interfaceTypeInput.clone).inputs
                )
                .reduce((a, b) => [...a, ...b], [])
            ]
          }
        : n
  );
  const crudMacroNodes = crudMacroTemplate(nodes, links, nodeInputs);
  nodeInputs = [...crudMacroNodes];
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
  const schema = [
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
  console.timeEnd('serialize');
  return {
    schema,
    nodes,
    links,
    tabs
  };
};
