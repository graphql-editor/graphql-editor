import { DocsElement } from '@/Docs/DocsElement';
import { NodeList } from '@/Docs/NodeList';
import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useEffect, useState } from 'react';
import { style } from 'typestyle';

const Wrapper = themed(({ background: { mainFar } }) =>
  style({
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    background: mainFar,
    flexDirection: 'row',
  }),
);

const SelectedNodeWrapper = style({
  width: '70%',
  height: '100%',
});

const ListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  overflowX: 'hidden',
  width: '30%',
  padding: '12px 32px',
});

interface SplitedNodesI {
  enumNodes: ParserField[];
  unionNodes: ParserField[];
  inputNodes: ParserField[];
  scalarNodes: ParserField[];
  typeNodes: ParserField[];
  interfaceNodes: ParserField[];
  schemaNodes: ParserField[];
}

export const Docs = () => {
  const { theme } = useTheme();
  const { tree, selectedNode } = useTreesState();

  const [splitedNodes, setSplitedNodes] = useState<SplitedNodesI>();

  const splitTreeByType = () => {
    const enumNodes: ParserField[] = [];
    const unionNodes: ParserField[] = [];
    const inputNodes: ParserField[] = [];
    const scalarNodes: ParserField[] = [];
    const typeNodes: ParserField[] = [];
    const interfaceNodes: ParserField[] = [];
    const schemaNodes: ParserField[] = [];

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
    };
  };

  useEffect(() => {
    setSplitedNodes(splitTreeByType());
  }, [tree]);

  return (
    <div className={`${Wrapper(theme)}`}>
      <div className={`${SelectedNodeWrapper}`}>
        {selectedNode && <DocsElement node={selectedNode} />}
      </div>
      <div className={`${ListWrapper}`}>
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
      </div>
    </div>
  );
};
