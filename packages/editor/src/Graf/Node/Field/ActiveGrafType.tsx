import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { compileScalarTypes, compileTypeOptions } from '@/GraphQL/Compile';
import { useTheme } from '@/state/containers';
import styled from '@emotion/styled';
import { GRAF_FIELD_TYPE_SIZE } from '@/Graf/constants';
export const ActiveGrafType: React.FC<
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick, children }) => {
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
    <Type
      color={getTypeColor()}
      cursor={onClick ? 'pointer' : 'auto'}
      onClick={onClick}
    >
      <span>{compiledType}</span>
      {children}
    </Type>
  );
};

const Type = styled.a<{ color: string; cursor: 'pointer' | 'auto' }>`
  color: ${({ color }) => color};
  cursor: ${({ cursor }) => cursor};
  font-size: ${GRAF_FIELD_TYPE_SIZE}px;
  position: relative;
`;
