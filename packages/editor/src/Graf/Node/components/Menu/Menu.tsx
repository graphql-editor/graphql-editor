import React, { useRef } from 'react';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useOnClickOutside } from '@/Graf/Node/hooks';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 220px;
  border-radius: 4px;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.background.mainFurther};
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

export const Menu: React.FC<MenuProps> = ({
  children,
  hideMenu,
  menuName,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => hideMenu());
  return (
    <Wrapper {...props} ref={menuRef}>
      <Content>
        <Title
          data-cy={
            GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
              .searchableMenu.title
          }
        >
          {menuName}
        </Title>
        {children}
      </Content>
    </Wrapper>
  );
};
