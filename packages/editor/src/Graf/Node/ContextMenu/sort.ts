import { BuiltInScalars } from '@/GraphQL/Resolve/BuiltInNodes';
import { ParserField } from 'graphql-js-tree';
import { match as ftest } from 'fuzzyjs';

const typeFactor = 10;

export const sortNodes = (menuSearchValue: string, fields: ParserField[]) => {
  const [fieldName, fieldType] = menuSearchValue.split(' ');
  if (fieldType) {
    return [...fields].sort((a, b) => {
      const [aNameDistance, bNameDistance] = [
        ftest(fieldName, a.name).score,
        ftest(fieldName, b.name).score,
      ];
      const [aTypeDistance, bTypeDistance] = [
        ftest(fieldType, a.name).score,
        ftest(fieldType, b.name).score,
      ];
      const aSum = aNameDistance + aTypeDistance * typeFactor;
      const bSum = bNameDistance + bTypeDistance * typeFactor;
      return aSum > bSum ? -1 : aSum === bSum ? 0 : 1;
    });
  } else {
    const scalars = fields.filter((a) =>
      BuiltInScalars.find((b) => a.name === b.name),
    );
    fields = fields.filter(
      (a) => !BuiltInScalars.find((b) => a.name === b.name),
    );
    fields.sort((a, b) => {
      const [aNameDistance, bNameDistance] = [
        ftest(fieldName, a.name).score,
        ftest(fieldName, b.name).score,
      ];
      return aNameDistance > bNameDistance
        ? -1
        : aNameDistance === bNameDistance
        ? 0
        : 1;
    });
    fields.splice(2, 0, ...scalars);
    return fields;
  }
};
