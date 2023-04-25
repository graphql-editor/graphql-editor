import { isScalarArgument } from '@/GraphQL/Resolve';
import { ParserField, TypeDefinition } from 'graphql-js-tree';

export const nodeFilter = (
  nodes: ParserField[],
  options: {
    inputsOn?: boolean;
    baseTypesOn?: boolean;
    fieldsOn?: boolean;
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

  const filterFields = options.fieldsOn
    ? withoutScalars
    : withoutScalars.map(stripField);
  return options.inputsOn ? filterFields : filterInputs(filterFields);
};

const stripField = (n: ParserField): ParserField => ({ ...n, args: [] });
const filterInputs = (nodes: ParserField[]) =>
  nodes.filter((n) => n.data.type !== TypeDefinition.InputObjectTypeDefinition);
