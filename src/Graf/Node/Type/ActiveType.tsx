import React from 'react';
import { ParserField } from 'graphql-zeus';
import { GraphQLColors } from '@/editor/theme';
import { compileTypeOptions } from '@/GraphQL/Compile';
export const ActiveType: React.FC<
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick }) => {
  let compiledType = compileTypeOptions({ type });

  const getTypeColor = () => {
    if (type.name in GraphQLColors) {
      return (GraphQLColors as any)[type.name] as string;
    }
    if (parentTypes && type.name in parentTypes) {
      return (GraphQLColors as any)[parentTypes[type.name]];
    }
    return '#fff';
  };

  return (
    <a
      onClick={onClick}
      className={`TypeColor-${type.name}`}
      style={{ color: getTypeColor(), cursor: onClick ? 'pointer' : 'auto' }}
    >
      {compiledType}
    </a>
  );
};
