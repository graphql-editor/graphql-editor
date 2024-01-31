import { isScalarArgument } from "@/GraphQL/Resolve";
import { OmitNodes } from "@/Relation/shared/models";
import { ParserField, TypeDefinition, TypeExtension } from "graphql-js-tree";

export const nodeFilter = (
  nodes: ParserField[],
  options: {
    baseTypesOn?: boolean;
    omitNodes?: OmitNodes;
    libraryNodesOn?: boolean;
  }
) => {
  const scalarTypes = nodes
    .filter((n) => n.data.type === TypeDefinition.ScalarTypeDefinition)
    .map((n) => n.name);
  let currentNodes = nodes;
  if (options.omitNodes) {
    currentNodes = nodes.filter((n) => {
      if (options.omitNodes) {
        const nodeType =
          n.data.type in options.omitNodes
            ? (n.data.type as keyof typeof options.omitNodes)
            : undefined;
        if (nodeType && options.omitNodes[nodeType]) {
          return false;
        }
        if (n.data.type === TypeExtension.ObjectTypeExtension) {
          return !options.omitNodes[TypeDefinition.ObjectTypeDefinition];
        }
        if (n.data.type === TypeExtension.EnumTypeExtension) {
          return !options.omitNodes[TypeDefinition.EnumTypeDefinition];
        }
        if (n.data.type === TypeExtension.InputObjectTypeExtension) {
          return !options.omitNodes[TypeDefinition.InputObjectTypeDefinition];
        }
        if (n.data.type === TypeExtension.InterfaceTypeExtension) {
          return !options.omitNodes[TypeDefinition.InterfaceTypeDefinition];
        }
        if (n.data.type === TypeExtension.ScalarTypeExtension) {
          return !options.omitNodes[TypeDefinition.ScalarTypeDefinition];
        }
        if (n.data.type === TypeExtension.UnionTypeExtension) {
          return !options.omitNodes[TypeDefinition.UnionTypeDefinition];
        }
        return true;
      }
    });
  }
  if (!options.baseTypesOn) {
    currentNodes = currentNodes.map((n) => ({
      ...n,
      args: n.args?.filter((a) => !isScalarArgument(a, scalarTypes)),
    }));
  }
  if (!options.libraryNodesOn) {
    currentNodes = filterLibraryNodes(currentNodes);
  }
  return currentNodes;
};

const filterLibraryNodes = (nodes: ParserField[]) =>
  nodes
    .filter((n) => !n.fromLibrary)
    .map((n) => ({
      ...n,
      args: n.args?.filter((a) => !a.fromLibrary),
    }));
