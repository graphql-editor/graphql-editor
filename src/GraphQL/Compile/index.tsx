import { ParserField, Options } from 'graphql-zeus';

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
