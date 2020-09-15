import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import panzoom, { PanZoom } from 'panzoom';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { useIO, KeyboardActions } from './IO';
export interface GrafProps {}
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

let snapLock = true;

export const Graf: React.FC<GrafProps> = () => {
  const grafRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [panRef, setPanRef] = useState<PanZoom>();

  const {
    libraryTree,
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    selectedNodeRef,
    position,
    setSnapshots,
    snapshots,
    past,
    future,
  } = useTreesState();
  useLayoutEffect(() => {
    if (grafRef.current && wrapperRef.current) {
      const instance = panzoom(grafRef.current, {
        maxZoom: 2.0,
        minZoom: 1,
        enableTextSelection: true,
        disableKeyboardInteraction: true,
        bounds: true,
        beforeMouseDown: (e) => {
          return DOM.panLock;
        },
        beforeWheel: (e) => {
          return DOM.scrollLock;
        },
        filterKey: () => {
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
            wrapperRef.current.getBoundingClientRect().left +
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
  }, [position]);

  useIO({
    on: (action) => {
      if (action === KeyboardActions.Undo) {
        const p = past();
        if (p) {
          snapLock = true;
          setTree(JSON.parse(p));
        }
      }
      if (action === KeyboardActions.Redo) {
        const f = future();
        if (f) {
          snapLock = true;
          setTree(JSON.parse(f));
        }
      }
    },
  });

  useEffect(() => {
    if (snapLock) {
      snapLock = false;
      return;
    }
    const copyTree = JSON.stringify(tree);
    if (snapshots.length === 0) {
      setSnapshots([copyTree]);
      return;
    }
    if (snapshots[snapshots.length - 1] !== copyTree) {
      setSnapshots([...snapshots, copyTree]);
    }
  }, [tree]);

  let node: ParserField | undefined;
  if (selectedNode) {
    node =
      tree.nodes.find((n) => n.name === selectedNode.name && n.data.type === selectedNode.dataType) ||
      libraryTree.nodes.find((n) => n.name === selectedNode.name && n.data.type === selectedNode.dataType);
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
        <PaintNodes blur={typeof selectedNode === 'string'} />
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
                const deletedNode = tree.nodes.findIndex((n) => n.name === node!.name)!;
                const allNodes = [...tree.nodes];
                allNodes.splice(deletedNode, 1);
                setSelectedNode(undefined);
                setTree({ nodes: allNodes });
                DOM.panLock = false;
              }}
              onDuplicate={() => {
                const allNodes = [...tree.nodes];
                allNodes.push(
                  JSON.parse(
                    JSON.stringify({
                      ...node,
                      name: node?.name + 'Copy',
                    }),
                  ),
                );
                setTree({ nodes: allNodes });
              }}
              node={node}
            />
          </div>
        )}
      </div>
    </div>
  );
};
