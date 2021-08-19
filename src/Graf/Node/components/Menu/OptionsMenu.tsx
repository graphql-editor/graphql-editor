import { style } from 'typestyle';
import React from 'react';
import { Menu } from './Menu';
import { DetailMenuItem } from './DetailMenuItem';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

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

const Main = themed(({ success }) =>
  style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    $nest: {
      '&.Selected': {
        color: success,
      },
      '&:hover': {
        color: success,
        $nest: {
          '.Circle': {
            background: success,
            borderColor: success,
          },
        },
      },
    },
  }),
);
const Circle = themed(({ text, success }) =>
  style({
    borderRadius: 6,
    width: 12,
    height: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px`,
    position: 'relative',
    borderColor: text,
    transition: '.25s background ease-in-out',
    $nest: {
      '&.Selected': {
        borderColor: success,
        background: success,
      },
    },
  }),
);
export const OptionsMenu: React.FC<OptionsMenuProps> = ({
  children,
  options,
  onCheck,
  hideMenu,
  menuName,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <Menu menuName={menuName} hideMenu={hideMenu} {...props}>
      {Object.keys(options).map((n) => {
        return (
          <DetailMenuItem key={n} onClick={() => onCheck(n)}>
            <div className={`${Main(theme)} ${options[n] ? 'Selected' : ''}`}>
              <span>{n}</span>
              <div
                className={`${Circle(theme)} Circle ${
                  options[n] ? 'Selected' : ''
                }`}
              ></div>
            </div>
          </DetailMenuItem>
        );
      })}
    </Menu>
  );
};
