import styled from '@emotion/styled';

export const NodeFieldContainer = styled.div<{
  active?: boolean;
  fromInterface?: boolean;
}>`
  /* position: relative; */
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 0.5rem 1rem;
  transition: border-color 0.25s ease-in-out;
  border: 1px solid
    ${({ theme, active }) =>
      active
        ? theme.background.mainMiddle
        : `${theme.background.mainMiddle}00`};

  .opener-icon {
    transition: all 0.25s ease-in-out;
    opacity: 0;
  }
  .node-field-port {
    opacity: ${({ active }) => (active ? 1.0 : 0)};
    pointer-events: ${({ active }) => (active ? 'all' : 'none')};
    .opener-icon {
      opacity: 1;
    }
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.background.mainMiddle};
    .node-field-port {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
