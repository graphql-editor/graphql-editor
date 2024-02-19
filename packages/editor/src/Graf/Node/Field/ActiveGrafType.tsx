import React, { useMemo } from "react";
import { ParserField } from "graphql-js-tree";
import { compileScalarTypes, compileTypeOptions } from "@/GraphQL/Compile";
import styled from "@emotion/styled";
import { GRAF_FIELD_TYPE_SIZE } from "@/Graf/constants";
import { dataIt } from "@/Models";
export const ActiveGrafType = React.forwardRef<
  HTMLAnchorElement,
  Pick<ParserField, "type"> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
    children?: React.ReactNode;
  }
>(({ type, parentTypes, onClick, children }, ref) => {
  const compiledType = useMemo(
    () => compileTypeOptions({ type }),
    [JSON.stringify(type)]
  );
  const sType = useMemo(() => compileScalarTypes(type), [JSON.stringify(type)]);
  const color = parentTypes?.[sType] ? parentTypes[sType] : sType;

  return (
    <Type
      {...dataIt("fieldType")}
      ref={ref}
      color={color}
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
    >
      <span>{compiledType}</span>
      {children}
    </Type>
  );
});

const Type = styled.a<{ color: string; cursor: "pointer" | "default" }>`
  color: ${({ color, theme }) =>
    color
      ? theme.colors[color as keyof typeof theme.colors]
        ? theme.colors[color as keyof typeof theme.colors]
        : theme.text.default
      : theme.text.default};
  cursor: ${({ cursor }) => cursor};
  font-size: ${GRAF_FIELD_TYPE_SIZE}px;
  position: relative;
`;
