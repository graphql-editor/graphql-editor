import { style } from 'typestyle';
import React from 'react';
import { Menu } from './Menu';
import { Tick } from '@Graf/icons/Tick';
import { Colors } from '@Colors';
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
});
const Circle = style({
  borderRadius: 6,
  width: 12,
  height: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `solid 1px ${Colors.grey[0]}`,
});
export const OptionsMenu: React.FC<OptionsMenuProps> = ({ children, options, onCheck, hideMenu, ...props }) => {
  return (
    <Menu hideMenu={hideMenu} {...props}>
      {Object.keys(options).map((n) => {
        return (
          <DetailMenuItem key={n} onClick={() => onCheck(n)}>
            <div className={Main}>
              <span>{n}</span>
              <div className={Circle}>{options[n] ? <Tick /> : <></>}</div>
            </div>
          </DetailMenuItem>
        );
      })}
    </Menu>
  );
};
