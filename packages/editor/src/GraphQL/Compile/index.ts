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
