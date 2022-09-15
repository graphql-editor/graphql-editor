import { compareParserFields, ParserField } from 'graphql-js-tree';

export const findInNodes = (
  nodes: ParserField[],
  selectedNode: ParserField,
) => {
  return nodes.find(compareParserFields(selectedNode));
};
