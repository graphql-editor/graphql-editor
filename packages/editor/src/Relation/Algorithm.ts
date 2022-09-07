import { ParserField, getTypeName } from 'graphql-js-tree';

export const sortByConnection = (nodes: ParserField[]) => {
  const roots = nodes.sort((a, b) =>
    (a.args?.length || 0) > (b.args?.length || 0) ? -1 : 1,
  );
  const copyRoots: ParserField[] = [];
  const pushCheckNode = (node?: ParserField, stop?: boolean) => {
    if (!node || copyRoots.includes(node)) {
      return;
    }
    copyRoots.push(node);
    if (stop) {
      return;
    }
    node.args?.forEach((arg) => {
      const found = roots.find(
        (r) => r.name === getTypeName(arg.type.fieldType),
      );
      pushCheckNode(found, (found?.args?.length || 2) > 3);
    });
  };
  for (const node of roots) {
    pushCheckNode(node);
  }
  return copyRoots;
};
