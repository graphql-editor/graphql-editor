import { isExtensionNode } from '@/GraphQL/Resolve';
import { ParserField, getTypeName } from 'graphql-js-tree';

export const breakNodeGraph = (nodes: ParserField[][], maxFactor = 2.0) => {
  const heights = nodes.map((nodelist, index) => {
    const h = nodelist.map((nl) => nl.args.length).reduce((a, b) => a + b);
    return {
      height: h,
      index,
    };
  });
  const avgHeight =
    heights.map((h) => h.height).reduce((a, b) => a + b) /
    (heights.length || 1);
  const updatedLayers: ParserField[][] = [];
  for (const h of heights) {
    if (h.height / maxFactor > avgHeight) {
      const nlist = nodes[h.index];
      const half = Math.floor(nlist.length / 2.0);
      const part1 = nlist.slice(0, half);
      const part2 = nlist.slice(half);
      updatedLayers.push(part1);
      updatedLayers.push(part2);
    } else {
      updatedLayers.push(nodes[h.index]);
    }
  }
};

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
    return [[]];
  }
  const other = resortRecuirsive(totalnodes);
  const otherNodes = Object.entries(other)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([k, v]) => v);
  return otherNodes;
};
const resortRecuirsive = (nodes: ParserField[]) => {
  const layerDict: Record<number, GraphField[]> = {};
  const visited: string[] = [];
  const pushNodesOut = (
    nds: ParserField[],
    currentIndex: number,
    parentTopIndex: number,
  ) => {
    for (const n of nds) {
      if (visited.includes(n.id)) continue;
      visited.push(n.id);
      layerDict[currentIndex] ||= [];
      layerDict[currentIndex].push({
        parserField: n,
        top: parentTopIndex,
      });
      const args = n.args
        .flatMap((a) => [a, ...a.args])
        .map((a) => getTypeName(a.type.fieldType))
        .filter((t) => t !== n.name);
      const argsNodes = args.map((a) =>
        nodes.find((nn) => nn.name === a && !isExtensionNode(nn.data.type)),
      );
      pushNodesOut(
        argsNodes.filter((an) => !!an) as ParserField[],
        currentIndex + 1,
        layerDict[currentIndex].length,
      );
    }
  };
  pushNodesOut(nodes, 0, 0);
  return layerDict;
};

export interface GraphField {
  parserField: ParserField;
  top?: number;
}
