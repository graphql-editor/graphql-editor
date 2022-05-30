import { ParserField } from 'graphql-js-tree';

export const compareNodesWithData = (n1?: ParserField, n2?: ParserField) => {
  if (!n1 || !n2) {
    return false;
  }
  if (`${n1.name}${n1.data.type}` === `${n2.name}${n2.data.type}`) {
    return true;
  }
  return false;
};

export const findInNodes = (
  nodes: ParserField[],
  selectedNode: ParserField,
) => {
  return nodes.find((n) => compareNodesWithData(selectedNode, n));
};
