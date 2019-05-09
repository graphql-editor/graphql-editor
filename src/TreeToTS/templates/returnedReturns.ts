import { ParserField } from '../../Models';
import { TypeDefinition } from '../../Models/Spec';

const resolveField = (f: ParserField, resolveArgs = true) => {
  const { type, name } = f;
  return `\t\t${name}:"${type.name}"`;
};

export const resolveReturnFromRoot = (i: ParserField) => {
  if (i.type.name === TypeDefinition.UnionTypeDefinition) {
    return;
  }
  if (
    i.type.name !== TypeDefinition.ObjectTypeDefinition &&
    i.type.name !== TypeDefinition.InterfaceTypeDefinition
  ) {
    return;
  }
  if (!i.args) {
    return;
  }
  return `\t${i.name}:{\n${i.args.map((f) => resolveField(f)).join(',\n')}\n\t}`;
};
