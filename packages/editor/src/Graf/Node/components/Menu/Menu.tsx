import React from 'react';

import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Wrapper = styled.div`
  width: 220px;
  border-radius: 4px;
  font-family: ${fontFamilySans};
  z-index: 22;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.background.mainFar};
  border-radius: 4px;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Title = styled.div`
  padding: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.active};
`;

interface MenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hideMenu: () => void;
  menuName: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, hideMenu, menuName, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        <Content>
          <Title>{menuName}</Title>
          {children}
        </Content>
      </Wrapper>
    );
  },
);
