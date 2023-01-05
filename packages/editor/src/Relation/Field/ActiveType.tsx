import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { compileScalarTypes, compileTypeOptions } from '@/GraphQL/Compile';
import { useTheme } from '@/state/containers';
export const ActiveType: React.FC<
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick }) => {
  let compiledType = compileTypeOptions({ type });
  const {
    theme: { colors },
  } = useTheme();

  const getTypeColor = () => {
    const t = compileScalarTypes(type);
    if (t in colors) {
      return (colors as any)[t] as string;
    }
    if (parentTypes && t in parentTypes) {
      return (colors as any)[parentTypes[t]];
    }
    return '#fff';
  };

  return (
    <a
      onClick={onClick}
      style={{ color: getTypeColor(), cursor: onClick ? 'pointer' : 'auto' }}
    >
      {compiledType}
    </a>
  );
};
