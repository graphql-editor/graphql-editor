import styled from "@emotion/styled";
import React from "react";

interface FieldPortProps {
  onClick: () => void;
  open?: boolean;
  icons: {
    closed: React.ReactNode;
    open: React.ReactNode;
  };
  children?: React.ReactNode;
}

const Main = styled.div`
  position: relative;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  pointer-events: all;
`;

export const FieldPort = React.forwardRef<HTMLDivElement, FieldPortProps>(
  ({ onClick, open, icons }, ref) => {
    const OpenComponent = icons.open;
    const ClosedComponent = icons.closed;
    return (
      <Main ref={ref} className="node-field-port" onClick={onClick}>
        <OpenerComponent className="opener-icon">
          {open && OpenComponent}
          {!open && ClosedComponent}
        </OpenerComponent>
      </Main>
    );
  }
);

const OpenerComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
