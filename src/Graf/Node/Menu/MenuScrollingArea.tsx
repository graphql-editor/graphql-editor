import { style } from 'typestyle';
import { Colors } from '@Colors';
import React from 'react';

const Main = style({
  color: Colors.grey[0],
  maxHeight: 200,
  overflowY: 'auto',
  scrollbarColor: `${Colors.grey[8]} ${Colors.grey[10]}`,
  scrollSnapType: 'y mandatory',
});

export const MenuScrollingArea: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, ...props }) => {
  return (
    <div className={Main} {...props}>
      {children}
    </div>
  );
};
