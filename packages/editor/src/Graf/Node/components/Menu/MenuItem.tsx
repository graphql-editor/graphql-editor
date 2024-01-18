import React from "react";
import { ParserField, getTypeName } from "graphql-js-tree";

import styled from "@emotion/styled";
import { EditorTheme } from "@/gshared/theme/MainTheme";

interface MenuItemProps {
  node: ParserField;
  onClick: () => void;
  name?: string;
}

type NodeTypes = keyof EditorTheme["colors"];

const Main = styled.div`
  display: flex;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  scroll-snap-align: end;
`;
const MenuItemText = styled.span<{ nodeType: NodeTypes }>`
  transition: color 0.25s ease-in-out;
  width: 100%;
  color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text.active};

  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;

export const MenuItem: React.FC<MenuItemProps> = ({ node, onClick, name }) => {
  return (
    <Main onClick={onClick}>
      <MenuItemText nodeType={getTypeName(node.type.fieldType) as NodeTypes}>
        {name || node.name}
      </MenuItemText>
    </Main>
  );
};
