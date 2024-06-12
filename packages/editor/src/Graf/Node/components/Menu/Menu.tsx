import React from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 220px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  border: 1px solid ${(p) => p.theme.neutrals.L3};
  font-family: ${({ theme }) => theme.fontFamilySans};
  z-index: 2;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.neutrals.L4};
  border-radius: ${(p) => p.theme.border.primary.radius};
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.div`
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.contrast};
  border-bottom: 1px solid ${(p) => p.theme.neutrals.L2};
`;

interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hideMenu: () => void;
  menuName?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, hideMenu, menuName, ...props }, ref) => {
    return (
      <Wrapper
        {...(props as any)}
        ref={ref}
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Content>
          {menuName && <Title>{menuName}</Title>}
          {children}
        </Content>
      </Wrapper>
    );
  }
);
Menu.displayName = "Menu";
