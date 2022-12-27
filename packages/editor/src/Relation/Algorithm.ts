import { ParserField, getTypeName } from 'graphql-js-tree';

export const layerSort = (nodes: ParserField[]) => {
  // filter operation nodes and move them to layer 0
  const allNodes = [...nodes];
  const nodesLayers: ParserField[][] = [[], []];
  const withoutOps = allNodes.filter((n, i) => {
    if (n.type.operations?.length) {
      nodesLayers[0].push(n);
      return false;
    }
    return true;
  });

  return [...nodesLayers, ...resort(withoutOps)];
};
const resort = (nodes: ParserField[]) => {
  const pushNodesOut = (nds: ParserField[]): ParserField[][] => {
    const copiedNodes = [...nds];
    const filtered: ParserField[] = [];
    nds.forEach((nd) => {
      const args = nd.args.map((a) => getTypeName(a.type.fieldType));
      args
        .filter((a) => a !== nd.name)
        .forEach((a) => {
          const hasIndex = copiedNodes.findIndex((cn) => cn.name === a);
          if (hasIndex > -1) {
            filtered.push(copiedNodes.splice(hasIndex, 1)[0]);
          }
        });
    });

    if (filtered.length === nds.length) return [nds];
    if (filtered.length === 0) {
      return [nds];
    }
    return [copiedNodes, ...pushNodesOut(filtered)];
  };
  return pushNodesOut(nodes);
};
