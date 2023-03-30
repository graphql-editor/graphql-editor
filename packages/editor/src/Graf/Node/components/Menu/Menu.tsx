import React from 'react';

import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Wrapper = styled.div`
  width: 220px;
  border-radius: ${(p) => p.theme.radius}px;
  font-family: ${fontFamilySans};
  z-index: 22;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.neutral[400]};
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
      <Wrapper {...props} ref={ref}>
        <Content>
          {menuName && <Title>{menuName}</Title>}
          {children}
        </Content>
      </Wrapper>
    );
  },
);
