import { GraphQLNodeType } from './gens';
import {
  TemplateProps,
  scalarTemplate,
  typeTemplate,
  enumTemplate,
  interfaceTemplate,
  inputTemplate,
  unionTemplate,
  rootQueryTemplate,
  queryTemplate,
  rootMutationTemplate,
  rootSubscriptionTemplate
} from './gens/graphql/template';
import { getDefinitionInputs, getDefinitionOutputs } from './gens/utils';
import { SubTypes, nodeTypes } from '../nodeTypes';
import { crudMacroTemplate } from './gens/graphql/macros/crud';
import { arrayToDict, generateFakerResolver, generateFakerServerQuery } from './gens/faker';
import { NodeType, LinkType } from '@slothking-online/diagram';

export const serialize = (
  node: NodeType[],
  links: LinkType[],
  tabs: string[]
): {
  liveCode: string;
  nodes: GraphQLNodeType[];
  links: LinkType[];
  tabs: string[];
} => {
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
  const scalarsCode = generator(nodeTypes.scalar, scalarTemplate);
  const typesCode = generator(nodeTypes.type, typeTemplate);
  const enumsCode = generator(nodeTypes.enum, enumTemplate);
  const interfacesCode = generator(nodeTypes.interface, interfaceTemplate);
  const inputsCode = generator(nodeTypes.input, inputTemplate);
  const unionsCode = generator(nodeTypes.union, unionTemplate);
  const queriesCode = rootQueryTemplate(generator(nodeTypes.query, queryTemplate, '\n'));
  const mutationsCode = rootMutationTemplate(generator(nodeTypes.mutation, queryTemplate, '\n'));
  const subscriptionsCode = rootSubscriptionTemplate(
    generator(nodeTypes.subscription, queryTemplate, '\n')
  );
  console.log(nodeInputs)
  const fakeResolvers = [nodeTypes.query, nodeTypes.mutation, nodeTypes.subscription].reduce(
    (a, b) => {
      a[b] = arrayToDict(
        nodeInputs.filter((n) => n.node.type === b).map((n) => generateFakerResolver(n, nodeInputs))
      );
      return a;
    },
    {}
  );
  console.log(fakeResolvers)
  const fakeQueriesGen = Object.keys(fakeResolvers[nodeTypes.query]).map((fr) =>
    generateFakerServerQuery(fakeResolvers[nodeTypes.query][fr], fr)
  );
  console.log(fakeQueriesGen);

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
  const liveCode = [
    scalarsCode,
    enumsCode,
    inputsCode,
    interfacesCode,
    typesCode,
    unionsCode,
    queriesCode,
    mutationsCode,
    subscriptionsCode,
    mainCode
  ]
    .filter((c) => c.length > 0)
    .join('\n\n');
  return {
    liveCode,
    nodes,
    links,
    tabs
  };
};
