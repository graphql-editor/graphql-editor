import React from 'react';
let PortNumber = 0;
export const Draw = ({
  from,
  to,
  active,
  color,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
  color: string;
  active?: boolean;
}) => {
  if (from && to) {
    const f = {
      x: from.offsetLeft,
      y: from.offsetTop + from.clientHeight / 2.0 + PortNumber,
    };
    const t = {
      x: to.offsetLeft + to.clientWidth,
      y: to.offsetTop + to.clientHeight / 2.0 + PortNumber,
    };
    const center = {
      x: (t.x + f.x) / 2.0 + PortNumber,
      y: (t.y + f.y) / 2.0,
    };
    PortNumber = (PortNumber + 5) % 25;

    return (
      <path
        stroke={active ? color : `${color}33`}
        d={`M ${t.x} ${t.y} L ${center.x} ${t.y} L ${center.x} ${f.y} L ${f.x} ${f.y} `}
      />
    );
  }
  return <></>;
};
