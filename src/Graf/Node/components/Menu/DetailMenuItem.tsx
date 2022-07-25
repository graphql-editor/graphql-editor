import React from 'react';
import styled from '@emotion/styled';

interface MenuItemProps {
  onClick: () => void;
}

const Main = styled.div`
  display: flex;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  scroll-snap-align: end;
`;

const MenuItemText = styled.span`
  transition: color 0.25s ease-in-out;
  color: ${({ theme }) => theme.text};
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.success};
  }
`;

export const DetailMenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <Main onClick={onClick}>
      <MenuItemText>{children}</MenuItemText>
    </Main>
  );
};
