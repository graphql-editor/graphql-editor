import { useRelationNodesState, useTreesState } from '@/state/containers';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { EagleEye } from '@/icons/EagleEye';
import { ChevronDown } from '@/icons/ChevronDown';
import { Lock } from '@/icons/Lock';
import { Eye } from '@/icons/Eye';
import { EyeOff } from '@/icons/EyeOff';

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
    stroke: ${({ theme }) => theme.dimmed};
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
  transition: ${transition};
  :hover {
    svg {
      opacity: 1;
    }
  }
`;

const NodeName = styled.span<{
  active?: boolean;
  color: keyof EditorTheme['colors'];
  isHidden?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: ${fontFamilySans};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ theme, active, color }) =>
    active ? theme.colors[color] : theme.inactive};
  font-size: 14px;
  transition: ${transition};
  opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1)};

  &:hover {
    color: ${({ theme, color }) => theme.colors[color]};
  }
`;

const IconContainer = styled.div<{
  isHidden?: boolean;
}>`
  display: flex;
  transition: ${transition};
  color: ${({ theme }) => theme.disabled};
  :hover {
    color: ${({ theme }) => theme.text};
  }
  svg {
    opacity: ${({ isHidden }) => (isHidden ? 0.25 : 0.5)};
    transition: ${transition};
  }
`;

const ExternalLibrary = styled.span`
  color: ${({ theme }) => theme.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

type ToggleableParserField = ParserField & { isHidden?: boolean };

interface NodeListI {
  listTitle: string;
  nodeList?: ToggleableParserField[];
  expanded: Array<string>;
  setExpanded: (e: string) => void;
  colorKey: keyof EditorTheme['colors'];
  visibleInRelationView?: true;
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
  colorKey,
  visibleInRelationView,
}) => {
  const { setSelectedNodeId, selectedNodeId, activeNode, allNodes, isLibrary } =
    useTreesState();
  const { toggleNodeVisibility, focusNode } = useRelationNodesState();
  const nodeInsideSelected =
    !!selectedNodeId?.value?.name &&
    nodeList?.map((n) => n.name).includes(selectedNodeId?.value?.name);
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
        {!empty && <ChevronDown />}
      </Title>
      {open &&
        nodeList &&
        nodeList.map((node, i) => (
          <NavSingleBox
            color={colorKey}
            key={i}
            onClick={() => {
              const foundNode = allNodes.nodes.find((el) => el.id === node.id);
              setSelectedNodeId({
                value: foundNode
                  ? {
                      id: foundNode.id,
                      name: foundNode.name,
                    }
                  : undefined,
                source: 'docs',
              });
            }}
            active={activeNode && !!compareParserFields(node)(activeNode)}
          >
            <NodeName
              isHidden={node.isHidden}
              color={colorKey}
              active={activeNode && !!compareParserFields(node)(activeNode)}
            >
              {node.name}
              {isLibrary(node.id) && (
                <ExternalLibrary title="From external library">
                  <Lock />
                </ExternalLibrary>
              )}
            </NodeName>
            <Actions>
              {visibleInRelationView && (
                <IconContainer
                  isHidden={node.isHidden}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId({
                      source: 'deFocus',
                      value: {
                        id: node.id,
                        name: node.name,
                      },
                    });
                    focusNode(node);
                  }}
                >
                  <EagleEye />
                </IconContainer>
              )}
              {visibleInRelationView && (
                <IconContainer
                  isHidden={node.isHidden}
                  onClick={(e) => {
                    e.stopPropagation();

                    selectedNodeId?.value?.id === node.id &&
                      setSelectedNodeId(undefined);

                    toggleNodeVisibility(node);
                  }}
                >
                  {node.isHidden ? <EyeOff /> : <Eye />}
                </IconContainer>
              )}
            </Actions>
          </NavSingleBox>
        ))}
    </>
  );
};
