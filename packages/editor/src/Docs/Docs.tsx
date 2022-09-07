import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { useTreesState } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import React, { useMemo } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.background.mainFar};
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
`;

const SelectedNodeWrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 90px;
  margin: 32px;
  overflow: hidden;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 12px 12px 12px 24px;
  width: 400px;
  border-left: 4px solid ${({ theme }) => theme.background.mainClose};
`;

export const Docs = () => {
  const { tree, selectedNode, libraryTree, schemaType } = useTreesState();
  const { sortAlphabetically } = useSortState();

  const splittedNodes = useMemo(() => {
    const enumNodes: ParserField[] = [];
    const unionNodes: ParserField[] = [];
    const inputNodes: ParserField[] = [];
    const scalarNodes: ParserField[] = [];
    const typeNodes: ParserField[] = [];
    const interfaceNodes: ParserField[] = [];
    const schemaNodes: ParserField[] = [];
    const directivesNodes: ParserField[] = [];
    let allNodes =
      schemaType === 'library'
        ? [...libraryTree.nodes]
        : [...tree.nodes, ...libraryTree.nodes];

    allNodes.sort(sortAlphabetically);
    allNodes.forEach((node) => {
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
  }, [tree, libraryTree, schemaType]);

  return (
    <Wrapper>
      <ListWrapper>
        <NodeList nodeList={splittedNodes?.schemaNodes} listTitle="Schema" />
        <NodeList nodeList={splittedNodes?.typeNodes} listTitle="Types" />
        <NodeList
          nodeList={splittedNodes?.interfaceNodes}
          listTitle="Interface"
        />
        <NodeList nodeList={splittedNodes?.inputNodes} listTitle="Inputs" />
        <NodeList nodeList={splittedNodes?.enumNodes} listTitle="Enums" />
        <NodeList nodeList={splittedNodes?.scalarNodes} listTitle="Scalars" />
        <NodeList nodeList={splittedNodes?.unionNodes} listTitle="Unions" />
        <NodeList
          nodeList={splittedNodes?.directivesNodes}
          listTitle="Directives"
        />
      </ListWrapper>
      <SelectedNodeWrapper>
        {selectedNode?.field && <DocsElement node={selectedNode.field} />}
      </SelectedNodeWrapper>
    </Wrapper>
  );
};
