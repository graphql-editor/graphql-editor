import { EditorTheme } from '@/gshared/theme/MainTheme';
import { useTreesState, useRelationNodesState } from '@/state/containers';
import { fontFamilySans, transition } from '@/vars';
import { Link, EagleEye, EyeSlash, Eye } from '@aexol-studio/styling-system';
import styled from '@emotion/styled';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React, { createRef, useEffect } from 'react';

type ToggleableParserField = ParserField & { isHidden?: boolean };

export const SingleNodeInList: React.FC<{
  node: ToggleableParserField;
  colorKey: keyof EditorTheme['colors'];
  visibleInRelationView?: true;
}> = ({ node, colorKey, visibleInRelationView }) => {
  const { setSelectedNodeId, selectedNodeId, activeNode, allNodes, isLibrary } =
    useTreesState();
  const { toggleNodeVisibility, focusNode } = useRelationNodesState();
  const ref = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (selectedNodeId?.value?.id === node.id) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedNodeId]);

  return (
    <NavSingleBox
      color={colorKey}
      ref={ref}
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
            <Link />
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
            <EagleEye height={20} />
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
            {node.isHidden ? <EyeSlash height={20} /> : <Eye height={20} />}
          </IconContainer>
        )}
      </Actions>
    </NavSingleBox>
  );
};

const ExternalLibrary = styled.span`
  color: ${({ theme }) => theme.text.disabled};
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
  background-color: ${(p) => p.theme.neutral[600]};

  :hover {
    background-color: ${(p) => p.theme.neutral[500]};
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
    active ? theme.colors[color] : theme.text.default};
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
  color: ${({ theme }) => theme.button.standalone.disabled};
  :hover {
    color: ${({ theme }) => theme.text.active};
  }
  svg {
    opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1.0)};
    transition: ${transition};
  }
`;
