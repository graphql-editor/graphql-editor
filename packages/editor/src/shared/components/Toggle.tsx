import { CheckSquare } from '@/icons/CheckSquare';
import { CheckSquareEmpty } from '@/icons/CheckSquareEmpty';
import * as vars from '@/vars';
import styled from '@emotion/styled';
import React from 'react';
export const Toggle: React.FC<{
  toggled?: boolean;
  label?: string;
  onToggle: () => void;
}> = ({ toggled, onToggle, label }) => {
  return (
    <Main onClick={() => onToggle()}>
      {label && <Text active={toggled}>{label}</Text>}
      <ToggleWrapper active={toggled}>
        {toggled && <CheckSquare />}
        {!toggled && <CheckSquareEmpty />}
      </ToggleWrapper>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;
const Text = styled.div<{ active?: boolean }>`
  font-size: 13px;
  line-height: 12px;
  color: ${({ theme, active }) => (active ? theme.text : theme.inactive)};
  font-weight: 500;
  transition: ${vars.transition};
`;
const ToggleWrapper = styled.div<{ active?: boolean }>`
  ${({ theme, active }) => (active ? theme.active : theme.inactive)};
  position: relative;
  display: flex;
  align-items: center;
  transition: ${vars.transition};
  color: ${({ theme, active }) => (active ? theme.active : theme.inactive)};
  svg {
    transition: ${vars.transition};
    stroke-width: 2px;
  }
`;
