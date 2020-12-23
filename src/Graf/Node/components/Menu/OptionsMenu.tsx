import { style } from 'typestyle';
import React from 'react';
import { Menu } from './Menu';
import { Colors } from '@/Colors';
import { DetailMenuItem } from './DetailMenuItem';

interface OptionsMenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  options: Record<string, boolean>;
  onCheck: (name: string) => void;
  hideMenu: () => void;
}

const Main = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  $nest: {
    '&.Selected': {
      color: Colors.green[0],
    },
    '&:hover': {
      color: Colors.green[0],
      $nest: {
        '.Circle': {
          background: Colors.green[0],
          borderColor: Colors.green[0],
        },
      },
    },
  },
});
const Circle = style({
  borderRadius: 6,
  width: 12,
  height: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `solid 1px`,
  position: 'relative',
  borderColor: Colors.grey[0],
  transition: '.25s background ease-in-out',
  $nest: {
    '&.Selected': {
      borderColor: Colors.green[0],
      background: Colors.green[0],
    },
  },
});
export const OptionsMenu: React.FC<OptionsMenuProps> = ({ children, options, onCheck, hideMenu, ...props }) => {
  return (
    <Menu hideMenu={hideMenu} {...props}>
      {Object.keys(options).map((n) => {
        return (
          <DetailMenuItem key={n} onClick={() => onCheck(n)}>
            <div className={`${Main} ${options[n] ? 'Selected' : ''}`}>
              <span>{n}</span>
              <div className={`${Circle} Circle ${options[n] ? 'Selected' : ''}`}></div>
            </div>
          </DetailMenuItem>
        );
      })}
    </Menu>
  );
};
