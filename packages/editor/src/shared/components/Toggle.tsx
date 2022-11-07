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
  border: 1px solid
    ${({ theme, active }) => (active ? theme.backgrounds.type : theme.inactive)};
  border-radius: 10px;
  width: 40px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  transition: ${vars.transition};
`;
const ToggleCircle = styled.div<{ active?: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.type : theme.inactive};
  position: absolute;
  border-radius: 8px;
  margin-left: ${({ active }) => (active ? '20px' : '2px')};
  transition: ${vars.transition};
`;
