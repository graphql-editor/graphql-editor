import { useRelationNodesState, useTreesState } from '@/state/containers';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import { Arrow, Eye } from '@/editor/icons';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

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
  margin-right: 3px;
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

const NavSingleBox = styled.a<{
  active?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: ${({ theme, color }) => theme.colors[color]} 1px solid;
  padding: 0.5rem 0 0.5rem 1rem;
  margin-left: 1rem;
`;

const NodeName = styled.span<{
  active?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active, color }) =>
    active ? theme.colors[color] : theme.inactive};
  font-size: 14px;
  transition: ${transition};

  &:hover {
    color: ${({ theme, color }) => theme.colors[color]};
  }
`;

const IconContainer = styled.div<{
  isHidden?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  display: flex;
  transition: ${transition};
  color: ${({ theme, isHidden, color }) =>
    isHidden ? theme.inactive : theme.colors[color]};
  svg {
    transition: ${transition};
    stroke-width: ${({ isHidden }) => (isHidden ? 'unset' : '2px')};
  }
`;

type ToggleableParserField = ParserField & { isHidden?: boolean };

interface NodeListI {
  listTitle: string;
  nodeList?: ToggleableParserField[];
  expanded: Array<string>;
  setExpanded: (e: string) => void;
  colorKey: keyof EditorTheme['colors'];
  toggleable?: true;
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
  colorKey,
  toggleable,
}) => {
  const { selectedNode, setSelectedNode, allNodes } = useTreesState();
  const { toggleNodeVisibility } = useRelationNodesState();
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
          <NavSingleBox
            color={colorKey}
            key={i}
            onClick={() => {
              const foundNode = allNodes.nodes.find((el) => el.id === node.id);
              setSelectedNode({
                field: foundNode,
                source: 'docs',
              });
            }}
            active={
              selectedNode?.field &&
              !!compareParserFields(node)(selectedNode.field)
            }
          >
            <NodeName
              color={colorKey}
              active={
                selectedNode?.field &&
                !!compareParserFields(node)(selectedNode.field)
              }
            >
              {node.name}
            </NodeName>
            {toggleable && (
              <IconContainer
                isHidden={node.isHidden}
                color={colorKey}
                onClick={(e) => {
                  !node.isHidden && e.stopPropagation();

                  selectedNode?.field?.id === node.id &&
                    setSelectedNode(undefined);

                  toggleNodeVisibility(node);
                }}
              >
                <Eye size={20} />
              </IconContainer>
            )}
          </NavSingleBox>
        ))}
    </>
  );
};
