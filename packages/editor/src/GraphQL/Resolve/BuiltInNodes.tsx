import {
  ScalarTypes,
  ParserField,
  TypeDefinition,
  Options,
} from 'graphql-js-tree';
export const BuiltInScalars = [
  ScalarTypes.String,
  ScalarTypes.Boolean,
  ScalarTypes.Float,
  ScalarTypes.ID,
  ScalarTypes.Int,
].map(
  (t) =>
    ({
      data: {
        type: TypeDefinition.ScalarTypeDefinition,
      },
      type: {
        fieldType: {
          name: t,
          type: Options.name,
        },
      },
      name: t,
    } as ParserField),
);
