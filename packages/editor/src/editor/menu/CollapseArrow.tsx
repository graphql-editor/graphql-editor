import { ArrowLeft } from '@/editor/icons';
import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div<{ isCollapsed: boolean; isRight?: true }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 29px;
  width: 29px;
  border-radius: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.background.mainMiddle};
  position: absolute;
  z-index: 5;
  top: 50%;
  right: ${({ isRight }) => (isRight ? 'unset' : 0)};
  left: ${({ isRight }) => (isRight ? 0 : 'unset')};
  translate: ${({ isRight }) => (isRight ? '-50% -50%' : '50% -50%')};
  color: ${({ theme }) => theme.disabled};
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.active};
  }

  svg {
    width: 6px;
    height: 11px;
    transform: ${({ isCollapsed, isRight }) => {
      if (isRight) return isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
      return isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }};
  }
`;

interface CollapseArrowProps {
  isCollapsed: boolean;
  toggle: () => void;
  isRight?: true;
}

export const CollapseArrow: React.FC<CollapseArrowProps> = ({
  isCollapsed,
  toggle,
  isRight,
}) => {
  return (
    <Container
      isRight={isRight}
      isCollapsed={isCollapsed}
      onClick={() => toggle()}
    >
      <ArrowLeft size={11} />
    </Container>
  );
};
