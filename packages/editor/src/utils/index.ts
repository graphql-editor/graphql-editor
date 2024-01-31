import { FieldType, Options } from "graphql-js-tree";

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
