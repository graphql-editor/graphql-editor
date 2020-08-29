import { ScalarTypes, ParserField, TypeDefinition } from 'graphql-zeus';
export const BuiltInScalars = [
  ScalarTypes.Boolean,
  ScalarTypes.Float,
  ScalarTypes.ID,
  ScalarTypes.Int,
  ScalarTypes.String,
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
