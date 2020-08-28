import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@vars';
import panzoom, { PanZoom } from 'panzoom';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@Graf/Node/ActiveNode';
import { useTreesState } from '@state/containers/trees';
export interface GrafProps {
  onTreeChanged: () => void;
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
export const Graf: React.FC<GrafProps> = ({ onTreeChanged }) => {
  const grafRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [panRef, setPanRef] = useState<PanZoom>();
  const [position, setPosition] = useState<{
    offsetLeft: number;
    offsetTop: number;
    width: number;
  }>();

  const { libraryTree, tree, selectedNode, setSelectedNode, selectedNodeRef } = useTreesState();
  useLayoutEffect(() => {
    if (grafRef.current) {
      const instance = panzoom(grafRef.current, {
        maxZoom: 2.0,
        minZoom: 0.5,
        enableTextSelection: true,
        disableKeyboardInteraction: true,
        beforeMouseDown: (e) => {
          return DOM.panLock;
        },
        beforeWheel: (e) => {
          return DOM.scrollLock;
        },
        filterKey: function (/* e, dx, dy, dz */) {
          return DOM.keyLock;
        },
      });
      instance.on('panstart', () => (DOM.lock = true));
      instance.on('panend', (e: any) => {
        setTimeout(() => (DOM.lock = false), 1);
      });
      setPanRef(instance);
    }
  }, [grafRef.current]);
  useEffect(() => {
    if (selectedNodeRef.current) {
      const n = selectedNodeRef.current;
      const nodePosition = n.getBoundingClientRect();
      if (nodePosition && panRef && wrapperRef.current) {
        const distanceVector = {
          x:
            -nodePosition.left +
            wrapperRef.current.offsetLeft +
            wrapperRef.current.offsetWidth / 2.0 -
            nodePosition.width / 2.0,
          y:
            -nodePosition.top +
            wrapperRef.current.offsetTop +
            wrapperRef.current.offsetHeight / 2.0 -
            nodePosition.height / 2.0,
        };
        panRef?.moveBy(distanceVector.x, distanceVector.y, true);
      }
    }
  }, [selectedNode]);
  let node: ParserField | undefined;
  if (typeof selectedNode === 'string') {
    node = tree.nodes.find((n) => n.name === selectedNode) || libraryTree.nodes.find((n) => n.name === selectedNode);
  }
  return (
    <div
      ref={wrapperRef}
      className={Wrapper}
      onClick={() => {
        if (DOM.lock) return;
        DOM.scrollLock = false;
        setSelectedNode(undefined);
      }}
    >
      <div ref={grafRef} className={Main}>
        <PaintNodes
          blur={typeof selectedNode === 'string'}
          onSelectNode={(name, pos) => {
            // hack to reset active node state on reselect
            setSelectedNode(undefined);
            setTimeout(() => {
              setSelectedNode(name);
            }, 1);

            setPosition(pos);
          }}
          onTreeChanged={onTreeChanged}
        />
        {node && position && wrapperRef.current && (
          <div
            className={Focus}
            style={{
              top: position.offsetTop - 10,
              left: position.offsetLeft - 10,
            }}
          >
            <ActiveNode
              onDelete={() => {
                tree.nodes.splice(tree.nodes.findIndex((n) => n.name === node!.name)!, 1);
                DOM.panLock = false;
                onTreeChanged();
              }}
              node={node}
              onTreeChanged={onTreeChanged}
            />
          </div>
        )}
      </div>
    </div>
  );
};
