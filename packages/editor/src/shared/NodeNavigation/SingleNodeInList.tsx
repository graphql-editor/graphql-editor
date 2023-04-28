import { EditorTheme } from '@/gshared/theme/MainTheme';
import {
  useTreesState,
  useRelationNodesState,
  useRelationsState,
} from '@/state/containers';
import { fontFamilySans, transition } from '@/vars';
import {
  Link,
  EagleEye,
  EyeSlash,
  Eye,
  Pen,
  Stack,
} from '@aexol-studio/styling-system';
import styled from '@emotion/styled';
import { compareParserFields, ParserField } from 'graphql-js-tree';
import React, { createRef, useEffect } from 'react';

type ToggleableParserField = ParserField & { isHidden?: boolean };

export const SingleNodeInList: React.FC<{
  node: ToggleableParserField;
  colorKey: keyof EditorTheme['colors'];
  visibleInRelationView?: true;
}> = ({ node, colorKey, visibleInRelationView }) => {
  const { setSelectedNodeId, selectedNodeId, activeNode, isLibrary } =
    useTreesState();
  const { toggleNodeVisibility, focusNode } = useRelationNodesState();
  const { setEditMode } = useRelationsState();
  const ref = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (selectedNodeId?.value?.id === node.id) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedNodeId]);
  const isSelected = activeNode && !!compareParserFields(node)(activeNode);
  return (
    <NavSingleBox
      color={colorKey}
      ref={ref}
      onClick={() => {
        setSelectedNodeId({
          value: {
            id: node.id,
            name: node.name,
          },
          source: 'navigation',
        });
        if (!visibleInRelationView) {
          setEditMode(node.id);
        }
      }}
      active={isSelected}
    >
      <NodeName
        align="center"
        gap="0.5rem"
        isHidden={node.isHidden}
        color={colorKey}
        active={isSelected}
      >
        <span>{node.name}</span>
        {isLibrary(node.id) && (
          <ExternalLibrary title="From external library">
            <Link />
          </ExternalLibrary>
        )}
      </NodeName>
      <Actions>
        {visibleInRelationView && isSelected && (
          <IconContainer
            isHidden={node.isHidden}
            onClick={(e) => {
              e.stopPropagation();
              focusNode(node);
            }}
          >
            <EagleEye height={20} />
          </IconContainer>
        )}
        {visibleInRelationView && isSelected && (
          <IconContainer
            isHidden={node.isHidden}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNodeId({
                source: 'navigation',
                value: {
                  id: node.id,
                  name: node.name,
                },
              });
              setEditMode(node.id);
            }}
          >
            <Pen height={20} />
          </IconContainer>
        )}
        {visibleInRelationView && (
          <IconContainer
            isHidden={node.isHidden}
            onClick={(e) => {
              e.stopPropagation();

              selectedNodeId?.value?.id === node.id &&
                setSelectedNodeId({ source: 'navigation', value: undefined });

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
  gap: 0.25rem;
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

const NodeName = styled(Stack)<{
  active?: boolean;
  color: keyof EditorTheme['colors'];
  isHidden?: boolean;
}>`
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  font-family: ${fontFamilySans};
  font-size: 14px;
  color: ${({ theme, active, color }) =>
    active ? theme.colors[color] : theme.text.default};
  transition: ${transition};
  opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1)};
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 28ch;
  white-space: nowrap;
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
