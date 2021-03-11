import { style } from 'typestyle';
import React, { useRef, useState, useEffect } from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Wrapper = style({
  zIndex: 4,
  width: 220,
  borderRadius: 4,
});
const Content = themed(
  ({
    colors: {
      graf: {
        node: {
          menu: { background, borderColor },
        },
      },
    },
  }) =>
    style({
      background,
      border: `solid 1px ${borderColor}22`,
      borderRadius: 4,
      padding: 0,
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
        <div className={Title(theme)}>{menuName}</div>
        {children}
      </div>
    </div>
  );
};
