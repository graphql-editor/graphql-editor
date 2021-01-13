import React from 'react';
import { ParserField } from 'graphql-zeus';
import { GraphQLColors } from '@/editor/theme';
import { compileTypeOptions } from '@/GraphQL/Compile';
export const ActiveType: React.FC<Pick<ParserField, 'type'> & { parentTypes?: Record<string, string> }> = ({
  type,
  parentTypes,
}) => {
  let compiledType = compileTypeOptions({ type });

  const getTypeColor = () => {
    let color = '#fff';
    if (type.name in GraphQLColors) {
      color = (GraphQLColors as any)[type.name] as string;
    }
    if (parentTypes && type.name in parentTypes) {
      color = (GraphQLColors as any)[parentTypes[type.name]];
    }

    return color;
  };

  return (
    <span className={`TypeColor-${type.name}`} style={{ color: getTypeColor() }}>
      {compiledType}
    </span>
  );
};
