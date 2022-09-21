import { compareParserFields, ParserField } from 'graphql-js-tree';

export const findInNodes = (
  nodes: ParserField[],
  selectedNode: ParserField,
) => {
  const foundNode = nodes.find(compareParserFields(selectedNode));
  if (foundNode) return foundNode;
  return nodes.find(
    (n) =>
      n.name === selectedNode.name && n.data.type === selectedNode.data.type,
  );
};
