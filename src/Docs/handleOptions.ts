import { Options } from 'graphql-js-tree';

interface RequiredField {
  required: RequiredArrayOrType;
}

interface NamedField {
  name: string;
}

interface ArrayField {
  array: RequiredArrayOrType;
}

type RequiredArrayOrType = RequiredField | NamedField | ArrayField;

const isRequired = (v: RequiredArrayOrType): v is RequiredField =>
  'required' in v;

const isArray = (v: RequiredArrayOrType): v is ArrayField => 'array' in v;

const isNamed = (v: RequiredArrayOrType): v is NamedField => 'name' in v;

const handleRequired = (v: RequiredField): string =>
  handleOptions(v.required) + '!';
const handleArray = (v: ArrayField): string => `[${handleOptions(v.array)}]`;
const handleNamed = (v: NamedField): string => v.name;

const handleOptions = (v: RequiredArrayOrType) => {
  if (isRequired(v)) {
    return handleRequired(v);
  }
  if (isArray(v)) {
    return handleArray(v);
  }
  if (isNamed(v)) {
    return handleNamed(v);
  }
};

export const tranfromOptions = (name: string, optionsArray: Options[] = []) => {
  let ret: RequiredArrayOrType = { name };
  if (optionsArray.includes(Options.required)) {
    ret = { required: ret };
  }
  if (optionsArray.includes(Options.array)) {
    ret = { array: ret };
  }
  if (optionsArray.includes(Options.arrayRequired)) {
    ret = { required: ret };
  }
  return handleOptions(ret);
};
