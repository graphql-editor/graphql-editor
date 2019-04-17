import { ParserField, ParserRoot, ObjectTypes } from '../../Models';

const resolveField = (f: ParserField, resolveArgs = true) => {
  const { type, name } = f;
  return `\t\t${name}:"${type.name}"`;
};

export const resolveReturnFromRoot = (i: ParserRoot) => {
  if (i.type.name === ObjectTypes.union) {
    return;
  }
  if (i.type.name !== ObjectTypes.type && i.type.name !== ObjectTypes.interface) {
    return;
  }
  if (!i.fields) {
    return;
  }
  return `\t${i.name}:{\n${i.fields.map((f) => resolveField(f)).join(',\n')}\n\t}`;
};
