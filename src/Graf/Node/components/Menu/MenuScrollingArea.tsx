import { style } from 'typestyle';
import React from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Main = themed(
  ({
    colors: {
      text,
      background: { mainFurthest, mainClose },
    },
  }) =>
    style({
      color: text,
      maxHeight: 200,
      overflowY: 'auto',
      scrollbarColor: `${mainClose} ${mainFurthest}`,
      scrollSnapType: 'y mandatory',
    }),
);

export const MenuScrollingArea: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  const { theme } = useTheme();
  return (
    <div className={Main(theme)} {...props}>
      {children}
    </div>
  );
};
