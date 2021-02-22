import React from 'react';
export const Draw = ({
  from,
  to,
  active,
  color,
  PortNumber,
  maxIndex,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
  color: string;
  active?: boolean;
  PortNumber: number;
  maxIndex: number;
}) => {
  if (from && to) {
    const ltr = from.offsetLeft > to.offsetLeft;
    const pos = (-maxIndex / 2.0 + PortNumber + 1) * 10;
    const f = {
      x: ltr ? from.offsetLeft : from.offsetLeft + from.clientWidth,
      y: from.offsetTop + from.clientHeight / 2.0 + pos,
    };
    const t = {
      x: ltr ? to.offsetLeft + to.clientWidth : to.offsetLeft,
      y: to.offsetTop + to.clientHeight / 2.0 + pos,
    };
    const center = {
      x: (t.x + f.x) / 2.0 + pos,
      y: (t.y + f.y) / 2.0,
    };

    return (
      <path
        stroke={active ? color : `${color}22`}
        d={`M ${t.x} ${t.y} L ${center.x} ${t.y} L ${center.x} ${f.y} L ${f.x} ${f.y} `}
      />
    );
  }
  return <></>;
};
