import { BuiltInScalars } from "@/GraphQL/Resolve/BuiltInNodes";
import { ParserField } from "graphql-js-tree";
import { match as ftest } from "fuzzyjs";
const bar = 10;
export const sortNodes = (menuSearchValue: string, fields: ParserField[]) => {
  const [fieldName, fieldType] = menuSearchValue.split(" ");
  const searchValue = (fieldType || fieldName).toLowerCase();
  const scalars = fields.filter((a) =>
    BuiltInScalars.find((b) => a.name === b.name)
  );
  const matchingScalars = scalars.filter((scalar) =>
    scalar.name.toLowerCase().startsWith(searchValue)
  );
  const sortedScalars = [
    ...matchingScalars,
    ...scalars.filter((el) => !matchingScalars.some((s) => s.name === el.name)),
  ];

  fields = fields.filter((a) => !BuiltInScalars.find((b) => a.name === b.name));
  const exactMatchFields: ParserField[] = [];
  const worseMatchFields: ParserField[] = [];
  const results = fields
    .map((f) => {
      const fuzzyScore = ftest(searchValue, f.name).score;
      const startsScore = searchValue
        .toLowerCase()
        .startsWith(f.name.toLowerCase())
        ? 11
        : 0;
      return {
        f,
        score: Math.max(startsScore, fuzzyScore),
      };
    })
    .sort((a, b) => {
      return a.score > b.score ? -1 : a.score === b.score ? 0 : 1;
    });
  results.forEach((r) => {
    if (r.score > bar) {
      exactMatchFields.push(r.f);
    } else {
      worseMatchFields.push(r.f);
    }
  });
  return [...exactMatchFields, ...sortedScalars, ...worseMatchFields];
};
