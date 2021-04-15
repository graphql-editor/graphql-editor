import { style } from 'typestyle';
import React, { useRef, useState, useEffect } from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';

const Wrapper = style({
  zIndex: 4,
  width: 220,
  borderRadius: 4,
});
const Content = themed(
  ({
    shadow,
    colors: {
      graf: {
        node: {
          menu: { background },
        },
      },
    },
  }) =>
    style({
      background,
      borderRadius: 4,
      padding: 0,
      boxShadow: shadow,
    }),
);
const Title = themed(({ colors: { graf: { node: { menu: { color } } } } }) =>
  style({
    padding: 16,
    fontSize: 14,
    color,
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
  const [listener, setListener] = useState<(e: MouseEvent) => void>();
  const { theme } = useTheme();
  useEffect(() => {
    setListener(() => {
      if (listener) {
        document.removeEventListener('click', listener);
      }
      const l = (e: MouseEvent) => {
        if (
          menuRef.current &&
          e.target &&
          !menuRef.current.contains(e.target as any)
        ) {
          document.removeEventListener('click', l);
          hideMenu();
          return;
        }
      };
      document.addEventListener('click', l);
      return l;
    });
    return () => {
      if (listener) {
        document.removeEventListener('click', listener);
      }
    };
  }, [menuRef]);
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
