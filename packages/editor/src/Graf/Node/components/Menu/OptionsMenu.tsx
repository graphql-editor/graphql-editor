import React from 'react';
import { Menu } from './Menu';
import { DetailMenuItem } from './DetailMenuItem';
import styled from '@emotion/styled';
import { Radio } from '@aexol-studio/styling-system';

interface OptionsMenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  options: Record<string, boolean>;
  onCheck: (name: string) => void;
  hideMenu: () => void;
  menuName: string;
}

const Main = styled.div<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const OptionsMenu = React.forwardRef<HTMLDivElement, OptionsMenuProps>(
  ({ children, options, onCheck, hideMenu, menuName, ...props }, ref) => {
    return (
      <Menu menuName={menuName} hideMenu={hideMenu} {...props} ref={ref}>
        {Object.keys(options).map((n) => {
          return (
            <DetailMenuItem key={n} onClick={() => onCheck(n)}>
              <Main isSelected={options[n]}>
                <Radio label={n} position="end" checked={options[n]} />
              </Main>
            </DetailMenuItem>
          );
        })}
      </Menu>
    );
  },
);
