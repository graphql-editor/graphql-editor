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
    const fieldNames = nds.flatMap((n) => ({
      n,
      args: n.args.map((a) => getTypeName(a.type.fieldType)),
    }));
    const fields = fieldNames.reduce<Record<string, number>>((a, b) => {
      b.args.map((arg) => {
        a[arg] = (a[arg] || 0) + 1;
      });
      return a;
    }, {});
    const filtered: ParserField[] = [];
    const sortedEntries = Object.entries(fields).sort(([k1, v1], [k2, v2]) =>
      v2 === v1 ? 0 : v2 > v1 ? 1 : -1,
    );
    const childrenFields: ParserField[] = [];
    const powerFields: ParserField[] = [];
    const entriesSet = Object.keys(fields);
    sortedEntries.forEach(([f, power]) => {
      const node = nds.find((nd) => nd.name === f);
      if (node) {
        const hasFieldsWithRelations = node.args.some((a) =>
          entriesSet.includes(getTypeName(a.type.fieldType)),
        );
        if (!hasFieldsWithRelations) {
          childrenFields.push(node);
        } else if (power > 5) {
          powerFields.push(node);
        }
        filtered.push(node);
      }
    });
    if (filtered.length === nds.length) {
      if (childrenFields.length) {
        const childrenNames = childrenFields.map((f) => f.name);
        const powerNames = powerFields.map((f) => f.name);
        return [
          nds.filter(
            (n) =>
              !childrenNames.includes(n.name) && !powerNames.includes(n.name),
          ),
          powerFields,
          childrenFields,
        ];
      }
      return [nds];
    }
    if (filtered.length === 0) {
      return [nds];
    }
    const filteredNames = filtered.map((f) => f.name);
    const base = nds.filter((n) => !filteredNames.includes(n.name));
    return [base, ...pushNodesOut(filtered)];
  };
  return pushNodesOut(nodes);
};
