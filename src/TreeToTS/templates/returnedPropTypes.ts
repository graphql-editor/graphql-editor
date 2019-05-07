import { Options, ParserField, ParserRoot } from '../../Models';
import { TypeDefinition } from '../../Models/Spec';
const resolveArg = (f: ParserField, tabs = '\t\t\t') => {
  const {
    type: { options }
  } = f;
  const isArray = !!(options && options.find((o) => o === Options.array));
  const isArrayRequired = !!(options && options.find((o) => o === Options.arrayRequired));
  const isRequired = !!(options && options.find((o) => o === Options.required));
  const aTabs = `\n${tabs}\t`;
  return `${tabs}${f.name}:{${aTabs}type:"${
    f.type.name
  }",${aTabs}array:${!!isArray},${aTabs}arrayRequired:${!!isArrayRequired},${aTabs}required:${!!isRequired}\n${tabs}}`;
};
const resolveField = (f: ParserField, resolveArgs = true) => {
  const { args, name } = f;
  return `\t\t${name}:{\n${args!.map((a) => resolveArg(a)).join(',\n')}\n\t\t}`;
};

export const guessTheScalar = (scalar: string) => {
  const possibleScalars: Record<string, string> = {
    Date: 'Date',
    File: 'File',
    Buffer: 'Buffer'
  };
  return scalar in possibleScalars ? possibleScalars[scalar] : undefined;
};

export const resolvePropTypeFromRoot = (i: ParserRoot) => {
  if (i.type.name === TypeDefinition.EnumTypeDefinition) {
    return `\t${i.name}: "enum"`;
  }
  if (i.type.name === TypeDefinition.ScalarTypeDefinition) {
    return `\t${i.name}: "String"`;
  }
  if (i.type.name === TypeDefinition.InputObjectTypeDefinition) {
    return `\t${i.name}:{\n${i.fields!.map((f) => resolveArg(f, '\t\t')).join(',\n')}\n\t}`;
  }
  if (i.type.name !== TypeDefinition.ScalarTypeDefinition) {
    return;
  }
  if (!i.fields) {
    return;
  }
  if (i.fields.filter((f) => f.args && f.args.length > 0).length === 0) {
    return;
  }
  return `\t${i.name}:{\n${i.fields
    .filter((f) => f.args && f.args.length)
    .map((f) => resolveField(f))
    .join(',\n')}\n\t}`;
};
