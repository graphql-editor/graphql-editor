import { isScalarArgument } from '@/GraphQL/Resolve';
import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const nodeFilter = (
  nodes: ParserField[],
  options: {
    inputsOn?: boolean;
    baseTypesOn?: boolean;
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

  return options.inputsOn ? withoutScalars : filterInputs(withoutScalars);
};

const filterInputs = (nodes: ParserField[]) =>
  nodes.filter((n) => n.data.type !== TypeDefinition.InputObjectTypeDefinition);
