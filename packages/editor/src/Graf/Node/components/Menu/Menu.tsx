import React from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 220px;
  border-radius: ${(p) => p.theme.radius}px;
  font-family: ${({ theme }) => theme.fontFamilySans};
  z-index: 2;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.neutrals.L4};
  border-radius: ${(p) => p.theme.radius}px;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.div`
  padding: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.contrast};
  border-bottom: 1px solid ${(p) => p.theme.dividerSecondary};
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
