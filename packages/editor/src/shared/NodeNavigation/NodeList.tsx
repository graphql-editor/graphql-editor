import { useTreesState } from '@/state/containers';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import { Arrow } from '@/editor/icons';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

const NodeText = styled.a<{
  active?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active, color }) =>
    active ? theme.colors[color] : theme.inactive};
  cursor: pointer;
  display: block;
  font-size: 14px;
  border-left: ${({ theme, color }) => theme.colors[color]} 1px solid;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  transition: ${transition};
  &:hover {
    color: ${({ theme, color }) => theme.colors[color]};
  }
`;

const Title = styled.div<{
  open?: boolean;
  nodeInsideSelected?: boolean;
  empty?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  font-family: ${fontFamilySans};
  font-weight: 600;
  cursor: ${({ empty }) => (empty ? 'auto' : 'pointer')};
  color: ${({ theme, nodeInsideSelected, empty, color }) =>
    empty
      ? theme.disabled
      : nodeInsideSelected
      ? theme.colors[color]
      : theme.text};
  margin: 0;
  font-size: 14px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${transition};
  svg {
    fill: ${({ theme }) => theme.dimmed};
    transition: ${transition};
    transform-origin: 50%;
    transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(-90deg)')};
  }
`;

interface NodeListI {
  listTitle: string;
  nodeList?: ParserField[];
  expanded: Array<string>;
  setExpanded: (e: string) => void;
  colorKey: keyof EditorTheme['colors'];
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
  colorKey,
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
        color={colorKey}
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
            color={colorKey}
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
