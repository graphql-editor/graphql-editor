import styled from '@emotion/styled';
import React from 'react';

const Main = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 0.5rem 1rem;
  transition: border-color 0.25s ease-in-out;
  border: 1px solid ${({ theme }) => theme.background.mainMiddle}00;

  .opener-icon {
    transition: all 0.25s ease-in-out;
    opacity: 0;
  }
  .node-field-port {
    display: none;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.background.mainMiddle};
    .node-field-port {
      display: flex;
      .opener-icon {
        opacity: 1;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  &.Active .node-field-port {
    .opener-icon {
      opacity: 1;
    }
  }
`;

export const NodeFieldContainer: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className = '', ...props }) => {
  return (
    <Main className={className} {...props}>
      {children}
    </Main>
  );
};
