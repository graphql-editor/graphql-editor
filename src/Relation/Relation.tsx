import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import { ParserField, TypeDefinition } from 'graphql-zeus';
import { GraphQLBackgrounds, GraphQLColors } from '@/editor/theme';
import { Search } from '@/Graf/icons';

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
  backgroundSize: `100px 100px`,
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

  const { libraryTree, tree, selectedNode, setSelectedNode } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { menuState, setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const { themed } = useTheme();
  const allNodes = tree.nodes.concat(libraryTree.nodes);
  const nodes = sortByConnection(allNodes);

  const [refs, setRefs] = useState<Record<string, HTMLDivElement>>({});
  const [relations, setRelations] = useState<
    { to: RelationPath; from: RelationPath[] }[]
  >();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (Object.keys(refs).length === nodes.length) {
      setRelations(
        nodes
          .filter((n) => n.data.type !== TypeDefinition.EnumTypeDefinition)
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            from: n.args
              ?.filter((a) => !isScalarArgument(a))
              .map((a) => {
                const pn = nodes.find((nf) => nf.name === a.type.name)!;
                return { htmlNode: refs[pn.name + pn.data.type], field: pn };
              }),
          }))
          .filter((n) => n.from)
          .map((n) => n as { from: RelationPath[]; to: RelationPath }),
      );
    }
  }, [refs]);
  useEffect(() => {
    if (selectedNode) {
      const ref = tRefs[selectedNode.name + selectedNode.data.type];
      ref.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }, [selectedNode]);

  const handleSearch = useCallback(
    (searchValue) => {
      if (searchValue.length) {
        const node = nodes
          .sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name))
          .filter((n) => {
            return n.name.toLocaleLowerCase().indexOf(searchValue) > -1;
          });
        if (node.length > 0) {
          setSelectedNode(node[0]);
        }
      } else {
        setSelectedNode(undefined);
      }
    },
    [nodes],
  );

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
      <div ref={wrapperRef} className={`${Wrapper}`}>
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
        >
          <svg className={RelationsContainer}>
            {relations?.map((r, index) =>
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
            nodes.map((n, i) => (
              <Node
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
