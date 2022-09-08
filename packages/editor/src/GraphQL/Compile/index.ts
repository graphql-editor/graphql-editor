import {
  ParserField,
  ScalarTypes,
  TypeDefinition,
  TypeDefinitionDisplayMap,
  compileType,
  getTypeName,
} from 'graphql-js-tree';

export const compileTypeOptions = ({ type }: Pick<ParserField, 'type'>) => {
  return compileType(type.fieldType);
};
export const compileScalarTypes = (type: ParserField['type']) => {
  const typeName = getTypeName(type.fieldType);
  if ((Object.values(ScalarTypes) as string[]).includes(typeName)) {
    return TypeDefinitionDisplayMap[TypeDefinition.ScalarTypeDefinition];
  }
  return typeName;
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
