import { ScalarTypes, ParserField, TypeDefinition } from 'graphql-js-tree';
export const BuiltInScalars = [
  ScalarTypes.String,
  ScalarTypes.Boolean,
  ScalarTypes.Float,
  ScalarTypes.ID,
  ScalarTypes.Int,
]
  .reverse()
  .map(
    (t) =>
      ({
        data: {
          type: TypeDefinition.ScalarTypeDefinition,
        },
        type: {
          name: 'scalar',
        },
        name: t,
      } as ParserField),
  );
