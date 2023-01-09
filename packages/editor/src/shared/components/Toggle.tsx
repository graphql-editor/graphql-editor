import { Tick } from '@/shared/icons';
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
        <Tick width={20} />
      </ToggleWrapper>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-right: 12px;
  height: 20px;
  cursor: pointer;
`;
const Text = styled.div<{ active?: boolean }>`
  font-size: 14px;
  line-height: 12px;
  color: ${({ theme, active }) => (active ? theme.text : theme.inactive)};
  font-weight: 400;
  transition: ${vars.transition};
`;
const ToggleWrapper = styled.div<{ active?: boolean }>`
  border: 2px solid
    ${({ theme, active }) => (active ? theme.active : theme.inactive)};
  border-radius: 2px;
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  transition: ${vars.transition};
  svg {
    stroke: ${({ theme, active }) => (active ? theme.active : theme.inactive)};
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: ${vars.transition};
    stroke-width: 2px;
  }
`;
