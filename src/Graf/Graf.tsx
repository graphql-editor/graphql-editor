import React, { useRef, useState, useEffect } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import panzoom, { PanZoom } from 'panzoom';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { useIO, KeyboardActions } from './IO';
export interface GrafProps {
  readonly?: boolean;
}
const Wrapper = style({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  background: `#0b050d`,
});
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  fontFamily,
  backgroundSize: `100px 100px`,
  backgroundImage: `linear-gradient(to right, #ffffff04 1px, transparent 1px), linear-gradient(to bottom, #ffffff04 1px, transparent 1px)`,
});
const Focus = style({
  position: 'absolute',
});

let snapLock = true;

export const Graf: React.FC<GrafProps> = ({ readonly }) => {
  const [grafRef, setGrafRef] = useState<HTMLDivElement | null>(null);
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
  useEffect(() => {
    if (grafRef && wrapperRef.current && !panRef) {
      const instance = panzoom(grafRef, {
        maxZoom: 1,
        minZoom: 1,
        enableTextSelection: true,
        disableKeyboardInteraction: true,
        zoomDoubleClickSpeed: 1,
        beforeMouseDown: (e) => {
          return DOM.panLock;
        },
        beforeWheel: (e) => {
          return true;
        },
        filterKey: () => {
          return DOM.keyLock;
        },

        onDoubleClick: (e) => {
          return false;
        },
      });
      instance.on('panstart', () => (DOM.lock = true));
      instance.on('panend', (e: any) => {
        setTimeout(() => (DOM.lock = false), 1);
      });
      instance.on('zoomstart', () => (DOM.lock = true));
      instance.on('zoomend', (e: any) => {
        setTimeout(() => (DOM.lock = false), 1);
      });
      setPanRef(instance);
    }
    if (!grafRef) {
      panRef?.dispose();
    }
    return () => {
      panRef?.dispose();
      setPanRef(undefined);
    };
  }, [grafRef]);
  useEffect(() => {
    if (selectedNodeRef.current) {
      const n = selectedNodeRef.current;
      const nodePosition = n.getBoundingClientRect();
      wrapperRef.current?.scrollTo({
        top: nodePosition.top + (wrapperRef.current?.scrollTop || 0) - wrapperRef.current.offsetHeight / 4.0,
        behavior: 'smooth',
      });
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
        distanceVector;
        // panRef?.moveBy(distanceVector.x, distanceVector.y, true);
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
      style={{
        cursor: grafRef ? 'grab' : 'auto',
      }}
      onClick={() => {
        if (DOM.lock) return;
        DOM.scrollLock = false;
        setSelectedNode(undefined);
      }}
    >
      <div className={Main}>
        <PaintNodes />
        {node && position && wrapperRef.current && (
          <div
            className={Focus}
            ref={(r) => {
              setGrafRef(r);
            }}
            style={{
              top: position.offsetTop - 10,
              left: position.offsetLeft - 10,
            }}
          >
            <ActiveNode
              readonly={readonly}
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
