import React from 'react';
import { style } from 'typestyle';

const Main = style({
  fontSize: 10,
  display: 'flex',
  flex: 1,
  alignItems: 'baseline',
  overflow: 'hidden',
  marginRight: 10,
});

export const Title: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={[Main, className].join(' ')} {...props}>
      {children}
    </div>
  );
};
