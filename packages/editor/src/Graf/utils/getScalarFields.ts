import { ParserField, getTypeName } from "graphql-js-tree";

export const getScalarFields = (node: ParserField, validScalars: string[]) =>
  (
    node.args?.filter(
      (a) =>
        validScalars.includes(getTypeName(a.type.fieldType)) &&
        a.args?.length === 0
    ) || []
  ).map(
    (a) =>
      ({
        args: [],
        data: { type: a.data.type },
        id: a.id,
        name: a.name,
        type: a.type,
        value: a.value,
        directives: [],
        interfaces: [],
      } as ParserField)
  );
