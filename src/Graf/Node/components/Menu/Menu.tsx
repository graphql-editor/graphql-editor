import { style } from 'typestyle';
import { Colors } from '@/Colors';
import React, { useRef, useState, useEffect } from 'react';
const Triangle = style({
  width: 0,
  height: 0,
  borderLeft: `10px solid transparent`,
  borderRight: `10px solid transparent`,
  borderBottom: `15px solid ${Colors.pink[10]}`,
  margin: 'auto',
  marginBottom: -1,
});

const Wrapper = style({
  zIndex: 4,
  width: 180,
  borderRadius: 4,
});
const Content = style({
  background: Colors.pink[10],
  borderRadius: 4,
});

interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  hideMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({ children, hideMenu, ...props }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [listener, setListener] = useState<(e: MouseEvent) => void>();
  useEffect(() => {
    setListener(() => {
      if (listener) {
        document.removeEventListener('click', listener);
      }
      const l = (e: MouseEvent) => {
        if (menuRef.current && e.target && !menuRef.current.contains(e.target as any)) {
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
      <div className={Triangle} />
      <div className={Content}>{children}</div>
    </div>
  );
};
