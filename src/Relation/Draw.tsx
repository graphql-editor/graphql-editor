import { Colors } from '@/Colors';
import React from 'react';
import { style } from 'typestyle';
import { RELATION_CONSTANTS } from './constants';

const PathClass = style({
  pointerEvents: 'auto',
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      stroke: Colors.grey[0],
    },
  },
});

export const Draw = ({
  from,
  to,
  active,
  inverse,
  color,
  inActiveColor,
  PortNumber,
  maxIndex,
  onClick,
}: {
  from?: HTMLDivElement;
  to?: HTMLDivElement;
  color: string;
  inActiveColor: string;
  active?: boolean;
  inverse?: boolean;
  PortNumber: number;
  maxIndex: number;
  onClick: () => void;
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
        className={`${active ? PathClass : ''}`}
        onClick={(e) => {
          if (active) {
            e.stopPropagation();
            onClick();
          }
        }}
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