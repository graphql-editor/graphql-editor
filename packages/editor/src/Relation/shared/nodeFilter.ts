import { isScalarArgument } from '@/GraphQL/Resolve';
import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const nodeFilter = (
  nodes: ParserField[],
  options: {
    inputsOn?: boolean;
    baseTypesOn?: boolean;
    libraryNodesOn?: boolean;
  },
) => {
  const scalarTypes = nodes
    .filter((n) => n.data.type === TypeDefinition.ScalarTypeDefinition)
    .map((n) => n.name);

  const withoutScalars = options.baseTypesOn
    ? nodes
    : nodes.map((n) => ({
      ...n,
      args: n.args?.filter((a) => !isScalarArgument(a, scalarTypes)),
    }));

  if (!options.inputsOn && !options.libraryNodesOn) {
    return filterLibraryNodes(filterInputs(withoutScalars));
  } else if (options.inputsOn && !options.libraryNodesOn) {
    return filterLibraryNodes(withoutScalars);
  } else if (!options.inputsOn && options.libraryNodesOn) {
    return filterInputs(withoutScalars);
  }

  return withoutScalars;
};

const filterInputs = (nodes: ParserField[]) =>
  nodes.filter((n) => n.data.type !== TypeDefinition.InputObjectTypeDefinition);

const filterLibraryNodes = (nodes: ParserField[]) =>
  nodes.filter((n) => !n.fromLibrary).map((n) => ({
    ...n,
    args: n.args?.filter((a) => !a.fromLibrary),
  }));
