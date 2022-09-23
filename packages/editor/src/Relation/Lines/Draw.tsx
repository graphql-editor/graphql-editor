import React from 'react';
import { RELATION_CONSTANTS } from './constants';

interface Point {
  x: number;
  y: number;
}

const interpolate = (p1: Point, p2: Point, weight: number) => {
  const distance = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  };
  return {
    x: p1.x + distance.x * weight,
    y: p1.y + distance.y * weight,
  };
};

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
  relationNumber,
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
  relationNumber: number;
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
    const upDown = f.y > t.y;
    const center = {
      x: (t.x + f.x) / 2.0,
      y: (t.y + f.y) / 2.0,
    };
    const maxBezier = 600.0;
    const bezierWeight = Math.min(
      0.9,
      Math.max(-0.15, (maxBezier - Math.abs(f.y - t.y)) / maxBezier),
    );

    const bezierPoint1 = {
      x: (t.x + center.x) / 2.0,
      y: (t.y + center.y) / 2.0,
    };
    const bezier1 = interpolate(
      upDown
        ? {
            x: t.x,
            y: center.y,
          }
        : {
            x: center.x,
            y: t.y,
          },
      bezierPoint1,
      bezierWeight,
    );
    const bezierPoint2 = {
      x: (f.x + center.x) / 2.0,
      y: (f.y + center.y) / 2.0,
    };
    const bezier2 = interpolate(
      upDown
        ? {
            x: f.x,
            y: center.y,
          }
        : {
            x: center.x,
            y: f.y,
          },
      bezierPoint2,
      bezierWeight,
    );

    return (
      <>
        <path
          stroke={stroke}
          strokeDasharray={inverse ? '5,5' : undefined}
          d={`M ${t.x} ${t.y}
           Q ${bezier1.x} ${bezier1.y} ${center.x} ${center.y}
           Q ${bezier2.x} ${bezier2.y} ${f.x} ${f.y}`}
        />
        <circle fill={stroke} stroke={stroke} r={7} cx={f.x + 2} cy={f.y + 2} />
      </>
    );
  }
  return <></>;
};
