import React, { useEffect } from "react";
import styled from "@emotion/styled";

const Main = styled.div`
  color: ${({ theme }) => theme.text.default};
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  scroll-snap-type: y mandatory;
`;

interface MenuScrollingAreaProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  controls?: {
    arrowDown?: () => void;
    arrowUp?: () => void;
  };
}

export const MenuScrollingArea: React.FC<MenuScrollingAreaProps> = ({
  children,
  controls,
  ...props
}) => {
  useEffect(() => {
    function downHandler(e: KeyboardEvent) {
      const { key } = e;
      if (key === "ArrowDown") {
        e.preventDefault();
        controls?.arrowDown?.();
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        controls?.arrowUp?.();
      }
    }
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);
  return <Main {...props}>{children}</Main>;
};
