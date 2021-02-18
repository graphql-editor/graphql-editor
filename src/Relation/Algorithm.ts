import { isScalarType } from 'graphql';
import { ParserField } from 'graphql-zeus';

export const sortByConnection = (roots: ParserField[]) => {
  return roots
    .map((root) => ({
      node: root,
      relations: root.args
        ?.map((a) => a.type.name)
        .filter((name) => !isScalarType(name)),
    }))
    .sort((a, b) => {
      if (a.relations?.includes(b.node.name)) {
        return 1;
      }
      return -1;
    })
    .map((n) => n.node);
};
