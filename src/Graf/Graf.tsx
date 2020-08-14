import React, { useRef, useLayoutEffect } from 'react';
import { ParserTree } from 'graphql-zeus';
import { Node } from './Node';
import { style } from 'typestyle';
import { fontFamily } from '@vars';
import { FIELD_HEIGHT } from './constants';
import panzoom from 'panzoom';
export interface GrafProps {
  tree: ParserTree;
  onFocus: () => void;
  onBlur: () => void;
}
const Wrapper = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  background: '#191919',
});
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  columnCount: 3,
  background: '#191919',
  fontFamily,
});
export const Graf: React.FC<GrafProps> = ({ tree, onFocus, onBlur }) => {
  const area = tree.nodes.map((n) => FIELD_HEIGHT * (n.args?.length || 1)).reduce((a, b) => a + b, 0) * 500;
  const wArea = window.innerHeight * window.innerWidth;
  const totalArea = Math.max(area / wArea, 1);
  const grafRef = useRef<HTMLDivElement>();
  const height = Math.floor(Math.sqrt(totalArea) * 100);
  useLayoutEffect(() => {
    if (grafRef.current) {
      panzoom(grafRef.current, {
        maxZoom: 2.0,
        minZoom: 0.5,
      });
    }
  }, [grafRef.current]);
  return (
    <div className={Wrapper}>
      <div
        ref={grafRef as any}
        className={Main}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          height: `${height}%`,
        }}
      >
        {tree.nodes.map((n) => (
          <Node nodes={tree.nodes} key={n.name} node={n} />
        ))}
      </div>
    </div>
  );
};
