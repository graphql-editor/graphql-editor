import { ParserField } from 'graphql-zeus';

export const ChangeRelatedNode = ({
  newName,
  node,
  oldName,
}: {
  oldName: string;
  newName: string;
  node: ParserField;
}) => {
  if (node.type.name === oldName) {
    node.type.name = newName;
  }
  if (node.args) {
    node.args.forEach((n) => ChangeRelatedNode({ oldName, newName, node: n }));
  }
};

export const ChangeAllRelatedNodes = ({
  newName,
  nodes,
  oldName,
}: {
  nodes: ParserField[];
  oldName: string;
  newName: string;
}) => {
  nodes.forEach((n) => ChangeRelatedNode({ oldName, newName, node: n }));
};
