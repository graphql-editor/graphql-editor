import { style } from 'typestyle';
import { Colors } from '@/Colors';
import React from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Main = themed(
  ({
    colors: {
      graf: {
        node: {
          menu: {
            scrollbar: { inner, outer },
          },
        },
      },
    },
  }) =>
    style({
      color: Colors.grey,
      maxHeight: 200,
      overflowY: 'auto',
      scrollbarColor: `${inner} ${outer}`,
      scrollSnapType: 'y mandatory',
    }),
);

export const MenuScrollingArea: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, ...props }) => {
  const { theme } = useTheme();
  return (
    <div className={Main(theme)} {...props}>
      {children}
    </div>
  );
};
