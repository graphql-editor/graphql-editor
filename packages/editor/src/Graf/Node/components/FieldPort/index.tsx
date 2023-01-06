import * as Icons from '@/shared/icons';
import styled from '@emotion/styled';
import React from 'react';

interface FieldPortProps {
  onClick: () => void;
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
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  pointer-events: all;
`;

export const FieldPort: React.FC<FieldPortProps> = ({
  children,
  onClick,
  open,
  info,
  icons = { closed: 'Plus', open: 'Minus' },
}) => {
  const OpenComponent = Icons[icons.open];
  const ClosedComponent = Icons[icons.closed];
  return (
    <Main title={info?.message} className="node-field-port" onClick={onClick}>
      {open ? (
        <OpenComponent className="opener-icon" height={10} width={10} />
      ) : (
        <ClosedComponent className="opener-icon" height={12} width={12} />
      )}
      {children}
    </Main>
  );
};
