import { NodeType, LinkType } from '@slothking-online/diagram';
import { TransformedInput, GraphQLNodeType } from '.';
import { SubTypes, allTypes, nodeTypes } from '../../nodeTypes';
// import * as FileSaver from "file-saver";

export const find = (nodes: Array<GraphQLNodeType>, type: allTypes): Array<GraphQLNodeType> => {
  return nodes.filter((n) => n.type === type && n.subType === SubTypes.definition);
};
export const getPath = (
  node: GraphQLNodeType,
  links: Array<LinkType>,
  nodes: Array<GraphQLNodeType>
): Array<string> => {
  const nextLink = function*(nodeId: string) {
    yield nodeId;
    const link: LinkType = links.find(
      (l: LinkType) =>
        l.to.nodeId === nodeId &&
        nodes.find((n) => n.id === l.from.nodeId).subType !== SubTypes.definition
    );
    if (link) {
      yield* nextLink(link.from.nodeId);
    }
  };
  const firstLink = nextLink(node.id);
  let all = [...firstLink];
  all = all.filter((a) => a !== node.id);
  return all;
};
export const getPathNodes = (
  node: GraphQLNodeType,
  links: Array<LinkType>,
  nodes: Array<GraphQLNodeType>
): Array<GraphQLNodeType> => {
  let p = getPath(node, links, nodes)
    .map((p) => {
      const n = nodes.find((n) => n.id === p);
      if (n.clone) {
        return [n, ...getPathNodes(nodes.find((nn) => nn.id === n.clone), links, nodes)];
      }
      return [n];
    })
    .reduce((a, b) => [...a, ...b], []);
  return p;
};
export const nodeOrRef = (node: GraphQLNodeType, nodes: Array<NodeType>) => {
  if (!node.clone) {
    return node;
  }
  return nodes.find((n) => n.id === node.clone);
};
export type definitionFunc = (
  links: Array<LinkType>,
  nodes: Array<GraphQLNodeType>,
  n: GraphQLNodeType
) => TransformedInput[];

export type definitionPoints = (
  links: Array<LinkType>,
  nodes: Array<GraphQLNodeType>,
  n: GraphQLNodeType,
  io: keyof Pick<LinkType, 'from' | 'to'>,
  array?: boolean,
  arrayRequired?: boolean
) => TransformedInput[];

export const getArgumentNodes = (
  node: GraphQLNodeType,
  links: Array<LinkType>,
  nodes: Array<GraphQLNodeType>
): Array<GraphQLNodeType> =>
  links
    .filter((l) => l.to.nodeId === node.id)
    .map((l) => l.from)
    .map((l) => nodes.find((n) => n.id === l.nodeId))
    .map(
      (n) =>
        n.type === nodeTypes.array
          ? getDefinitionPoints(links, nodes, n, 'to', true, n.required)
          : [n]
    )
    .reduce((a, b) => [...a, ...b], []);

export const getDefinitionPoints: definitionPoints = (
  links,
  nodes,
  n,
  io,
  array = false,
  arrayRequired = false
) =>
  links
    .filter((l) => l[io].nodeId === n.id)
    .map(
      (l) => nodes.find((n) => n.id === l[io !== 'to' ? 'to' : 'from'].nodeId) as GraphQLNodeType
    )
    .filter((n) => n)
    .map((l) => {
      //Zamienić na Transformed Inpute
      const argumentNodes: GraphQLNodeType[] = getArgumentNodes(l, links, nodes);
      if (l.type === nodeTypes.array) {
        return getDefinitionPoints(links, nodes, l, io, true, l.required);
      }
      return [{ ...l, array, arrayRequired, args: argumentNodes } as TransformedInput];
    })
    .reduce((a, b) => [...a, ...b], [])
    .map((n) => ({
      ...n,
      array: array || n.array
    }));
export const getDefinitionInputs: definitionFunc = (links, nodes, n) =>
  getDefinitionPoints(links, nodes, n, 'to');
export const getDefinitionOutputs: definitionFunc = (links, nodes, n) =>
  getDefinitionPoints(links, nodes, n, 'from');
