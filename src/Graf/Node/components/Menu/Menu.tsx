import { style } from 'typestyle';
import React, { useRef } from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useOnClickOutside } from '@/Graf/Node/hooks';

const Wrapper = style({
  zIndex: 4,
  width: 220,
  borderRadius: 4,
});
const Content = themed(({ shadow, background: { mainFurthest } }) =>
  style({
    background: mainFurthest,
    borderRadius: 4,
    padding: 0,
    boxShadow: shadow,
  }),
);
const Title = themed(({ info }) =>
  style({
    padding: 16,
    fontSize: 14,
    color: info,
  }),
);
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
  const { theme } = useTheme();
  useOnClickOutside(menuRef, () => hideMenu());
  return (
    <div {...props} className={Wrapper} ref={menuRef}>
      <div className={Content(theme)}>
        <div
          data-cy={
            GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
              .searchableMenu.title
          }
          className={Title(theme)}
        >
          {menuName}
        </div>
        {children}
      </div>
    </div>
  );
};
