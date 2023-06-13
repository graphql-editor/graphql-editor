import {
  FieldType,
  Options,
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from "graphql-js-tree";

export const changeTypeName = (field: FieldType, newName: string) => {
  const changeFieldName = (field: FieldType, newName: string): void => {
    if (field.type === Options.array) {
      return changeFieldName(field.nest, newName);
    } else if (field.type === Options.required) {
      return changeFieldName(field.nest, newName);
    }
    field.name = newName;
  };
  changeFieldName(field, newName);
  return field;
};

export const isEditableParentField = (p: ParserField) => {
  if (
    p.data.type === TypeDefinition.EnumTypeDefinition ||
    p.data.type === TypeDefinition.ScalarTypeDefinition ||
    p.data.type === TypeSystemDefinition.DirectiveDefinition
  ) {
    return true;
  }
  return false;
};
