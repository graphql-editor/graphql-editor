import { ParserField, getTypeName } from 'graphql-js-tree';

export const getScalarFields = (node: ParserField, validScalars: string[]) =>
  node.args?.filter(
    (a) =>
      validScalars.includes(getTypeName(a.type.fieldType)) &&
      a.args?.length === 0,
  ) || [];
