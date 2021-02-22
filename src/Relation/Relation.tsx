import React, { useLayoutEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useTheme,
} from '@/state/containers';
import { Colors } from '@/Colors';
import { sortByConnection } from './Algorithm';
import { Node } from './Node';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { Draw } from './Draw';
import { TypeDefinition } from 'graphql-zeus';

export interface RelationProps {}
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
const Main = style({
  width: '100%',
  position: 'relative',
  fontFamily,
  backgroundSize: `100px 100px`,
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
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
const RelationsContainer = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  stroke: Colors.main[6],
  fill: 'transparent',
});
const tRefs: Record<string, HTMLDivElement> = {};
export const Relation: React.FC<RelationProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { libraryTree, tree } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const { themed } = useTheme();
  const allNodes = tree.nodes.concat(libraryTree.nodes);
  const nodes = sortByConnection(allNodes);

  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [relations, setRelations] = useState<
    { to: HTMLDivElement; from: HTMLDivElement[] }[]
  >();

  useLayoutEffect(() => {
    if (Object.keys(refs).length === nodes.length) {
      setRelations(
        nodes
          .filter((n) => n.data.type !== TypeDefinition.EnumTypeDefinition)
          .map((n) => ({
            to: refs[n.name + n.data.type],
            from: n.args
              ?.filter((a) => !isScalarArgument(a))
              .map((a) => {
                const pn = nodes.find((nf) => nf.name === a.type.name)!;
                return refs[pn.name + pn.data.type];
              }),
          }))
          .filter((n) => n.from)
          .map((n) => n as { from: HTMLDivElement[]; to: HTMLDivElement }),
      );
    }
  }, [refs]);
  return (
    <>
      <div ref={wrapperRef} className={`${Wrapper}`}>
        <div className={Main}>
          <svg className={RelationsContainer}>
            {relations?.map((r, index) =>
              r.from?.map((rf, i) => (
                <Draw key={`${index}-${i}`} from={rf} to={r.to} />
              )),
            )}
          </svg>
          {!lockGraf &&
            nodes.map((n, i) => (
              <Node
                key={n.name + n.data.type}
                setRef={(ref) => {
                  tRefs[n.name + n.data.type] = ref;
                  if (Object.keys(tRefs).length === nodes.length) {
                    setRefs(tRefs);
                  }
                }}
                field={n}
              />
            ))}
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
            >{`Unable to parse GraphQL code. Relation editor is locked. Open "<>" code editor to correct errors in GraphQL Schema`}</div>
          </div>
        )}

        {grafErrors && (
          <div className={themed('ErrorContainer')(ErrorContainer)}>
            {grafErrors}
          </div>
        )}
      </div>
    </>
  );
};
