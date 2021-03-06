import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
  useNavigationState,
  useTheme,
} from '@/state/containers';
import { Colors } from '@/Colors';
import { sortByConnection } from './Algorithm';
import { Node } from './Node';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { Draw } from './Draw';
import { ParserField } from 'graphql-zeus';
import { GraphQLBackgrounds, GraphQLColors } from '@/editor/theme';
import { Search } from '@/Graf/icons';
import { LevenshteinDistance } from '@/search';

export interface RelationProps {}
interface RelationPath {
  htmlNode: HTMLDivElement;
  field: ParserField;
}
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
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
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
  strokeWidth: 2,
});
const SearchContainer = style({
  position: 'fixed',
  bottom: 10,
  left: 10,
  zIndex: 200,
});
const SearchIcon = style({
  position: 'absolute',
  bottom: 8,
  left: 6,
  zIndex: 200,
});
const SearchInput = style({
  background: `${Colors.main[0]}52`,
  color: Colors.grey[0],
  border: 0,
  width: '100%',
  minWidth: 0,
  height: 36,
  padding: `0 12px`,
  paddingLeft: 28,
  fontSize: 14,
  outline: 0,
  position: 'relative',
  userSelect: 'none',
  $nest: {
    '&::placeholder': {
      color: Colors.grey[4],
    },
  },
});

const tRefs: Record<string, HTMLDivElement> = {};
export const Relation: React.FC<RelationProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focusedNode, setFocusedNode] = useState<ParserField>();
  const { libraryTree, tree, selectedNode, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { menuState, setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const { themed } = useTheme();
  const [currentNodes, setCurrentNodes] = useState<ParserField[]>(
    sortByConnection(tree.nodes.concat(libraryTree.nodes)),
  );
  const [relationDrawingNodes, setRelationDrawingNodes] = useState<
    ParserField[]
  >([]);
  const [scrollBeforeFocus, setScrollBeforeFocus] = useState(0);

  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [relations, setRelations] = useState<
    { to: RelationPath; from: RelationPath[] }[]
  >();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!focusedNode) {
      setTimeout(() => {
        wrapperRef.current?.parentElement?.scrollTo({ top: scrollBeforeFocus });
      }, 10);
      return;
    }
  }, [focusedNode]);
  useEffect(() => {
    if (focusedNode) {
      setScrollBeforeFocus(wrapperRef.current?.parentElement?.scrollTop || 0);
      const relatedNodes = currentNodes.filter(
        (n) =>
          n.args?.find((a) => a.type.name === focusedNode.name) ||
          n === focusedNode ||
          focusedNode.args?.find((a) => a.type.name === n.name),
      );
      const focusedNodeIndex = currentNodes.findIndex((n) => n === focusedNode);
      const sortedCurrentNodes = currentNodes.sort((a, b) => {
        if (b === focusedNode || a === focusedNode) {
          return 0;
        }
        const aIsRelated = relatedNodes.includes(a);
        const bIsRelated = relatedNodes.includes(b);
        const siblings = +aIsRelated === +bIsRelated;
        if (siblings) {
          return 0;
        }
        const bIndex = currentNodes.findIndex((cn) => cn === b);
        if (bIndex > focusedNodeIndex) {
          return +aIsRelated > +bIsRelated ? -1 : 1;
        } else {
          return +aIsRelated > +bIsRelated ? 1 : -1;
        }
      });
      setCurrentNodes(sortedCurrentNodes);
      setRelationDrawingNodes(relatedNodes);
    } else {
      setRelationDrawingNodes(currentNodes);
    }
  }, [focusedNode]);

  useLayoutEffect(() => {
    if (Object.keys(refs).length > 0) {
      setRelations(
        relationDrawingNodes
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            from: n.args
              ?.filter((a) => !isScalarArgument(a))
              .map((a) => {
                const pn = relationDrawingNodes.find(
                  (nf) => nf.name === a.type.name,
                );
                if (!pn) {
                  return;
                }
                return { htmlNode: refs[pn.name + pn.data.type], field: pn };
              })
              .filter((o) => !!o),
          }))
          .filter((n) => n.from)
          .map((n) => n as { from: RelationPath[]; to: RelationPath }),
      );
    }
  }, [refs, relationDrawingNodes]);
  useEffect(() => {
    if (focusedNode) {
      setFocusedNode(undefined);
    }
    if (selectedNode) {
      const ref = tRefs[selectedNode.name + selectedNode.data.type];
      ref.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
      return;
    }
  }, [selectedNode]);

  const handleSearch = (searchValue: string) => {
    if (searchValue.length) {
      const [node] = currentNodes
        .map((n) => ({
          distance: LevenshteinDistance(
            searchValue.toLocaleLowerCase(),
            n.name.toLocaleLowerCase(),
          ),
          n,
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
        .map(({ n }) => n);
      setSelectedNode(node);
    } else {
      setSelectedNode(undefined);
    }
  };

  useEffect(() => {
    setActions((acts) => ({
      ...acts,
      [KeyboardActions.FindRelation]: () => {
        if (menuState === 'relation') {
          setSearchVisible(!searchVisible);
        }
      },
    }));

    return () => {
      setActions((acts) => ({
        ...acts,
        [KeyboardActions.FindRelation]: () => {},
      }));
    };
  }, [searchVisible]);

  return (
    <>
      <div className={`${Wrapper}`}>
        <div className={SearchContainer}>
          <Search
            width={18}
            height={18}
            className={SearchIcon}
            onClick={() => {
              console.log(!searchVisible);
              setSearchVisible(!searchVisible);
            }}
          />
          {searchVisible && (
            <input
              autoFocus={true}
              className={SearchInput}
              placeholder="Search..."
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchVisible(false);
                  setSelectedNode(undefined);
                }
              }}
            />
          )}
        </div>
        <div
          className={Main}
          onClick={() => {
            setSearchVisible(false);
            setSelectedNode(undefined);
          }}
          ref={wrapperRef}
        >
          <svg className={RelationsContainer}>
            {selectedNode &&
              relations?.map((r, index) =>
                r.from?.map((rf, i) => {
                  const fromField = selectedNode?.name === rf.field.name;
                  const toField = r.to.field.name === selectedNode?.name;
                  return (
                    <Draw
                      active={fromField || toField}
                      inverse={fromField}
                      color={GraphQLColors[rf.field.type.name]}
                      inActiveColor={GraphQLBackgrounds[rf.field.type.name]}
                      key={`${index}-${i}`}
                      from={rf.htmlNode}
                      to={r.to.htmlNode}
                      PortNumber={i}
                      maxIndex={r.from.length}
                      onClick={() =>
                        toField
                          ? setSelectedNode(rf.field)
                          : setSelectedNode(r.to.field)
                      }
                    />
                  );
                }),
              )}
          </svg>
          {!lockGraf &&
            currentNodes.map((n, i) => (
              <Node
                focus={() => {
                  setFocusedNode(n);
                }}
                fade={
                  selectedNode
                    ? selectedNode.name === n.name
                      ? false
                      : selectedNode.args?.find((a) => a.type.name === n.name)
                      ? false
                      : n.args?.find((na) => na.type.name === selectedNode.name)
                      ? false
                      : true
                    : undefined
                }
                key={n.name + n.data.type}
                setRef={(ref) => {
                  tRefs[n.name + n.data.type] = ref;
                  if (Object.keys(tRefs).length === currentNodes.length) {
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
