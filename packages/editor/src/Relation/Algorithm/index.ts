import { isExtensionNode } from '@/GraphQL/Resolve';
import { ParserField, getTypeName } from 'graphql-js-tree';

export const layerSortRecuirsive = (nodes: ParserField[]) => {
  // filter operation nodes and move them to layer 0
  const allNodes = [...nodes];
  const nodesLayers: ParserField[][] = [[]];
  const withoutOps = allNodes.filter((n, i) => {
    if (n.type.operations?.length) {
      nodesLayers[0].push(n);
      return false;
    }
    return true;
  });
  const queryNodes = nodesLayers[0].flatMap((n) =>
    n.args.map((a) => getTypeName(a.type.fieldType)),
  );
  withoutOps.sort((a, b) =>
    queryNodes.indexOf(a.name) > queryNodes.indexOf(b.name) ? 1 : -1,
  );
  const totalnodes = [...nodesLayers[0], ...withoutOps];
  if (totalnodes.length === 0) {
    return nodesLayers;
  }
  const other = resortRecuirsive(totalnodes);
  const otherNodes = Object.entries(other)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([k, v]) => v);
  return otherNodes;
};
const resortRecuirsive = (nodes: ParserField[]) => {
  const layerDict: Record<number, ParserField[]> = {};
  const visited: string[] = [];
  const pushNodesOut = (nds: ParserField[], currentIndex: number) => {
    for (const n of nds) {
      if (visited.includes(n.id)) continue;
      visited.push(n.id);
      layerDict[currentIndex] ||= [];
      layerDict[currentIndex].push(n);
      const args = n.args
        .map((a) => getTypeName(a.type.fieldType))
        .filter((t) => t !== n.name);
      const argsNodes = args.map((a) =>
        nodes.find((nn) => nn.name === a && !isExtensionNode(nn.data.type)),
      );
      pushNodesOut(
        argsNodes.filter((an) => !!an) as ParserField[],
        currentIndex + 1,
      );
    }
  };
  pushNodesOut(nodes, 0);
  return layerDict;
};
