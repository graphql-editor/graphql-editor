import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { GraphQLEditorDomStructure } from '@/domStructure';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

interface MenuItemProps {
  node: ParserField;
  onClick: () => void;
  name?: string;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

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
    theme.colors[nodeType] ? theme.colors[nodeType] + 'dd' : theme.text};

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

export const MenuItem: React.FC<MenuItemProps> = ({ node, onClick, name }) => {
  return (
    <Main
      onClick={onClick}
      data-cy={
        GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
          .searchableMenu.optionToSelect
      }
    >
      <MenuItemText nodeType={node.type.name as NodeTypes}>
        {name || node.name}
      </MenuItemText>
    </Main>
  );
};
