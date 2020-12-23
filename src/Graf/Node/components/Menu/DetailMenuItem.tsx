import React from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';

interface MenuItemProps {
  onClick: () => void;
}

const Main = style({
  display: 'flex',
  padding: `6px 12px`,
  fontSize: 14,
  cursor: 'pointer',
  scrollSnapAlign: 'end',
  $nest: {
    '.MenuItemText': {
      transition: 'color .25s ease-in-out',
      color: Colors.grey[2],
      width: '100%',
      $nest: {
        '&:hover': {
          color: Colors.grey[0],
        },
      },
    },
  },
});

export const DetailMenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div className={Main} onClick={onClick}>
      <span className={`MenuItemText`}>{children}</span>
    </div>
  );
};
