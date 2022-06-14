import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { DynamicResize } from '@/editor/code/Components';
import { useTheme, useTreesState } from '@/state/containers';
import { useLayoutState } from '@/state/containers/layout';
import { useSortState } from '@/state/containers/sort';
import { themed } from '@/Theming/utils';

import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { style } from 'typestyle';

const Wrapper = themed(({ background: { mainFar } }) =>
  style({
    width: '100%',
    height: '100%',
    display: 'flex',
    background: mainFar,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
);

const SelectedNodeWrapper = (width: number) =>
  style({
    height: '100%',
    width: `${width - 64}px`,
    minWidth: '90px',
    margin: 32,
    overflow: 'hidden',
  });

const ListWrapper = themed(({ background }) =>
  style({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: '12px 12px 12px 0px',
    width: '100%',
    border: `0px solid ${background.mainClose}`,
    borderLeftWidth: 4,
  }),
);

export const Docs = () => {
  const { theme } = useTheme();
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
    <div className={`${Wrapper(theme)}`}>
      <div className={`${SelectedNodeWrapper(calcDocumentationWidth())}`}>
        {selectedNode && <DocsElement node={selectedNode.field} />}
      </div>
      <DynamicResize
        resizeCallback={(e, r, c, w) => {
          setDocumentationWidth(c.getBoundingClientRect().width);
        }}
        width={documentationWidth}
        maxWidth={500}
      >
        <div className={`${ListWrapper(theme)}`}>
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
        </div>
      </DynamicResize>
    </div>
  );
};
