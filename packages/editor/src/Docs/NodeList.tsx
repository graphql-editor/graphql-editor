import { useTreesState } from '@/state/containers';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const List = styled.div`
  text-align: left;
  padding: 10px;
`;

const NodeText = styled.a`
  font-family: ${fontFamilySans};
  color: ${({ theme }) => theme.dimmed};
  cursor: pointer;
  display: block;
  font-size: 14px;
  padding: 10px 15px;
  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.type};
  }
`;

const Title = styled.p`
  font-family: ${fontFamilySans};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.type};
  margin: 0;
  font-size: 14px;
  margin-bottom: 5px;
`;

type ListTitle =
  | 'Schema'
  | 'Types'
  | 'Interface'
  | 'Inputs'
  | 'Enums'
  | 'Scalars'
  | 'Unions'
  | 'Directives';

interface NodeListI {
  listTitle: ListTitle;
  nodeList?: ParserField[];
}

export const NodeList: React.FC<NodeListI> = ({ nodeList, listTitle }) => {
  const { selectedNode, setSelectedNode } = useTreesState();
  return (
    <List>
      <Title>{listTitle}</Title>
      {nodeList &&
        nodeList.map((node, i) => (
          <NodeText
            key={i}
            onClick={() => {
              setSelectedNode({
                field: node,
                source: 'docs',
              });
            }}
            className={
              selectedNode && !!compareNodesWithData(node, selectedNode.field)
                ? 'active'
                : ''
            }
          >
            {node.name}
          </NodeText>
        ))}
    </List>
  );
};
