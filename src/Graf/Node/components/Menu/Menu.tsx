import { style } from 'typestyle';
import { Colors } from '@/Colors';
import React, { useRef, useState, useEffect } from 'react';

const Wrapper = style({
  zIndex: 4,
  width: 220,
  borderRadius: 4,
});
const Content = style({
  background: Colors.pink[10],
  borderRadius: 4,
  padding: 10,
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
      <div className={Content}>{children}</div>
    </div>
  );
};
