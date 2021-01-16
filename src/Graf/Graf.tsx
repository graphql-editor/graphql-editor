import React, { useRef, useEffect } from 'react';
import { keyframes, style } from 'typestyle';
import { fontFamily } from '@/vars';
import { DOM } from './DOM';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { KeyboardActions, useErrorsState, useIOState, useNavigationState, useTheme } from '@/state/containers';
import { Colors } from '@/Colors';

const unfold = keyframes({
  ['0%']: {
    maxWidth: '0%',
  },
  ['100%']: {
    maxWidth: '60%',
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
  width: `clamp(200px, 50vw, 500px)`,
  fontFamily,
  fontSize: 14,
  padding: 30,
  color: Colors.red[0],
  background: Colors.main[10],
});
const SubNodeContainer = style({
  animationName: unfold,
  animationTimingFunction: 'ease-in-out',
  width: 'clamp(400px, 40%, 1280px)',
  animationDuration: '0.25s',
  background: Colors.grey[9],
  fontFamily,
  right: 0,
  top: 0,
  bottom: 0,
  scrollbarColor: `${Colors.grey[8]} ${Colors.grey[10]}`,
  transition: `max-width 0.25s ease-in-out`,
});
let snapLock = true;

export const Graf: React.FC<GrafProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    libraryTree,
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
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
      {node && wrapperRef.current && (
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
        onClick={() => {
          if (DOM.lock) return;
          DOM.scrollLock = false;
          setSelectedNode(undefined);
        }}
      >
        <div className={Main}>{!lockGraf && <PaintNodes />}</div>
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
