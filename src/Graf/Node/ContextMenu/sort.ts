import { ParserField } from 'graphql-js-tree';
import { match as ftest } from 'fuzzyjs';

export const sortNodes = (menuSearchValue: string, fields: ParserField[]) => {
  return [...fields].sort((a, b) => {
    const [aDistance, bDistance] = [
      ftest(menuSearchValue, a.name),
      ftest(menuSearchValue, b.name),
    ];
    return bDistance.score > aDistance.score
      ? 1
      : aDistance.score === bDistance.score
      ? 0
      : -1;
  });
};
