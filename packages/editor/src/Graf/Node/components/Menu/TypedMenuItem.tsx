import React, { useEffect, useRef } from 'react';
import { GraphQLEditorDomStructure } from '@/domStructure';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

interface TypedMenuItemProps {
  onClick: () => void;
  name?: string;
  type: string;
  dataType: string;
  selected?: boolean;
}

type NodeTypes = keyof EditorTheme['colors'];

const Main = styled.div<{ isSelected?: boolean }>`
  display: flex;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  scroll-snap-align: end;
  background-color: ${({ isSelected, theme }) =>
    isSelected && theme.background.mainClose};

  &:hover {
    background-color: ${({ theme }) => theme.background.mainClose};
  }
`;

const MenuItemName = styled.span`
  transition: color 0.25s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

const MenuItemType = styled.span<{ nodeType: NodeTypes }>`
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  margin-left: 4px;
  color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text}dd;
`;

export const TypedMenuItem: React.FC<TypedMenuItemProps> = ({
  type,
  dataType,
  onClick,
  name,
  selected,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selected]);

  return (
    <Main
      ref={ref}
      isSelected={selected}
      onClick={onClick}
      data-cy={
        GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
          .searchableMenu.optionToSelect
      }
    >
      {name && <MenuItemName>{name}</MenuItemName>}
      <MenuItemType nodeType={dataType as NodeTypes}>{type}</MenuItemType>
    </Main>
  );
};
