import { Colors } from '@/Colors';
import React from 'react';
import { style } from 'typestyle';

const Main = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  margin: `0 0`,
  transition: 'background 0.25s ease-in-out',
  $nest: {
    '&.Active': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          backgroundColor: Colors.grey[9],
          $nest: {
            '.OpenerIcon': {
              opacity: 1,
            },
          },
        },
      },
    },
    '.NodeFieldPortPlaceholder': {
      width: 24,
      height: 16,
    },
    '&:hover': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          backgroundColor: `${Colors.grey[9]}88`,
          $nest: {
            '.OpenerIcon': {
              opacity: 0.5,
            },
          },
        },
      },
    },
  },
});

export const NodeFieldContainer: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, className = '', ...props }) => {
  return (
    <div className={[Main, className].join(' ')} {...props}>
      {children}
    </div>
  );
};
