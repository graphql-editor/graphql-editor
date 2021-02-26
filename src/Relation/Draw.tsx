import React from 'react';
import { RELATION_CONSTANTS } from './constants';
export const Draw = ({
  from,
  to,
  active,
  color,
  inActiveColor,
  PortNumber,
  maxIndex,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
  color: string;
  inActiveColor: string;
  active?: boolean;
  PortNumber: number;
  maxIndex: number;
}) => {
  const stroke = active ? color : `${inActiveColor}22`;
  if (from && to) {
    const pos = 75 + PortNumber * 30;
    const f = {
      x: from.offsetLeft,
      y: from.offsetTop,
    };
    const t = {
      x: to.offsetLeft + to.clientWidth,
      y: to.offsetTop + pos,
    };
    const gapSize = PortNumber * RELATION_CONSTANTS.PORT_GAP;
    const portRight = t.x + RELATION_CONSTANTS.PORT_PADDING + gapSize;
    const topOffset = to.offsetTop - RELATION_CONSTANTS.PORT_PADDING - gapSize;
    const bottomOffset =
      to.offsetTop +
      to.clientHeight +
      RELATION_CONSTANTS.PORT_PADDING +
      gapSize;
    const yOffset = t.y < f.y ? bottomOffset : topOffset;
    const bFX = f.x + RELATION_CONSTANTS.PORT_PADDING + gapSize;
    return (
      <path
        stroke={stroke}
        d={`M ${t.x} ${t.y}
            L ${portRight} ${t.y}
            L ${portRight} ${yOffset}
            L ${bFX} ${yOffset}
            L ${bFX} ${f.y}`}
      />
    );
  }
  return <></>;
};
