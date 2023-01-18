import { Eye } from '@/editor/icons';
import { SearchInput } from '@/shared/components';
import { useIO, KeyboardActions } from '@/shared/hooks/io';
import { NodeList } from '@/shared/NodeNavigation/NodeList';
import { useTreesState } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
  TypeExtension,
} from 'graphql-js-tree';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const ListWrapper = styled.div`
  width: 100%;
  padding: 0 1rem 100px;
  position: relative;
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
  background: ${({ theme }) => theme.background.mainFurther};
  border-left: ${({ theme }) => theme.moduleSeparator} 2px solid;
  height: 100%;
  width: 24rem;
`;
const SearchWrapper = styled.div`
  padding: 1rem;
  position: sticky;
  width: 100%;
  top: 0;
  background: ${({ theme }) => theme.background.mainFurther};
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VisibilityBox = styled(SearchWrapper)`
  padding: 0 1rem 1rem;
  top: 68px;
  justify-content: flex-end;
  gap: 0.5rem;

  svg {
    cursor: pointer;
  }

  div:first-of-type svg {
    color: ${({ theme }) => theme.colors.type};
    stroke-width: 2px;
  }
  div:last-of-type svg {
    color: ${({ theme }) => theme.inactive};
  }
`;

const Header = styled.div`
  font-size: 16px;
  font-family: ${fontFamilySans};
  font-weight: 500;
  color: ${({ theme }) => theme.dimmed};
  white-space: nowrap;
`;

export const NodeNavigation = () => {
  const { allNodes, nodesVisibilityArr, hideRelationNodes, showRelationNodes } =
    useTreesState();
  const { sortAlphabetically } = useSortState();
  const [q, setQ] = useState('');
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

    const filteredNodes = allNodes.nodes
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
  }, [allNodes, nodesVisibilityArr, q]);

  return (
    <ListContainer>
      <SearchWrapper>
        <Header>Navigation</Header>
        <SearchInput
          ref={searchRef}
          onChange={(e) => {
            setQ(e);
          }}
          value={q}
          onClear={() => setQ('')}
          onSubmit={() => {}}
        />
      </SearchWrapper>
      <VisibilityBox>
        <div onClick={showRelationNodes}>
          <Eye size={20} />
        </div>
        <div onClick={hideRelationNodes}>
          <Eye size={20} />
        </div>
      </VisibilityBox>
      <ListWrapper>
        <NodeList
          expanded={listExpanded}
          setExpanded={(e) =>
            setListExpanded((le) =>
              le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
            )
          }
          nodeList={splittedNodes?.schemaNodes}
          toggleable
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
          toggleable
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
          toggleable
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
          toggleable
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
    </ListContainer>
  );
};
