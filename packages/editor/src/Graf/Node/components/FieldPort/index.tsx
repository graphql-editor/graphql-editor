import * as Icons from '@/shared/icons';
import styled from '@emotion/styled';
import React from 'react';

interface FieldPortProps {
  onClick: () => void;
  children?: React.ReactNode;
  open?: boolean;
  icons?: {
    closed: keyof typeof Icons;
    open: keyof typeof Icons;
  };
  info?: {
    message: string;
    placement: 'top' | 'bottom' | 'left' | 'right';
  };
}

const Main = styled.div`
  position: relative;
  padding: 0.5rem;
  margin: -0.5rem 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  pointer-events: all;
`;

export const FieldPort = React.forwardRef<HTMLDivElement, FieldPortProps>(
  (
    {
      children,
      onClick,
      open,
      info,
      icons = { closed: 'Plus', open: 'Minus' },
    },
    ref,
  ) => {
    const OpenComponent = Icons[icons.open];
    const ClosedComponent = Icons[icons.closed];
    return (
      <Main
        ref={ref}
        title={info?.message}
        className="node-field-port"
        onClick={onClick}
      >
        {open ? (
          <OpenComponent className="opener-icon" height={10} width={10} />
        ) : (
          <ClosedComponent className="opener-icon" height={12} width={12} />
        )}
        {children}
      </Main>
    );
  },
);
