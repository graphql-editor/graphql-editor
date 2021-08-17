import {
  ParserField,
  Options,
  ScalarTypes,
  TypeDefinition,
  TypeDefinitionDisplayMap,
} from 'graphql-js-tree';

export const compileTypeOptions = ({ type }: Pick<ParserField, 'type'>) => {
  let compiledType = type.name;
  if (type.options?.includes(Options.required)) {
    compiledType = `${compiledType}!`;
  }
  if (type.options?.includes(Options.array)) {
    compiledType = `[${compiledType}]`;
    if (type.options?.includes(Options.arrayRequired)) {
      compiledType = `${compiledType}!`;
    }
  }
  return compiledType;
};
export const compileScalarTypes = (type: ParserField['type']) => {
  if ((Object.values(ScalarTypes) as string[]).includes(type.name)) {
    return TypeDefinitionDisplayMap[TypeDefinition.ScalarTypeDefinition];
  }
  return type.name;
};

export const enrichWithScalarColors = <T extends { scalar: string }>(
  dict: T,
) => {
  return {
    ...dict,
    [ScalarTypes.Boolean]: dict.scalar,
    [ScalarTypes.Float]: dict.scalar,
    [ScalarTypes.ID]: dict.scalar,
    [ScalarTypes.Int]: dict.scalar,
    [ScalarTypes.String]: dict.scalar,
  };
};
