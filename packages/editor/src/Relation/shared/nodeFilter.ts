import { isScalarArgument } from "@/GraphQL/Resolve";
import { OmitNodes } from "@/Relation/shared/models";
import { ParserField, TypeDefinition } from "graphql-js-tree";

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
