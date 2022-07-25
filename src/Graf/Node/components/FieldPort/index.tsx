import * as Icons from '@/Graf/icons';
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
  width: 30px;
  height: 30px;
  font-size: 7px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
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
