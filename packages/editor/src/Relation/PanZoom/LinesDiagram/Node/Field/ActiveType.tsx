import React, { useMemo } from "react";
import { ParserField } from "graphql-js-tree";
import { compileScalarTypes, compileTypeOptions } from "@/GraphQL/Compile";
import styled from "@emotion/styled";
export const ActiveType: React.FC<
  Pick<ParserField, "type"> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
  }
> = ({ type, parentTypes, onClick }) => {
  const compiledType = useMemo(
    () => compileTypeOptions({ type }),
    [JSON.stringify(type)]
  );
  const sType = useMemo(() => compileScalarTypes(type), [JSON.stringify(type)]);
  const color = parentTypes?.[sType] ? parentTypes[sType] : sType;
  return (
    <AType
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      color={color}
      clickable={!!onClick}
    >
      {compiledType}
    </AType>
  );
};

const AType = styled.a<{ clickable?: boolean; color?: string }>`
  color: ${({ color, theme }) =>
    color
      ? theme.colors[color as keyof typeof theme.colors]
        ? theme.colors[color as keyof typeof theme.colors]
        : theme.text.default
      : theme.text.default};
`;
