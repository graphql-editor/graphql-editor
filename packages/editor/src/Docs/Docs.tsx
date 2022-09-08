import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { SearchInput } from '@/shared/components';
import { useTreesState } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import React, { useMemo, useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.background.mainFurther};
  flex-direction: row;
  overflow: auto;
  align-items: stretch;
`;

const SelectedNodeWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow-x: hidden;
  scrollbar-color: ${({ theme }) =>
    `${theme.background.mainClose} ${theme.background.mainFurthest}`};
`;

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
  scrollbar-color: ${({ theme }) =>
    `${theme.background.mainClose} ${theme.background.mainFurthest}`};
`;
const SearchWrapper = styled.div`
  padding: 20px;
  position: sticky;
  width: 100%;
`;

export const Docs = () => {
  const { tree, selectedNode, libraryTree, schemaType } = useTreesState();
  const { sortAlphabetically } = useSortState();
  const [q, setQ] = useState('');
  const [listExpanded, setListExpanded] = useState<Array<string>>([]);

  const splittedNodes = useMemo(() => {
    const enumNodes: ParserField[] = [];
    const unionNodes: ParserField[] = [];
    const inputNodes: ParserField[] = [];
    const scalarNodes: ParserField[] = [];
    const typeNodes: ParserField[] = [];
    const interfaceNodes: ParserField[] = [];
    const schemaNodes: ParserField[] = [];
    const directivesNodes: ParserField[] = [];
    const allNodes =
      schemaType === 'library'
        ? [...libraryTree.nodes]
        : [...tree.nodes, ...libraryTree.nodes];
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
  }, [tree, libraryTree, schemaType, q]);

  return (
    <Wrapper>
      <ListContainer>
        <SearchWrapper>
          <SearchInput
            onChange={(e) => {
              setQ(e);
            }}
            value={q}
            onClear={() => setQ('')}
            onSubmit={() => {}}
            cypressName="Search-docs"
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
          />
        </ListWrapper>
      </ListContainer>
      <SelectedNodeWrapper>
        {selectedNode?.field && <DocsElement node={selectedNode.field} />}
      </SelectedNodeWrapper>
    </Wrapper>
  );
};
