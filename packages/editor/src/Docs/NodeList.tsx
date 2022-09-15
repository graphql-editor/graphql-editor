import { useTreesState } from '@/state/containers';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';
import { Arrow } from '@/editor/icons';

const List = styled.div`
  text-align: left;
  padding: 10px;
`;

const NodeText = styled.a<{ active?: boolean }>`
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active }) => (active ? theme.active : theme.disabled)};
  cursor: pointer;
  display: block;
  font-size: 14px;
  padding: 8px 15px 8px 10px;
  &:hover {
    color: ${({ theme }) => theme.active};
  }
`;

const Title = styled.div<{ open?: boolean }>`
  font-family: ${fontFamilySans};
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 14px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.dimmed};
    transform: ${({ open }) => (open ? 'scaleY(1.0)' : 'scaleY(-1.0)')};
  }
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
  expanded: Array<string>;
  setExpanded: (e: string) => void;
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
}) => {
  const { selectedNode, setSelectedNode } = useTreesState();
  const open =
    (!!selectedNode?.field?.name &&
      nodeList?.map((n) => n.name).includes(selectedNode?.field?.name)) ||
    expanded.includes(listTitle);
  return (
    <List>
      <Title onClick={() => setExpanded(listTitle)} open={open}>
        <div>{listTitle}</div>
        <Arrow size={14} />
      </Title>
      {open &&
        nodeList &&
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
              selectedNode?.field &&
              !!compareParserFields(node)(selectedNode.field)
            }
          >
            {node.name}
          </NodeText>
        ))}
    </List>
  );
};
