import React from 'react';
import { ParserField } from 'graphql-zeus';
import { compileTypeOptions } from '@/GraphQL/Compile';
import { useTheme } from '@/state/containers';
export const ActiveType: React.FC<
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick }) => {
  let compiledType = compileTypeOptions({ type });
  const {
    theme: {
      colors: { colors },
    },
  } = useTheme();

  const getTypeColor = () => {
    if (type.name in colors) {
      return (colors as any)[type.name] as string;
    }
    if (parentTypes && type.name in parentTypes) {
      return (colors as any)[parentTypes[type.name]];
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
