import React from 'react';

export const Draw = ({
  from,
  to,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
}) => {
  if (from && to) {
    const f = {
      x: from.offsetLeft + from.clientWidth / 2.0,
      y: from.offsetTop + from.clientHeight / 2.0,
    };
    const t = {
      x: to.offsetLeft + to.clientWidth / 2.0,
      y: to.offsetTop + to.clientHeight / 2.0,
    };
    const center = {
      x: (t.x + f.x) / 2.0,
      y: (t.y + f.y) / 2.0,
    };

    return (
      <path
        d={`M ${t.x} ${t.y} Q ${(center.x + t.x) / 2.0} ${
          (center.y + t.y) / 2.2
        }, ${center.x} ${center.y} T ${f.x} ${f.y} `}
      />
    );
  }
  return <></>;
};
