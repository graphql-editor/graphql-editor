import React, { useEffect, useRef } from "react";

import styled from "@emotion/styled";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import { transition } from "@/vars";

interface TypedMenuItemProps {
  onClick: () => void;
  name?: string;
  type: string;
  dataType: string;
  selected?: boolean;
}

type NodeTypes = keyof EditorTheme["colors"];

const Main = styled.div<{ isSelected?: boolean }>`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  font-size: 14px;
  cursor: pointer;
  border-radius: ${(p) => p.theme.border.primary.radius};
  scroll-snap-align: end;
  background-color: ${({ isSelected, theme }) =>
    isSelected && theme.neutrals.L5};
  transition: ${transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;

const MenuItemName = styled.span`
  transition: ${transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;

const MenuItemType = styled.span<{ nodeType: NodeTypes }>`
  font-size: 0.875rem;
  display: flex;
  align-items: flex-start;
  transition: ${transition};
  color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text.active};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
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
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <Main ref={ref} isSelected={selected} onClick={onClick}>
      {name && <MenuItemName>{name}</MenuItemName>}
      <MenuItemType nodeType={dataType as NodeTypes}>{type}</MenuItemType>
    </Main>
  );
};
