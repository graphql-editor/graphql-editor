import { Options, ParserField } from '../../Models';
import { TypeDefinition } from '../../Models/Spec';

const typeScriptMap: Record<string, string> = {
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  ID: 'string',
  String: 'string'
};
const toTypeScriptPrimitive = (a: string): string => typeScriptMap[a] || a;

const plusDescription = (description?: string, prefix: string = '') =>
  description ? `${prefix}/** ${description} */\n` : '';

const resolveField = (f: ParserField, resolveArgs = true) => {
  const {
    type: { options },
    args
  } = f;
  const isArray = !!(options && options.find((o) => o === Options.array));
  const isArrayRequired = !!(options && options.find((o) => o === Options.arrayRequired));
  const isRequired = !!(options && options.find((o) => o === Options.required));
  const isRequiredName = (name: string) => {
    if (isArray) {
      if (isArrayRequired) {
        return name;
      }
      return `${name}?`;
    }
    if (isRequired) {
      return name;
    }
    return `${name}?`;
  };
  const concatArray = (name: string) => {
    if (isArray) {
      if (!isRequired) {
        return `(${name} | undefined)[]`;
      }
      return `${name}[]`;
    }
    return name;
  };
  const resolveArgsName = (name: string): string => {
    if (resolveArgs && args && args.length) {
      return `${name}:(props:{${args.map((a) => resolveField(a, false))}}) => `;
    }
    return isRequiredName(name) + ':';
  };
  return `${plusDescription(f.description, '\t')}\t${resolveArgsName(f.name)}${concatArray(
    toTypeScriptPrimitive(f.type.name)
  )}`;
};

const guessTheScalar = (scalar: string) => {
  const possibleScalars: Record<string, string> = {
    Date: 'Date',
    File: 'File',
    Buffer: 'Buffer'
  };
  return scalar in possibleScalars ? possibleScalars[scalar] : undefined;
};

export const resolveTypeFromRoot = (i: ParserField) => {
  if (i.type.name === TypeDefinition.ScalarTypeDefinition) {
    const exisitingInTS = guessTheScalar(i.name);
    return exisitingInTS ? '' : `${plusDescription(i.description)}export type ${i.name} = any`;
  }
  if (!i.args || !i.args.length) {
    return;
  }
  if (i.type.name === TypeDefinition.UnionTypeDefinition) {
    return `${plusDescription(i.description)}export type ${i.name} = ${i.args
      .map((f) => f.type.name)
      .join(' | ')}`;
  }
  if (i.type.name === TypeDefinition.EnumTypeDefinition) {
    return `${plusDescription(i.description)}export enum ${i.name} {\n${i.args
      .map((f) => `\t${f.name} = "${f.name}"`)
      .join(',\n')}\n}`;
  }
  return `${plusDescription(i.description)}export type ${i.name} = {\n${i.args
    .map((f) => resolveField(f))
    .join(',\n')}\n}`;
};
