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
        <ToggleCircle active={toggled} />
      </ToggleWrapper>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  height: 14px;
`;
const Text = styled.div<{ active?: boolean }>`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme, active }) => (active ? theme.text : theme.inactive)};
  font-weight: bold;
  transition: ${vars.transition};
`;
const ToggleWrapper = styled.div<{ active?: boolean }>`
  border: 1px solid
    ${({ theme, active }) => (active ? theme.text : theme.inactive)};
  border-radius: 10px;
  width: 28px;
  height: 14px;
  position: relative;
  display: flex;
  align-items: center;
  transition: ${vars.transition};
`;
const ToggleCircle = styled.div<{ active?: boolean }>`
  width: 14px;
  height: 14px;
  background-color: ${({ theme, active }) =>
    active ? theme.text : theme.inactive};
  position: absolute;
  border-radius: 10px;
  margin-left: ${({ active }) => (active ? '14px' : '0px')};
  transition: ${vars.transition};
`;
