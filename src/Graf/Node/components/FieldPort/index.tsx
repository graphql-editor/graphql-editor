import { Colors } from '@/Colors';
import * as Icons from '@/Graf/icons';
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
  width: 18,
  height: 18,
  borderRadius: 2,
  fontSize: 7,
  margin: `0 4px`,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: `${Colors.grey[9]}00`,
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',
  $nest: {
    '&:hover': {
      backgroundColor: `${Colors.grey[9]}ff !important`,
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
      color: Colors.yellow[0],
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
    <div className={`${Main} NodeFieldPort`} onClick={onClick}>
      {!open && info && <div className={`EditArguments ${info.placement}`}>{info.message}</div>}
      {open ? (
        <OpenComponent className={'OpenerIcon'} height={6} width={6} />
      ) : (
        <ClosedComponent className={'OpenerIcon'} height={8} width={8} />
      )}
      {children}
    </div>
  );
};
