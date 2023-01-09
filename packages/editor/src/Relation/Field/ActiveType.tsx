import React, { useMemo } from 'react';
import { ParserField } from 'graphql-js-tree';
import { compileScalarTypes, compileTypeOptions } from '@/GraphQL/Compile';
import styled from '@emotion/styled';
export const ActiveType: React.FC<
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick }) => {
  let compiledType = useMemo(() => compileTypeOptions({ type }), [type]);
  const sType = useMemo(() => compileScalarTypes(type), [type]);
  const color = parentTypes?.[sType] ? parentTypes[sType] : sType;
  return (
    <AType onClick={onClick} color={color} clickable={!!onClick}>
      {compiledType}
    </AType>
  );
};

const AType = styled.a<{ clickable?: boolean; color?: string }>`
  color: ${({ color, theme }) =>
    color
      ? theme.colors[color as keyof typeof theme.colors]
        ? theme.colors[color as keyof typeof theme.colors]
        : theme.text
      : theme.text};
`;
