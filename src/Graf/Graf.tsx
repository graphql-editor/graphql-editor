import React, { useRef, useLayoutEffect, useState } from 'react';
import { ParserTree } from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@vars';
import panzoom from 'panzoom';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from './Node/ActiveNode';
export interface GrafProps {
  tree: ParserTree;
  onSelectNode: (name: string) => void;
  deselect: () => void;
  onTreeChanged: () => void;
  selectedNode?: string;
}
const Wrapper = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  background: '#191919',
});
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  background: '#191919',
  fontFamily,
});
const Focus = style({
  position: 'absolute',
});
export const Graf: React.FC<GrafProps> = ({ tree, selectedNode, deselect, onSelectNode, onTreeChanged }) => {
  const grafRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    offsetLeft: number;
    offsetTop: number;
    width: number;
  }>();
  useLayoutEffect(() => {
    if (grafRef.current) {
      const instance = panzoom(grafRef.current, {
        maxZoom: 2.0,
        minZoom: 0.5,
        beforeMouseDown: (e) => {
          return DOM.panLock;
        },
      });
      instance.on('panstart', () => (DOM.lock = true));
      instance.on('panend', (e: any) => {
        setTimeout(() => (DOM.lock = false), 1);
      });
    }
  }, [grafRef.current]);
  console.log('RERERNDER');
  return (
    <div
      ref={wrapperRef}
      className={Wrapper}
      onClick={() => {
        if (DOM.lock) return;
        deselect();
      }}
    >
      <div ref={grafRef} className={Main}>
        <PaintNodes
          blur={typeof selectedNode === 'string'}
          onSelectNode={(name, pos) => {
            // hack to reset active node state on reselect
            deselect();
            setTimeout(() => {
              onSelectNode(name);
            }, 1);

            setPosition(pos);
          }}
          onTreeChanged={onTreeChanged}
          tree={tree}
        />
        {typeof selectedNode === 'string' &&
          position &&
          wrapperRef.current &&
          !!tree.nodes.find((n) => n.name === selectedNode) && (
            <div
              className={Focus}
              style={{
                top: position.offsetTop - 10,
                left: position.offsetLeft - 10,
              }}
            >
              <ActiveNode
                isSelected={true}
                node={tree.nodes.find((n) => n.name === selectedNode)!}
                nodes={tree.nodes}
                onTreeChanged={onTreeChanged}
              />
            </div>
          )}
      </div>
    </div>
  );
};
