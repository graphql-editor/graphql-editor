import React from 'react';
import { More } from '@/shared/icons';

import { useTheme } from '@/state/containers';
import styled from '@emotion/styled';

const NodeIconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 2rem;
  height: 2rem;
  position: relative;
  transition: background-color 0.25s ease-in-out;
  background-color: transparent;
  cursor: pointer;
  margin: 0.2rem;
  background-color: ${({ theme }) => theme.background.mainMiddle};

  &:hover {
  }
`;

const ICON_SIZE = 14;
export const TopNodeMenu: React.FC = () => {
  const { theme } = useTheme();
  return (
    <NodeIconArea onClick={() => {}} title="Click to see node creator">
      <More fill={theme.text} height={ICON_SIZE} width={ICON_SIZE} />
    </NodeIconArea>
  );
};
