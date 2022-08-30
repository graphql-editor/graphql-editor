import styled from '@emotion/styled';
import React from 'react';

interface TitleProps {
  changeTitle?: boolean;
  isActive?: boolean;
}

const Main = styled.div<TitleProps>`
  font-size: 12px;
  display: flex;
  flex: 1;
  align-items: baseline;
  overflow: hidden;
  margin-right: ${({ changeTitle }) => (changeTitle ? '0' : '70px')};
  padding: ${({ isActive }) => (isActive ? '5px 25px' : '5px')};
  margin: ${({ isActive }) => isActive && '0 -20px -1px'};
  border-bottom: ${({ isActive, theme }) =>
    isActive && `1px solid ${theme.background.mainClose}`};
`;

export const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};
