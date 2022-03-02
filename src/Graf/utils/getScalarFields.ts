import { ParserField } from 'graphql-js-tree';

export const graphQLTypes = ['String', 'ID', 'Float', 'ID', 'Int', 'Boolean'];

export const getScalarFields = (node: ParserField) =>
  node.args?.filter(
    (a) => graphQLTypes.includes(a.type.name) && a.args?.length === 0,
  ) || [];
