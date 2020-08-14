import React from 'react';
import { ParserField, Options } from 'graphql-zeus';
import { GraphQLColors } from '@editor/theme';
export const FieldType: React.FC<Pick<ParserField, 'type'>> = ({ type }) => {
  let compiledType = type.name;
  if (type.options?.includes(Options.arrayRequired)) {
    compiledType = `${compiledType}!`;
  }
  if (type.options?.includes(Options.array)) {
    compiledType = `[${compiledType}]`;
  }
  if (type.options?.includes(Options.required)) {
    compiledType = `${compiledType}!`;
  }
  return (
    <span style={{ color: type.name in GraphQLColors ? ((GraphQLColors as any)[type.name] as string) : '#fff' }}>
      {compiledType}
    </span>
  );
};
