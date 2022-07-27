import styled from '@emotion/styled';
import React from 'react';

const Main = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  margin: 0;
  transition: background-color 0.25s ease-in-out;

  .opener-icon {
    transition: all 0.25s ease-in-out;
    opacity: 0;
  }

  &.Active,
  &:hover {
    background-color: ${({ theme }) => theme.background.mainClose};
  }
  &:hover .node-field-port {
    background-color: ${({ theme }) => theme.background.mainFurther}88;
    .opener-icon {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }

  &.Active .node-field-port {
    background-color: ${({ theme }) => theme.background.mainFurther};
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
