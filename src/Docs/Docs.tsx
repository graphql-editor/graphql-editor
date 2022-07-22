import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { DynamicResize } from '@/editor/code/Components';
import { useTreesState } from '@/state/containers';
import { useLayoutState } from '@/state/containers/layout';
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

const SelectedNodeWrapper = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => `${width - 64}px`};
  min-width: 90px;
  margin: 32px;
  overflow: hidden;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 12px 12px 12px 0px;
  width: 100%;
  border-left: 4px solid ${({ theme }) => theme.background.mainClose};
`;

export const Docs = () => {
  const { tree, selectedNode, libraryTree } = useTreesState();
  const { setDocumentationWidth, documentationWidth, calcDocumentationWidth } =
    useLayoutState();
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
    const allNodes = tree.nodes.concat(libraryTree.nodes);
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
  }, [tree, libraryTree]);

  return (
    <Wrapper>
      <SelectedNodeWrapper width={calcDocumentationWidth()}>
        {selectedNode?.field && <DocsElement node={selectedNode.field} />}
      </SelectedNodeWrapper>
      <DynamicResize
        resizeCallback={(e, r, c, w) => {
          setDocumentationWidth(c.getBoundingClientRect().width);
        }}
        width={documentationWidth}
        maxWidth={500}
      >
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
      </DynamicResize>
    </Wrapper>
  );
};
