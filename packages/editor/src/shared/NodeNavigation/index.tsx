import { SearchInput } from '@/shared/components';
import { useIO, KeyboardActions } from '@/shared/hooks/io';
import { NodeList } from '@/shared/NodeNavigation/NodeList';
import { useTreesState } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const ListWrapper = styled.div`
  width: 100%;
  padding: 0 20px 100px;
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
  width: 18rem;
`;
const SearchWrapper = styled.div`
  padding: 20px;
  position: sticky;
  width: 100%;
  top: 0;
  background: ${({ theme }) => theme.background.mainFurther};
  z-index: 2;
`;

export const NodeNavigation = () => {
  const { allNodes } = useTreesState();
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
    const filteredNodes = allNodes.filter((n) =>
      n.name.toLowerCase().includes(q.toLowerCase()),
    );

    filteredNodes.sort(sortAlphabetically);
    filteredNodes.forEach((node) => {
      switch (node.data.type) {
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
    };
  }, [allNodes, q]);

  return (
    <ListContainer>
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
      </SearchWrapper>
      <ListWrapper>
        <NodeList
          expanded={listExpanded}
          setExpanded={(e) =>
            setListExpanded((le) =>
              le.includes(e) ? le.filter((l) => l !== e) : [...le, e],
            )
          }
          nodeList={splittedNodes?.schemaNodes}
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
          nodeList={splittedNodes?.unionNodes}
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
          nodeList={splittedNodes?.directivesNodes}
          listTitle="Directives"
          colorKey="directive"
        />
      </ListWrapper>
    </ListContainer>
  );
};
