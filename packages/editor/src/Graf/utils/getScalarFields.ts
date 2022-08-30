import { ParserField } from 'graphql-js-tree';

export const getScalarFields = (node: ParserField, validScalars: string[]) =>
  node.args?.filter(
    (a) => validScalars.includes(a.type.name) && a.args?.length === 0,
  ) || [];
