import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { keyframes, style } from 'typestyle';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
  useNavigationState,
  useTheme,
} from '@/state/containers';
import { sortByConnection } from './Algorithm';
import { Node } from './Node';
import { ParserField } from 'graphql-js-tree';
import { Search } from '@/Graf/icons';
import { LevenshteinDistance } from '@/search';
import { Lines, RelationPath } from '@/Relation/Lines';
import { themed } from '@/Theming/utils';
import { ErrorLock } from '@/shared/components';

const show = keyframes({
  ['0%']: {
    opacity: 0.0,
  },
  ['50%']: {
    opacity: 0.0,
  },
  ['100%']: {
    opacity: 1.0,
  },
});

export interface RelationProps {}
const Wrapper = themed(({ background: { mainFar, mainClose, mainFurthest } }) =>
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
const Main = style({
  width: '100%',
  position: 'relative',
  fontFamily,
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
  flexWrap: 'wrap',
  animationName: show,
  animationIterationCount: 1,
  animationDuration: '0.5s',
  animationTimingFunction: 'ease-in-out',
  minHeight: '100%',
});
const ErrorContainer = themed(({ error, text, background: { mainFurthest } }) =>
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
    color: text,
    background: mainFurthest,
    border: `1px solid ${error}`,
  }),
);
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
const SearchInput = themed(({ text, disabled, background: { mainClose } }) =>
  style({
    background: mainClose,
    color: text,
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
        color: disabled,
      },
    },
  }),
);
function insert<T>(arr: T[], index: number, before: T[], after: T[]) {
  return [
    ...arr.slice(0, index),
    ...before,
    arr[index],
    ...after,
    ...arr.slice(index + 1),
  ];
}

let tRefs: Record<string, HTMLDivElement> = {};
export const Relation: React.FC<RelationProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focusedNode, setFocusedNode] = useState<ParserField>();
  const { libraryTree, tree, selectedNode, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { menuState, setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const [currentNodes, setCurrentNodes] = useState<ParserField[]>(
    sortByConnection(tree.nodes.concat(libraryTree.nodes)),
  );

  const [relationDrawingNodes, setRelationDrawingNodes] = useState<
    ParserField[]
  >([]);

  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [relations, setRelations] =
    useState<{ to: RelationPath; from: RelationPath[] }[]>();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    tRefs = {};
    setFocusedNode(undefined);
    const current = sortByConnection(tree.nodes.concat(libraryTree.nodes));
    setCurrentNodes(current);
    setRelationDrawingNodes(current);
  }, [tree, libraryTree]);

  useLayoutEffect(() => {
    if (!focusedNode) {
      return;
    }
    setTimeout(() => {
      const ref = tRefs[focusedNode.name + focusedNode.data.type];
      if (ref) {
        ref.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        });
      }
    }, 50);
  }, [focusedNode]);

  useEffect(() => {
    if (focusedNode) {
      const relatedNodes = currentNodes.filter(
        (n) =>
          n.args?.find((a) => a.type.name === focusedNode.name) ||
          n === focusedNode ||
          focusedNode.args?.find((a) => a.type.name === n.name),
      );
      const withoutRelated = currentNodes.filter(
        (n) => !relatedNodes.includes(n) || n === focusedNode,
      );

      const focusedNodeIndex = currentNodes.findIndex(
        (cn) => cn === focusedNode,
      );
      const before = currentNodes
        .slice(0, focusedNodeIndex)
        .filter((n) => relatedNodes.includes(n));
      const after = currentNodes
        .slice(focusedNodeIndex + 1)
        .filter((n) => relatedNodes.includes(n));
      const inserted = insert(
        withoutRelated,
        withoutRelated.findIndex((wr) => wr === focusedNode),
        before,
        after,
      );
      setCurrentNodes(inserted);
    }
  }, [focusedNode]);

  useLayoutEffect(() => {
    if (Object.keys(refs).length > 0) {
      setRelations(
        relationDrawingNodes
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            from: n.args
              ?.map((a, index) => {
                const pn = relationDrawingNodes.find(
                  (nf) => nf.name === a.type.name,
                );
                if (!pn) {
                  return;
                }
                return {
                  htmlNode: refs[pn.name + pn.data.type],
                  field: pn,
                  index,
                } as RelationPath;
              })
              .filter((o) => !!o),
          }))
          .filter((n) => n.from)
          .map((n) => n as { from: RelationPath[]; to: RelationPath }),
      );
    }
  }, [refs, relationDrawingNodes, currentNodes]);
  useEffect(() => {
    if (focusedNode) {
      setFocusedNode(undefined);
    }
    if (selectedNode) {
      const relatedNodes = currentNodes.filter(
        (n) =>
          n.args?.find((a) => a.type.name === selectedNode.name) ||
          n === selectedNode ||
          selectedNode.args?.find((a) => a.type.name === n.name),
      );
      const ref = tRefs[selectedNode.name + selectedNode.data.type];
      if (ref) {
        ref.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        });
      }
      setRelationDrawingNodes(relatedNodes);
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

  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} selectedNode={selectedNode} />;
  }, [relations, selectedNode]);
  const NodesContainer = useMemo(() => {
    const libraryNodeNames = libraryTree.nodes.map((l) => l.name);
    return currentNodes.map((n, i) => (
      <Node
        focus={() => {
          setFocusedNode(n);
        }}
        isLibrary={libraryNodeNames.includes(n.name)}
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
          if (i === currentNodes.length - 1) {
            setRefs(tRefs);
          }
        }}
        field={n}
      />
    ));
  }, [currentNodes, setRefs, setFocusedNode, selectedNode]);
  return (
    <>
      <div className={Wrapper(theme)}>
        <div className={SearchContainer}>
          <Search
            width={18}
            height={18}
            className={SearchIcon}
            onClick={() => {
              setSearchVisible(!searchVisible);
            }}
          />
          {searchVisible && (
            <input
              autoFocus={true}
              className={SearchInput(theme)}
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
          {SvgLinesContainer}
          {!lockGraf && NodesContainer}
        </div>
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
