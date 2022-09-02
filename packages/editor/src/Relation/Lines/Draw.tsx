import React from 'react';
import { RELATION_CONSTANTS } from './constants';

export const Draw = ({
  from,
  to,
  active,
  inverse,
  color,
  inActiveColor,
  PortNumber,
  maxIndex,
  hasSearch,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
  color: string;
  inActiveColor: string;
  active?: boolean;
  inverse?: boolean;
  hasSearch?: boolean;
  PortNumber: number;
  maxIndex: number;
}) => {
  const stroke = active ? color : `${inActiveColor}10`;
  if (from && to) {
    let pos =
      RELATION_CONSTANTS.TOP_HEIGHT +
      PortNumber * RELATION_CONSTANTS.FIELD_HEIGHT +
      RELATION_CONSTANTS.FIELD_HEIGHT / 2;
    if (hasSearch) {
      pos = pos + RELATION_CONSTANTS.SEARCHBAR_HEIGHT;
    }
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
        strokeDasharray={inverse ? '5,5' : undefined}
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
