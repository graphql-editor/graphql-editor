import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
  useNavigationState,
} from '@/state/containers';
import { sortByConnection } from './Algorithm';
import { Node } from './Node';
import { ParserField } from 'graphql-js-tree';
import { Search } from '@/Graf/icons';
import { LevenshteinDistance } from '@/search';
import { Lines, RelationPath } from '@/Relation/Lines';
import { ErrorLock } from '@/shared/components';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow-y: auto;
  scrollbar-color: ${({
    theme: {
      background: { mainClose, mainFurthest },
    },
  }) => `${mainClose} ${mainFurthest}`};
`;

const Main = styled.div`
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  animation: show 1 0.5s ease-in-out;
  min-height: 100%;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ErrorContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  font-size: 12px;
  font-family: ${fontFamily};
  letter-spacing: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background.mainFurthest};
  border: 1px solid ${({ theme }) => theme.error};
`;

const SearchContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 200;

  svg {
    position: absolute;
    bottom: 8px;
    left: 6px;
    z-index: 200;
  }
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.background.mainClose};
  color: ${({ theme }) => theme.text};
  border: 0;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 12px 0 28px;
  font-size: 14px;
  outline: 0;
  position: relative;
  user-select: none;
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

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
export const Relation: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focusedNode, setFocusedNode] = useState<ParserField>();
  const { libraryTree, tree, selectedNode, setSelectedNode, schemaType } =
    useTreesState();
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
  const [refsLoaded, setRefsLoaded] = useState(false);
  const [relations, setRelations] =
    useState<{ to: RelationPath; from: RelationPath[] }[]>();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

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
    if (refsLoaded) {
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
  }, [refs, relationDrawingNodes, currentNodes, refsLoaded]);
  useEffect(() => {
    if (focusedNode) {
      setFocusedNode(undefined);
    }
    if (selectedNode?.field?.name) {
      const relatedNodes = currentNodes.filter(
        (n) =>
          n.args?.find((a) => a.type.name === selectedNode.field?.name) ||
          compareNodesWithData(n, selectedNode.field) ||
          selectedNode.field?.args?.find((a) => a.type.name === n.name),
      );
      setRelationDrawingNodes(relatedNodes);
      return;
    }
  }, [selectedNode]);

  useEffect(() => {
    if (selectedNode?.field?.name) {
      const scrollToRef = (): unknown => {
        if (selectedNode?.field?.name) {
          const ref =
            tRefs[selectedNode.field.name + selectedNode.field.data.type];
          if (!ref) {
            return setTimeout(scrollToRef, 10);
          }
          ref.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'smooth',
          });
        }
      };
      scrollToRef();
    }
  }, [selectedNode]);

  const selectNode = (n: ParserField) => {
    setSelectedNode({
      field: n,
      source: 'relation',
    });
  };

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
      selectNode(node);
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
    return <Lines relations={relations} selectedNode={selectedNode?.field} />;
  }, [relations, selectedNode]);
  const NodesContainer = useMemo(() => {
    const libraryNodeNames = libraryTree.nodes.map((l) => l.name);

    const nodes =
      schemaType === 'library'
        ? [...currentNodes].filter((e) => libraryNodeNames.includes(e.name))
        : [...currentNodes];

    return nodes.map((n, i) => (
      <Node
        focus={() => {
          setFocusedNode(n);
        }}
        isLibrary={
          schemaType === 'library' ? true : libraryNodeNames.includes(n.name)
        }
        fade={
          selectedNode?.field
            ? compareNodesWithData(selectedNode.field, n)
              ? false
              : selectedNode.field.args?.find((a) => a.type.name === n.name)
              ? false
              : n.args?.find((na) => na.type.name === selectedNode.field?.name)
              ? false
              : n.interfaces?.includes(selectedNode.field.name)
              ? false
              : true
            : undefined
        }
        key={n.name + n.data.type + i}
        setRef={(ref) => {
          tRefs[n.name + n.data.type] = ref;
          if (i === currentNodes.length - 1) {
            setRefs(tRefs);
            setTimeout(() => {
              setRefsLoaded(true);
            }, 100);
          }
        }}
        field={n}
      />
    ));
  }, [currentNodes, setRefs, setFocusedNode, selectedNode, schemaType]);

  return (
    <>
      <Wrapper>
        <SearchContainer>
          <Search
            width={18}
            height={18}
            onClick={() => {
              setSearchVisible(!searchVisible);
            }}
          />
          {searchVisible && (
            <SearchInput
              autoFocus={true}
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
        </SearchContainer>
        <Main
          onClick={() => {
            setSearchVisible(false);
            setSelectedNode(undefined);
          }}
          ref={wrapperRef}
        >
          {SvgLinesContainer}
          {!lockGraf && NodesContainer}
        </Main>
        {lockGraf && (
          <ErrorLock
            onClick={() => {
              setMenuState((ms) => ({ ...ms, code: true }));
            }}
            value={`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:\n${lockGraf}`}
          />
        )}

        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Wrapper>
    </>
  );
};
