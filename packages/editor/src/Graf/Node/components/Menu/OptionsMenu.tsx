import React from 'react';
import { Menu } from './Menu';
import { DetailMenuItem } from './DetailMenuItem';
import styled from '@emotion/styled';

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
  color: ${({ theme, isSelected }) => (isSelected ? theme.active : 'inherit')};

  &:hover {
    color: ${({ theme }) => theme.active};

    .circle {
      background-color: ${({ theme }) => theme.active};
      border-color: ${({ theme }) => theme.active};
    }
  }

  .circle {
    background-color: ${({ theme, isSelected }) => isSelected && theme.active};
    border-color: ${({ theme, isSelected }) => isSelected && theme.active};
  }
`;

const Circle = styled.div`
  border-radius: 6px;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.text};
  transition: 0.25s background-color ease-in-out;
`;

export const OptionsMenu: React.FC<OptionsMenuProps> = ({
  children,
  options,
  onCheck,
  hideMenu,
  menuName,
  ...props
}) => {
  return (
    <Menu menuName={menuName} hideMenu={hideMenu} {...props}>
      {Object.keys(options).map((n) => {
        return (
          <DetailMenuItem key={n} onClick={() => onCheck(n)}>
            <Main isSelected={options[n]}>
              <span>{n}</span>
              <Circle className="circle" />
            </Main>
          </DetailMenuItem>
        );
      })}
    </Menu>
  );
};
