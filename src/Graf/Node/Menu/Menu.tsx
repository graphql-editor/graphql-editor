import { style } from 'typestyle';
import { Colors } from '@Colors';
import React from 'react';
const Triangle = style({
  width: 0,
  height: 0,
  borderLeft: `10px solid transparent`,
  borderRight: `10px solid transparent`,
  borderBottom: `15px solid ${Colors.grey[10]}`,
  margin: 'auto',
  marginBottom: -1,
});

const Wrapper = style({
  position: 'absolute',
  zIndex: 4,
  top: 30,
  width: 180,
  borderRadius: 4,
});
const Content = style({
  background: Colors.grey[10],
  borderRadius: 4,
});

export const Menu: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className={Wrapper}>
      <div className={Triangle} />
      <div className={Content}>{children}</div>
    </div>
  );
};
