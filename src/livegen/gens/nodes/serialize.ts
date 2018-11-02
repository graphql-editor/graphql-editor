import { GraphQLNodeType } from '../';
import { NodeType, LinkType } from '@slothking-online/diagram';
export const serializeNodes = (
  node: NodeType[],
  links: LinkType[],
  tabs: string[]
): {
  code: string;
  nodes: GraphQLNodeType[];
  links: LinkType[];
} => {
  const nodes = [...node] as GraphQLNodeType[];
  return {
    code: JSON.stringify({ nodes, links, tabs }),
    nodes,
    links
  };
};
