import { FieldType, Options } from 'graphql-js-tree';

export const changeNodeName = (field: FieldType, newName: string) => {
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

export const changeNodeOptions = (field: FieldType, newOption: Options) => {
  const changeOptions = (field: FieldType, newOption: Options) => {
    if (field.type !== newOption && newOption === Options.array) {
      changeOptions(field, Options.array);
    } else if (field.type !== newOption && newOption === Options.required) {
      changeOptions(field, Options.required);
    }
    field.type = Options.name;
  };
  changeOptions(field, newOption);
  return field;
};
