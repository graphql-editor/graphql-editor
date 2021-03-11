import { useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';
import React from 'react';
import { style } from 'typestyle';

const Main = themed(
  ({
    colors: {
      relation: {
        unknownField: {
          color,
          whenActiveParentBackground,
          whenActiveFieldPortBackground,
        },
      },
    },
  }) =>
    style({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      color,
      margin: `0 0`,
      transition: 'background 0.25s ease-in-out',
      $nest: {
        '&.Active': {
          background: whenActiveParentBackground,
          $nest: {
            '.NodeFieldPort': {
              backgroundColor: whenActiveFieldPortBackground,
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
          background: whenActiveParentBackground,
          $nest: {
            '.NodeFieldPort': {
              backgroundColor: `${whenActiveFieldPortBackground}88`,
              $nest: {
                '.OpenerIcon': {
                  opacity: 0.5,
                },
              },
            },
          },
        },
      },
    }),
);

export const NodeFieldContainer: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, className = '', ...props }) => {
  const { theme } = useTheme();
  return (
    <div className={[Main(theme), className].join(' ')} {...props}>
      {children}
    </div>
  );
};
