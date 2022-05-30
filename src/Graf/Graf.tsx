import React, { useRef, useEffect } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
  useNavigationState,
  useTheme,
} from '@/state/containers';
import { themed } from '@/Theming/utils';
import { darken, toHex } from 'color2k';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { ErrorLock } from '@/shared/components';
import { getScalarFields } from '@/Graf/utils/getScalarFields';
import { findInNodes } from '@/compare/compareNodes';

export interface GrafProps {}

const Wrapper = themed(({ background: { mainClose, mainFurthest, mainFar } }) =>
  style({
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    position: 'relative',
    flex: 1,
    background: mainFar,
    overflowY: 'auto',
    scrollbarColor: `${mainClose} ${mainFurthest}`,
  }),
);
const AnimatedWrapper = style({});
const Main = themed(() =>
  style({
    width: '100%',
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
    fontFamily,
  }),
);
const ErrorContainer = themed(({ error, hover }) =>
  style({
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
    color: hover,
    background: `${toHex(darken(error, 0.6))}ee`,
    border: `1px solid ${error}`,
  }),
);
const SubNodeContainer = themed(
  ({ background: { mainClose, mainFurther, mainCloser } }) =>
    style({
      width: 'min(clamp(400px, 40%, 1280px), calc(100vw - 50px))',
      background: mainFurther,
      fontFamily,
      right: 0,
      top: 0,
      bottom: 0,
      scrollbarColor: `${mainCloser} ${mainClose}`,
      transition: `max-width 0.25s ease-in-out`,
    }),
);
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
    scalars,
  } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const { theme } = useTheme();

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
    ? findInNodes(tree.nodes, selectedNode) ||
      findInNodes(libraryTree.nodes, selectedNode)
    : undefined;

  return (
    <>
      {node && wrapperRef.current && (
        <div className={SubNodeContainer(theme)} onClick={() => {}}>
          <ActiveNode
            readonly={readonly}
            onDelete={(nodeToDelete) => {
              const deletedNode = tree.nodes.findIndex(
                (n) => n === nodeToDelete,
              )!;
              const allNodes = [...tree.nodes];
              allNodes.splice(deletedNode, 1);
              setSelectedNode(undefined);
              setTree({ nodes: allNodes });
            }}
            onDuplicate={(nodeToDuplicate) => {
              const allNodes = [...tree.nodes];
              const duplicatedNode = JSON.parse(
                JSON.stringify({
                  ...node,
                  name: nodeToDuplicate?.name + 'Copy',
                }),
              );
              allNodes.push(duplicatedNode);
              setSelectedNode(duplicatedNode);
              setTree({ nodes: allNodes });
            }}
            onInputCreate={(nodeToCreateInput) => {
              const allNodes = [...tree.nodes];
              const createdInput = JSON.parse(
                JSON.stringify({
                  ...node,
                  args: getScalarFields(node, scalars),
                  interfaces: [],
                  directives: [],
                  type: { name: 'input' },
                  data: { type: 'InputObjectTypeDefinition' },
                  name: nodeToCreateInput.name + 'Input',
                }),
              );
              allNodes.push(createdInput);
              setSelectedNode(createdInput);
              setTree({ nodes: allNodes });
            }}
            node={node}
          />
        </div>
      )}
      <div
        ref={wrapperRef}
        className={`${Wrapper(theme)} ${node ? AnimatedWrapper : ''}`}
        onClick={() => {
          setSelectedNode(undefined);
        }}
        data-cy={GraphQLEditorDomStructure.tree.elements.Graf.name}
      >
        <div className={Main(theme)}>{!lockGraf && <PaintNodes />}</div>
        {lockGraf && (
          <ErrorLock
            onClick={() => {
              setMenuState((ms) => ({ ...ms, code: true }));
            }}
          >
            {`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:\n${lockGraf}`}
          </ErrorLock>
        )}
        {grafErrors && (
          <div className={ErrorContainer(theme)}>{grafErrors}</div>
        )}
      </div>
    </>
  );
};
