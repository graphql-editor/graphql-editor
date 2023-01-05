import { useTreesState } from '@/state/containers';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';
import { Arrow } from '@/editor/icons';

const NodeText = styled.a<{ active?: boolean }>`
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active }) => (active ? theme.active : theme.inactive)};
  cursor: pointer;
  display: block;
  font-size: 14px;
  border-left: ${({ theme }) => theme.inactive} 1px solid;
  padding: 0.5rem;
  margin-left: 1rem;
  &:hover {
    color: ${({ theme }) => theme.active};
  }
`;

const Title = styled.div<{
  open?: boolean;
  nodeInsideSelected?: boolean;
  empty?: boolean;
}>`
  font-family: ${fontFamilySans};
  font-weight: 600;
  cursor: ${({ empty }) => (empty ? 'auto' : 'pointer')};
  color: ${({ theme, nodeInsideSelected, empty }) =>
    empty ? theme.disabled : nodeInsideSelected ? theme.active : theme.text};
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
  const nodeInsideSelected =
    !!selectedNode?.field?.name &&
    nodeList?.map((n) => n.name).includes(selectedNode?.field?.name);
  const open = expanded.includes(listTitle);
  const empty = !nodeList?.length;
  return (
    <>
      <Title
        empty={empty}
        nodeInsideSelected={nodeInsideSelected}
        onClick={() => setExpanded(listTitle)}
        open={open}
      >
        <div>{listTitle}</div>
        {!empty && <Arrow size={14} />}
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
    </>
  );
};
