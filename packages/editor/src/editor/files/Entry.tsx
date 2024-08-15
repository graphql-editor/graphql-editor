import styled from "@emotion/styled";

export const Entry = styled.div<{ isActive?: boolean; leftLevel?: number }>`
  display: flex;
  padding: 0.25rem 0.25rem;
  color: ${(p) => p.theme.accent.L1};
  cursor: pointer;
  padding-left: ${(p) => (p.leftLevel || 0) * 0.5}rem;
  svg {
    height: 0.75rem;
  }
  background-color: transparent;
  color: ${(p) => (p.isActive ? p.theme.text.active : p.theme.text.default)};
  :hover {
    background-color: ${(p) => p.theme.accent.L3}22;
    span {
      color: ${(p) => p.theme.accent.L2};
    }
  }
`;

export const EntryText = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  color: currentColor;
`;

export const EntryInput = styled.input`
  font-weight: 500;
  border: 0;
  outline: 0;
  font-size: 0.75rem;
  color: currentColor;
  background-color: transparent;
`;
