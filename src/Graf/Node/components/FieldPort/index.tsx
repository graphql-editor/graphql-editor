import { Colors } from '@/Colors';
import * as Icons from '@/Graf/icons';
import { darken, toHex } from 'color2k';
import React from 'react';
import { style } from 'typestyle';

interface FieldPortProps {
  onClick: () => void;
  open?: boolean;
  icons?: {
    closed: keyof typeof Icons;
    open: keyof typeof Icons;
  };
  info?: {
    message: string;
    placement: 'top' | 'bottom' | 'left' | 'right';
  };
}

const Main = style({
  position: 'relative',
  width: 30,
  height: 30,
  fontSize: 7,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: `${toHex(darken(Colors.grey, 0.9))}00`,
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',
  $nest: {
    '&:hover': {
      backgroundColor: `${toHex(darken(Colors.grey, 0.9))}ff !important`,
      $nest: {
        '.EditArguments': {
          display: 'block',
        },
        '.ExpandDetails': {
          display: 'block',
        },
        '.OpenerIcon': {
          opacity: `1.0 !important`,
        },
      },
    },
    '.OpenerIcon': {
      opacity: 0.0,
      transition: 'all 0.25s ease-in-out',
    },
    '.EditArguments': {
      position: 'absolute',
      display: 'none',
      width: 150,
      fontSize: 10,
      color: Colors.yellow,
      $nest: {
        '&.top': {
          left: -75,
          top: -30,
          textAlign: 'center',
        },
        '&.left': {
          left: -160,
          textAlign: 'right',
        },
        '&.bottom': {
          left: -75,
          bottom: -30,
          textAlign: 'center',
        },
        '&.right': {
          textAlign: 'left',
          right: -160,
        },
      },
    },
  },
});

export const FieldPort: React.FC<FieldPortProps> = ({
  children,
  onClick,
  open,
  info,
  icons = { closed: 'Plus', open: 'Minus' },
}) => {
  const OpenComponent = Icons[icons.open];
  const ClosedComponent = Icons[icons.closed];
  return (
    <div
      title={info?.message}
      className={`${Main} NodeFieldPort`}
      onClick={onClick}
    >
      {open ? (
        <OpenComponent className={'OpenerIcon'} height={10} width={10} />
      ) : (
        <ClosedComponent className={'OpenerIcon'} height={12} width={12} />
      )}
      {children}
    </div>
  );
};
