import { CollapseArrow } from '@/editor/menu/CollapseArrow';
import { SearchInput } from '@/shared/components';
import { useIO, KeyboardActions } from '@/shared/hooks/io';
import { NodeList } from '@/shared/NodeNavigation/NodeList';
import { useRelationNodesState, useTreesState } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans, transition } from '@/vars';
import { Eye, EyeSlash } from '@aexol-studio/styling-system';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
  TypeExtension,
} from 'graphql-js-tree';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const Container = styled.div`
  position: relative;
`;

const ListContainer = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.neutral[600]};
  border-left: ${({ theme }) => theme.black} 2px solid;
  height: 100%;
  transition: width 0.5s ease-in-out;
  width: ${({ isCollapsed }) => (isCollapsed ? '50px' : '24rem')};
  overflow-y: ${({ isCollapsed }) => (isCollapsed ? 'hidden' : 'auto')};
`;

const ListWrapper = styled.div`
  width: 100%;
  padding: 0 1rem 100px;
  position: relative;
`;

const TopMenusWrapper = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  background: ${({ theme }) => theme.neutral[600]};
  z-index: 2;
  padding: 1rem;
`;
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const VisibilityBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  align-items: center;
  font-family: ${fontFamilySans};
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.disabled};
  transition: ${transition};
  :hover {
    color: ${({ theme }) => theme.text.default};
  }
  svg {
    stroke-width: 2px;
    cursor: pointer;
  }
`;

const Header = styled.div`
  font-size: 16px;
  font-family: ${fontFamilySans};
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  white-space: nowrap;
  margin-bottom: 1rem;
`;

const onShow = keyframes`
  0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
`;

const Expanded = styled.div<{ isCollapsed: boolean }>`
  display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};
  animation: ${onShow} 0.8s ease;
`;

const VerticalTitle = styled(Header)<{ isCollapsed: boolean }>`
  align-items: center;
  margin-top: 1rem;
  writing-mode: tb-rl;
  text-orientation: upright;
  letter-spacing: 4px;
  display: ${({ isCollapsed }) => (isCollapsed ? 'flex' : 'none')};
  animation: ${onShow} 0.8s ease;
`;

export const NodeNavigation = () => {
  const { allNodes } = useTreesState();
  const { focusMode, focusedNodes } = useRelationNodesState();
  const {
    nodesVisibilityArr,
    hideRelationNodes,
    showRelationNodes,
    allVisible,
  } = useRelationNodesState();
  const { sortAlphabetically } = useSortState();
  const [q, setQ] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [listExpanded, setListExpanded] = useState<Array<string>>([
    'Types',
    'Schema',
    'Interface',
    'Inputs',
    'Enums',
    'Scalars',
    'Unions',
    'Directives',
    'Type Extensions',
  ]);
  const searchRef = useRef<HTMLInputElement>(null);
  const { mount } = useIO();

  useEffect(() => {
    const mounted = mount({
      [KeyboardActions.FindRelation]: () => {
        searchRef.current?.focus();
      },
    });
    return mounted.dispose;
  }, []);

  const splittedNodes = useMemo(() => {
    const enumNodes: ParserField[] = [];
    const unionNodes: ParserField[] = [];
    const inputNodes: ParserField[] = [];
    const scalarNodes: ParserField[] = [];
    const typeNodes: ParserField[] = [];
    const interfaceNodes: ParserField[] = [];
    const schemaNodes: ParserField[] = [];
    const directivesNodes: ParserField[] = [];
    const extEnumNodes: ParserField[] = [];
    const extUnionNodes: ParserField[] = [];
    const extInputNodes: ParserField[] = [];
    const extScalarNodes: ParserField[] = [];
    const extTypeNodes: ParserField[] = [];
    const extInterfaceNodes: ParserField[] = [];
    const mainNodes = focusMode && focusedNodes ? focusedNodes : allNodes.nodes;

    const filteredNodes = mainNodes
      .filter((n) => n.name.toLowerCase().includes(q.toLowerCase()))
      .map((el) => {
        const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
        return { ...el, isHidden: foundNode?.isHidden || false };
      });

    filteredNodes.sort(sortAlphabetically);
    filteredNodes.forEach((node) => {
      switch (node.data.type) {
        case TypeExtension.ObjectTypeExtension:
          extTypeNodes.push(node);
          break;
        case TypeExtension.EnumTypeExtension:
          extEnumNodes.push(node);
          break;
        case TypeExtension.InputObjectTypeExtension:
          extInputNodes.push(node);
          break;
        case TypeExtension.InterfaceTypeExtension:
          extInterfaceNodes.push(node);
          break;
        case TypeExtension.ScalarTypeExtension:
          extScalarNodes.push(node);
          break;
        case TypeExtension.UnionTypeExtension:
          extUnionNodes.push(node);
          break;
        case TypeDefinition.EnumTypeDefinition:
          enumNodes.push(node);
          break;
        case TypeDefinition.UnionTypeDefinition:
          unionNodes.push(node);
          break;
        case TypeDefinition.InputObjectTypeDefinition:
          inputNodes.push(node);
          break;
        case TypeDefinition.ScalarTypeDefinition:
          scalarNodes.push(node);
          break;
        case TypeDefinition.InterfaceTypeDefinition:
          interfaceNodes.push(node);
          break;
        case TypeSystemDefinition.DirectiveDefinition:
          directivesNodes.push(node);
          break;
        case TypeDefinition.ObjectTypeDefinition:
          if (node.type.operations && node.type.operations.length > 0) {
            schemaNodes.push(node);
          } else {
            typeNodes.push(node);
          }
          break;
      }
    });

    return {
      enumNodes,
      unionNodes,
      inputNodes,
      scalarNodes,
      typeNodes,
      interfaceNodes,
      schemaNodes,
      directivesNodes,
      extEnumNodes,
      extInputNodes,
      extInterfaceNodes,
      extScalarNodes,
      extTypeNodes,
      extUnionNodes,
    };
  }, [allNodes, nodesVisibilityArr, q, focusedNodes, focusMode]);

  return (
    <Container>
      <ListContainer isCollapsed={isCollapsed}>
        <CollapseArrow
          isCollapsed={isCollapsed}
          isRight
          toggle={() => setIsCollapsed((prev) => !prev)}
        />
        <VerticalTitle isCollapsed={isCollapsed}>Navigation</VerticalTitle>
        <Expanded isCollapsed={isCollapsed}>
          <TopMenusWrapper>
            <SearchWrapper>
              <SearchInput
                ref={searchRef}
                onChange={(e) => {
                  setQ(e);
                }}
                value={q}
                onClear={() => setQ('')}
                onSubmit={() => {}}
              />
              <>
                {allVisible ? (
                  <VisibilityBox onClick={hideRelationNodes}>
                    <span>hide all</span>
                    <EyeSlash />
                  </VisibilityBox>
                ) : (
                  <VisibilityBox onClick={showRelationNodes}>
                    <span>show all</span>
                    <Eye />
                  </VisibilityBox>
                )}
              </>
            </SearchWrapper>
          </TopMenusWrapper>
          <ListWrapper>
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.schemaNodes}
              visibleInRelationView
              listTitle="Schema"
              colorKey="type"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.typeNodes}
              visibleInRelationView
              listTitle="Types"
              colorKey="type"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.interfaceNodes}
              visibleInRelationView
              listTitle="Interface"
              colorKey="interface"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.unionNodes}
              visibleInRelationView
              listTitle="Unions"
              colorKey="union"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.inputNodes}
              visibleInRelationView
              listTitle="Inputs"
              colorKey="input"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.enumNodes}
              listTitle="Enums"
              colorKey="enum"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.scalarNodes}
              listTitle="Scalars"
              colorKey="scalar"
            />
            <NodeList
              expanded={listExpanded}
              setExpanded={(e) =>
                setListExpanded((le) =>
                  le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                )
              }
              nodeList={splittedNodes?.directivesNodes}
              listTitle="Directives"
              colorKey="directive"
            />
            {!!splittedNodes.extTypeNodes.length && (
              <NodeList
                expanded={listExpanded}
                setExpanded={(e) =>
                  setListExpanded((le) =>
                    le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
                  )
                }
                nodeList={splittedNodes?.extTypeNodes}
                listTitle="Type Extensions"
                colorKey="type"
              />
            )}
          </ListWrapper>
        </Expanded>
      </ListContainer>
    </Container>
  );
};
