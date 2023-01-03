import { ParserField, getTypeName } from 'graphql-js-tree';

export const layerSort = (nodes: ParserField[]) => {
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
  return [...nodesLayers, ...resort(withoutOps)];
};
const resort = (nodes: ParserField[]) => {
  const pushNodesOut = (nds: ParserField[]): ParserField[][] => {
    const nodesWithArgs = nds.flatMap((n) => ({
      n,
      args: n.args
        .map((a) => getTypeName(a.type.fieldType))
        .filter((ft) => ft !== n.name),
    }));
    const fields = nodesWithArgs.reduce<Record<string, number>>((a, b) => {
      b.args.map((arg) => {
        a[arg] = (a[arg] || 0) + 1;
      });
      return a;
    }, {});
    const filtered: ParserField[] = [];
    const unFiltered: ParserField[] = [];
    nds.forEach((n) => {
      const existsInFields = fields[n.name];
      if (existsInFields) {
        filtered.push(n);
        fields[n.name] += -1;
      } else {
        unFiltered.push(n);
      }
    });
    if (unFiltered.length === 0 || filtered.length === 0) {
      return [nds];
    }
    const fieldNames = unFiltered.flatMap((na) =>
      na.args.map((a) => getTypeName(a.type.fieldType)),
    );
    filtered.sort((a, b) =>
      fieldNames.indexOf(a.name) > fieldNames.indexOf(b.name) ? 1 : -1,
    );
    return [unFiltered, ...pushNodesOut(filtered)];
  };
  return pushNodesOut(nodes);
};

// put all ops nodes in layer 0
