import { FieldType, Options } from 'graphql-js-tree';
import React from 'react';
// import { RELATION_CONSTANTS } from './constants';

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
  color,
  relationType,
}: {
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  color: string;
  relationType: FieldType;
}) => {
  const stroke = color;
  if (from && to) {
    const f = {
      x: from.x,
      y: from.y,
    };
    const t = {
      x: to.x,
      y: to.y,
    };
    const isArray = isArrayType(relationType);
    const fac = isArray ? 5 : 2;

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
        <g>
          <path
            stroke={stroke}
            strokeWidth={fac}
            strokeDasharray={
              relationType.type === Options.required ? undefined : '5 10'
            }
            d={`M ${t.x} ${t.y}
           Q ${bezier1.x} ${bezier1.y} ${center.x} ${center.y}
           Q ${bezier2.x} ${bezier2.y} ${f.x} ${f.y}`}
          />
          <circle
            fill={stroke}
            stroke={stroke}
            r={7}
            cx={f.x + 2}
            cy={f.y + 2}
          />
        </g>
      </>
    );
  }
  return <></>;
};

const isArrayType = (f: FieldType) =>
  f.type === Options.required
    ? f.nest.type === Options.array
    : f.type === Options.array;
