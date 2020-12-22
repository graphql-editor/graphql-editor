import React, { useRef, useState, useEffect } from 'react';
import { keyframes, style } from 'typestyle';
import { fontFamily } from '@/vars';
import panzoom, { PanZoom } from 'panzoom';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { KeyboardActions, useErrorsState, useIOState, useNavigationState, useTheme } from '@/state/containers';
import { Colors } from '@/Colors';

const unfold = keyframes({
  ['0%']: {
    flexBasis: '0%',
  },
  ['100%']: {
    flexBasis: '50%',
  },
});
export interface GrafProps {}

const Wrapper = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  position: 'relative',
  flex: 1,
  background: `#0b050d`,
  overflowY: 'auto',
  scrollbarColor: `${Colors.grey[8]} ${Colors.grey[10]}`,
});
const AnimatedWrapper = style({});
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  fontFamily,
  backgroundSize: `100px 100px`,
  backgroundImage: `linear-gradient(to right, #ffffff04 1px, transparent 1px), linear-gradient(to bottom, #ffffff04 1px, transparent 1px)`,
});
const ErrorContainer = style({
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  width: `calc(100% - 40px)`,
  padding: 20,
  margin: 20,
  borderRadius: 4,
  fontSize: 12,
  fontFamily,
  letterSpacing: 1,
});
const Focus = style({
  position: 'absolute',
  zIndex: 2,
});
const ErrorLock = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  background: `${Colors.main[9]}99`,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const ErrorLockMessage = style({
  width: `clamp(200px,50vw,500px)`,
  fontFamily,
  fontSize: 14,
  padding: 30,
  color: Colors.red[0],
  background: Colors.main[10],
});
const SubNodeContainer = style({
  animationName: unfold,
  animationTimingFunction: 'ease-in-out',
  flexBasis: '50%',
  animationDuration: '0.25s',
  background: Colors.grey[9],
  overflowY: 'auto',
  fontFamily,
  right: 0,
  top: 0,
  bottom: 0,
  scrollbarColor: `${Colors.grey[8]} ${Colors.grey[10]}`,
  overflowX: 'visible',
});
let snapLock = true;

export const Graf: React.FC<GrafProps> = () => {
  const [grafRef, setGrafRef] = useState<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [panRef, setPanRef] = useState<PanZoom>();

  const {
    libraryTree,
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    position,
    setSnapshots,
    snapshots,
    past,
    future,
    readonly,
  } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const { themed } = useTheme();
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

  useEffect(() => {
    setActions((acts) => ({
      ...acts,
      [KeyboardActions.Undo]: () => {
        const p = past();
        if (p) {
          snapLock = true;
          setTree(JSON.parse(p));
        }
      },
      [KeyboardActions.Redo]: () => {
        const f = future();
        if (f) {
          snapLock = true;
          setTree(JSON.parse(f));
        }
      },
    }));
  }, [snapshots]);

  const node = selectedNode
    ? tree.nodes.find((n) => n.name === selectedNode.name && n.data.type === selectedNode.data.type) ||
      libraryTree.nodes.find((n) => n.name === selectedNode.name && n.data.type === selectedNode.data.type)
    : undefined;
  return (
    <>
      {node && position && wrapperRef.current && (
        <div className={SubNodeContainer} onClick={() => {}}>
          <ActiveNode
            readonly={readonly}
            onDelete={(nodeToDelete) => {
              const deletedNode = tree.nodes.findIndex((n) => n.name === nodeToDelete!.name)!;
              const allNodes = [...tree.nodes];
              allNodes.splice(deletedNode, 1);
              setSelectedNode(undefined);
              setTree({ nodes: allNodes });
              DOM.panLock = false;
            }}
            onDuplicate={(nodeToDuplicate) => {
              const allNodes = [...tree.nodes];
              allNodes.push(
                JSON.parse(
                  JSON.stringify({
                    ...node,
                    name: nodeToDuplicate?.name + 'Copy',
                  }),
                ),
              );
              setTree({ nodes: allNodes });
            }}
            node={node}
          />
        </div>
      )}
      <div
        ref={wrapperRef}
        className={`${Wrapper} ${node ? AnimatedWrapper : ''}`}
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
          {!lockGraf && (
            <>
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
                ></div>
              )}
            </>
          )}
        </div>
        {lockGraf && (
          <div
            className={ErrorLock}
            onClick={() => {
              setMenuState('code-diagram');
            }}
          >
            <div
              className={ErrorLockMessage}
            >{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema`}</div>
          </div>
        )}

        {grafErrors && <div className={themed('ErrorContainer')(ErrorContainer)}>{grafErrors}</div>}
      </div>
    </>
  );
};
