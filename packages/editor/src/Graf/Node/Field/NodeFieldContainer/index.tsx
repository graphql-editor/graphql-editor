import { transition } from "@/vars";
import styled from "@emotion/styled";

export const NodeFieldContainer = styled.div<{
  active?: boolean;
  fromInterface?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.text.default};
  margin: 0;
  padding: 0.25rem 1rem;
  transition: border-color 0.25s ease-in-out;
  position: relative;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.neutrals.L6 : `${theme.neutrals.L6}00`};
  .field-actions {
    opacity: 0;
    pointer-events: none;
  }
  .opener-icon {
    transition: all 0.25s ease-in-out;
    opacity: 0;
  }
  .node-field-port {
    opacity: ${({ active }) => (active ? 1.0 : 0)};
    pointer-events: ${({ active }) => (active ? "all" : "none")};
    color: ${({ theme }) => theme.text.default};
    transition: ${transition};
    :hover {
      color: ${({ theme }) => theme.text.active};
    }
    .opener-icon {
      opacity: 1;
    }
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.neutrals.L6};
    .node-field-port {
      opacity: 1;
      pointer-events: all;
    }
    .field-actions {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;
