import React, { useMemo } from 'react';
import { ParserField } from 'graphql-js-tree';
import { compileScalarTypes, compileTypeOptions } from '@/GraphQL/Compile';
import styled from '@emotion/styled';
import { GRAF_FIELD_TYPE_SIZE } from '@/Graf/constants';
export const ActiveGrafType = React.forwardRef<
  HTMLAnchorElement,
  Pick<ParserField, 'type'> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
>(({ type, parentTypes, onClick, children }, ref) => {
  let compiledType = useMemo(
    () => compileTypeOptions({ type }),
    [JSON.stringify(type)],
  );
  const sType = useMemo(() => compileScalarTypes(type), [JSON.stringify(type)]);
  const color = parentTypes?.[sType] ? parentTypes[sType] : sType;

  return (
    <Type
      ref={ref}
      color={color}
      cursor={onClick ? 'pointer' : 'auto'}
      onClick={onClick}
    >
      <span>{compiledType}</span>
      {children}
    </Type>
  );
});

const Type = styled.a<{ color: string; cursor: 'pointer' | 'auto' }>`
  color: ${({ color, theme }) =>
    color
      ? theme.colors[color as keyof typeof theme.colors]
        ? theme.colors[color as keyof typeof theme.colors]
        : theme.text
      : theme.text};
  cursor: ${({ cursor }) => cursor};
  font-size: ${GRAF_FIELD_TYPE_SIZE}px;
  position: relative;
`;
