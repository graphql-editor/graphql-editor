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

const NodeText = styled.a<{ active?: boolean }>`
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active }) => (active ? theme.active : theme.dimmed)};
  cursor: pointer;
  display: block;
  font-size: 14px;
  padding: 5px 15px 5px 0;
  &:hover {
    color: ${({ theme }) => theme.active};
  }
`;

const Title = styled.p`
  font-family: ${fontFamilySans};
  font-weight: 600;
  color: ${({ theme }) => theme.text};
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
            active={
              selectedNode && !!compareNodesWithData(node, selectedNode.field)
            }
          >
            {node.name}
          </NodeText>
        ))}
    </List>
  );
};
