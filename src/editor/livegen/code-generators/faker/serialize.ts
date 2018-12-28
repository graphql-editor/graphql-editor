import { GraphQLNodeType } from '../';
import { TemplateProps } from '../graphql/template';
import { nodeTypes } from '../../../nodeTypes';
import {
  arrayToDict,
  generateFakerResolverOperation,
  generateFakerResolverType,
  generateFakerResolverEnum,
  generateFakerResolverScalar,
  generateFakerResolverUnion
} from '../faker';
import { NodeType, LinkType } from '@slothking-online/diagram';
import { regenerateNodes } from '../../serialize';
export const serializeFaker = (
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
  const fakeResolvers = [nodeTypes.type, nodeTypes.interface, nodeTypes.input].reduce((a, b) => {
    a = {
      ...a,
      ...arrayToDict(nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverType))
    };
    return a;
  }, {});

  const fakeEnumResolvers = [nodeTypes.enum].reduce((a, b) => {
    a = {
      ...a,
      ...arrayToDict(nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverEnum))
    };
    return a;
  }, {});

  const fakeScalarResolvers = [nodeTypes.scalar].reduce((a, b) => {
    a = {
      ...a,
      ...arrayToDict(nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverScalar))
    };
    return a;
  }, {});

  const fakeUnionResolvers = [nodeTypes.union].reduce((a, b) => {
    a = {
      ...a,
      ...arrayToDict(nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverUnion))
    };
    return a;
  }, {});
  const fakeOperationResolvers = [
    nodeTypes.Query,
    nodeTypes.Mutation,
    nodeTypes.Subscription
  ].reduce((a, b) => {
    a[b] = {
      type: 'type',
      object: arrayToDict(
        nodeInputs.filter((n) => n.node.type === b).map(generateFakerResolverOperation)
      )
    };
    return a;
  }, {});
  const fakeSchema = {
    ...fakeOperationResolvers,
    ...fakeResolvers,
    ...fakeEnumResolvers,
    ...fakeScalarResolvers,
    ...fakeUnionResolvers
  };
  return {
    code: JSON.stringify(fakeSchema, null, 4),
    nodes,
    links
  };
};
