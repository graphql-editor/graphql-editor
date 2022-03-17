import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { DynamicResize } from '@/editor/code/Components';
import { useTheme, useTreesState } from '@/state/containers';
import { useLayoutState } from '@/state/containers/layout';
import { themed } from '@/Theming/utils';
import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from 'graphql-js-tree';
import React, { useEffect, useState } from 'react';
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

interface SplitedNodesI {
  enumNodes: ParserField[];
  unionNodes: ParserField[];
  inputNodes: ParserField[];
  scalarNodes: ParserField[];
  typeNodes: ParserField[];
  interfaceNodes: ParserField[];
  schemaNodes: ParserField[];
  directivesNodes: ParserField[];
}

export const Docs = () => {
  const { theme } = useTheme();
  const { tree, selectedNode } = useTreesState();
  const { setDocumentationWidth, documentationWidth, calcWidth } =
    useLayoutState();

  const [splitedNodes, setSplitedNodes] = useState<SplitedNodesI>();

  const splitTreeByType = () => {
    const enumNodes: ParserField[] = [];
    const unionNodes: ParserField[] = [];
    const inputNodes: ParserField[] = [];
    const scalarNodes: ParserField[] = [];
    const typeNodes: ParserField[] = [];
    const interfaceNodes: ParserField[] = [];
    const schemaNodes: ParserField[] = [];
    const directivesNodes: ParserField[] = [];

    tree.nodes.sort((a, b) => a.name.localeCompare(b.name));
    tree.nodes.forEach((node) => {
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
  };

  useEffect(() => {
    setSplitedNodes(splitTreeByType());
  }, [tree]);

  return (
    <div className={`${Wrapper(theme)}`}>
      <div className={`${SelectedNodeWrapper(calcWidth())}`}>
        {selectedNode && <DocsElement node={selectedNode} />}
      </div>
      <DynamicResize
        resizeCallback={(e, r, c, w) => {
          setDocumentationWidth(c.getBoundingClientRect().width);
        }}
        width={documentationWidth}
        maxWidth={500}
      >
        <div className={`${ListWrapper(theme)}`}>
          <NodeList nodeList={splitedNodes?.schemaNodes} listTitle="Schema" />
          <NodeList nodeList={splitedNodes?.typeNodes} listTitle="Types" />
          <NodeList
            nodeList={splitedNodes?.interfaceNodes}
            listTitle="Interface"
          />
          <NodeList nodeList={splitedNodes?.inputNodes} listTitle="Inputs" />
          <NodeList nodeList={splitedNodes?.enumNodes} listTitle="Enums" />
          <NodeList nodeList={splitedNodes?.scalarNodes} listTitle="Scalars" />
          <NodeList nodeList={splitedNodes?.unionNodes} listTitle="Unions" />
          <NodeList
            nodeList={splitedNodes?.directivesNodes}
            listTitle="Directives"
          />
        </div>
      </DynamicResize>
    </div>
  );
};
