import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { transition } from "@/vars";
import styled from "@emotion/styled";
import { FieldType, Options } from "graphql-js-tree";
import React, { useMemo } from "react";

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
  isPrintPreviewActive,
  optimized,
}: {
  from?: { x: number; y: number; id: string };
  to?: { x: number; y: number; id: string };
  color: string;
  relationType: FieldType;
  isPrintPreviewActive: boolean;
  optimized?: boolean;
}) => {
  const stroke = color;
  const fac = useMemo(() => {
    if (
      relationType.type === Options.name &&
      relationType.name === "refInterface"
    ) {
      return 1;
    }
    if (relationType.type === Options.required) {
      return 2;
    }
    return 1;
  }, [relationType]);

  if (from && to) {
    const f = {
      x: from.x,
      y: from.y,
    };
    const t = {
      x: to.x,
      y: to.y,
    };

    const upDown = f.y > t.y;
    const center = {
      x: (t.x + f.x) / 2.0,
      y: (t.y + f.y) / 2.0,
    };
    const maxBezier = 600.0;
    const bezierWeight = Math.min(
      0.9,
      Math.max(-0.15, (maxBezier - Math.abs(f.y - t.y)) / maxBezier)
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
      bezierWeight
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
      bezierWeight
    );
    const PathComponent = optimized ? OptimizedPathG : PathG;

    return (
      <PathComponent
        data-from={from.id}
        data-to={to.id}
        className={`${DOMClassNames.nodeConnection} inViewport`}
        isPrintPreviewActive={isPrintPreviewActive}
      >
        <path
          stroke={stroke}
          strokeWidth={fac}
          d={`M ${t.x} ${t.y}
           Q ${bezier1.x} ${bezier1.y} ${center.x} ${center.y}
           Q ${bezier2.x} ${bezier2.y} ${f.x} ${f.y}`}
        />
      </PathComponent>
    );
  }
  return <></>;
};

const PathG = styled.g<{ isPrintPreviewActive: boolean }>`
  opacity: ${({ isPrintPreviewActive }) => (isPrintPreviewActive ? 1 : 0)};
  transition: ${transition};
  &.inViewport {
    opacity: 1;
    &.selection {
      opacity: ${({ isPrintPreviewActive }) => (isPrintPreviewActive ? 1 : 0)};
    }
  }
  &.selection {
    &.${DOMClassNames.active} {
      opacity: 1;
    }
  }
`;

const OptimizedPathG = styled.g<{ isPrintPreviewActive: boolean }>`
  visibility: ${({ isPrintPreviewActive }) =>
    isPrintPreviewActive ? "visible" : "hidden"};
  transition: ${transition};
  &.inViewport {
    visibility: visible;
    &.selection {
      visibility: ${({ isPrintPreviewActive }) =>
        isPrintPreviewActive ? "visible" : "hidden"};
    }
  }
  &.selection {
    &.${DOMClassNames.active} {
      visibility: visible;
    }
  }
`;
