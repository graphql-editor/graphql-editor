import { changeTypeName } from "@/utils";
import { getTypeName, ParserField } from "graphql-js-tree";

export const ChangeRelatedNode = ({
  newName,
  node,
  oldName,
}: {
  oldName: string;
  newName: string;
  node: ParserField;
}) => {
  const typeName = getTypeName(node.type.fieldType);
  if (typeName === oldName) {
    changeTypeName(node.type.fieldType, newName);
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
