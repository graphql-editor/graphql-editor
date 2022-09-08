import { FieldType, Options } from 'graphql-js-tree';

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

export const changeNodeOptions = (field: FieldType, newOption: Options) => {
  const changeOptions = (field: FieldType, newOption: Options) => {
    if (field.type !== Options.array && newOption === Options.array) {
      if (field.type === Options.required) {
      }
      changeOptions(field, Options.array);
    } else if (field.type !== newOption && newOption === Options.required) {
      changeOptions(field, Options.required);
    }
    field.type = Options.name;
  };
  changeOptions(field, newOption);
  return field;
};

export const resolveValueFieldType = (
  name: string,
  fType: FieldType,
  isRequired = false,
  fn: (str: string) => string = (x) => x,
): string => {
  if (fType.type === Options.name) {
    return fn(isRequired ? name : `${name} | undefined | null`);
  }
  if (fType.type === Options.array) {
    return resolveValueFieldType(
      name,
      fType.nest,
      false,
      isRequired
        ? (x) => `Array<${fn(x)}>`
        : (x) => `Array<${fn(x)}> | undefined | null`,
    );
  }
  if (fType.type === Options.required) {
    return resolveValueFieldType(name, fType.nest, true, fn);
  }
  throw new Error('Invalid field type');
};
