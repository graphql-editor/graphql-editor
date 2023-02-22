import { isExtensionNode } from '@/GraphQL/Resolve';
import { getTypeName, ParserField } from 'graphql-js-tree';
import { Graph, DepthFirstSearch } from '@/Relation/Algorithm/oldAlgo';

export const graphSortNodes = (nodes: ParserField[]) => {
  const graf = Graph(nodes.length);
  nodes.forEach((n, nodeIndex) => {
    graf.node(nodeIndex).label = n.name;
    n.args.forEach((a) => {
      const t = getTypeName(a.type.fieldType);
      const theNodeConnected = nodes.findIndex(
        (an) => an.name === t && !isExtensionNode(an.data.type),
      );
      if (theNodeConnected !== -1) {
        graf.addEdge(nodeIndex, theNodeConnected);
      }
    });
  });
  const visited: number[] = [];
  const networks: number[][] = [];
  const pathPaths: number[][] = [];
  for (let index = 0; index < graf.V; index++) {
    if (visited.includes(index)) continue;
    visited.push(index);
    let dfs = DepthFirstSearch(graf, index);
    const visitedInCurrentNetwork: number[] = [];
    for (var v = 0; v < graf.V; ++v) {
      const p = dfs.pathTo(v);
      p.forEach((a) => {
        if (!visited.includes(a)) visited.push(a);
        if (!visitedInCurrentNetwork.includes(a))
          visitedInCurrentNetwork.push(a);
      });
      pathPaths.push(dfs.pathTo(v));
    }
    networks.push(visitedInCurrentNetwork);
  }
  const resultDict: Record<
    number,
    { sum: number; count: number; name: string }
  > = {};
  pathPaths.forEach((pp) => {
    pp.forEach((grafIndex, pathIndex) => {
      resultDict[grafIndex] ||= {
        sum: 0,
        count: 0,
        name: graf.node(grafIndex).label || 'noname',
      };
      resultDict[grafIndex].count += 1;
      resultDict[grafIndex].sum += pathIndex;
    });
  });
};
