import { ActiveType } from '@/Graf/Node/Type';
import { useTheme, useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { Field } from '../Field';
import * as Icons from '@/editor/icons';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamily } from '@/vars';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

type NodeTypes = keyof EditorTheme['backgrounds'];

interface ContentProps {
  nodeType: NodeTypes;
  isSelected?: boolean;
  isLibrary?: boolean;
  isActive?: boolean;
  fade?: boolean;
}

const Content = styled.div<ContentProps>`
  background-color: ${({ theme, fade }) =>
    fade ? theme.background.mainFurther : theme.background.mainMiddle};
  opacity: ${({ fade }) => (fade ? '0.9' : '1')};
  padding: 20px;
  margin: 20px;
  text-overflow: ellipsis;
  border-radius: 10px;
  overflow-y: hidden;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  cursor: ${({ isSelected }) => (isSelected ? 'auto' : 'pointer')};
  max-width: 50%;
  border-width: 1px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  border-color: ${({ theme, nodeType, isSelected }) =>
    theme.colors[nodeType] && isSelected
      ? theme.colors[nodeType]
      : `${theme.hover}00`};
  box-shadow: ${({ theme, isActive }) => isActive && theme.shadow};

  &:hover {
    border-color: ${({ theme, nodeType }) =>
      theme.colors[nodeType] ? theme.colors[nodeType] : `${theme.hover}00`};
  }
`;

const OpacityFade = styled.div<{ fade?: boolean }>`
  opacity: ${({ fade }) => (fade ? '0.25' : '1')};
`;

const NodeRelationFields = styled(OpacityFade)``;
const NodeType = styled(OpacityFade)``;

const NodeTitle = styled.div<{ fade?: boolean }>`
  align-items: stretch;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  padding: 10px 5px;
  display: flex;
  opacity: ${({ fade }) => (fade ? '0.5' : '1')};
`;

const NodeName = styled.div`
  margin-right: 5px;
`;

const NodeFocus = styled.div<{ isSelected?: boolean }>`
  margin-left: auto;
  text-transform: lowercase;
  font-size: 12px;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
  color: ${({ theme }) => theme.backgroundedText};
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: ${({ isSelected }) => (isSelected ? 'pointer' : 'auto')};
  pointer-events: ${({ isSelected }) => (isSelected ? 'auto' : 'none')};

  span {
    margin-right: 5px;
  }
`;

const NameInRelation = styled.span`
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  min-width: auto;
  padding: 0;
  font-family: ${fontFamily};
  font-size: ${FIELD_NAME_SIZE};
`;

interface NodeProps {
  field: ParserField;
  focus: () => void;
  isLibrary?: boolean;
  fade?: boolean;
  setRef: (instance: HTMLDivElement) => void;
}

export const Node: React.FC<NodeProps> = ({
  field,
  setRef,
  fade,
  focus,
  isLibrary,
}) => {
  const { setSelectedNode, selectedNode, tree, libraryTree } = useTreesState();
  const isNodeActive = compareNodesWithData(field, selectedNode?.field);
  const { theme } = useTheme();
  const RelationFields = useMemo(() => {
    const nodeFields = field.args;
    return (
      <NodeRelationFields fade={fade}>
        {nodeFields?.map((a) => (
          <Field
            onClick={() => {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              const n = allNodes.find((tn) => tn.name === a.type.name);
              setSelectedNode(
                n && {
                  field: n,
                  source: 'relation',
                },
              );
            }}
            active={
              isNodeActive &&
              field.data.type !== TypeDefinition.EnumTypeDefinition
            }
            key={a.name}
            node={a}
            parentNodeTypeName={field.type.name}
          />
        ))}
      </NodeRelationFields>
    );
  }, [field, isNodeActive, theme, fade]);
  const NodeContent = useMemo(
    () => (
      <NodeTitle fade={fade}>
        <NodeName>
          <NameInRelation>{field.name}</NameInRelation>
        </NodeName>
        <NodeType fade={fade}>
          <ActiveType type={field.type} />
        </NodeType>
        <NodeFocus
          isSelected={selectedNode?.field === field}
          onClick={(e) => {
            e.stopPropagation();
            focus();
          }}
        >
          <span>Focus</span>
          <Icons.Eye size={16} />
        </NodeFocus>
      </NodeTitle>
    ),
    [field, theme, fade, selectedNode],
  );
  return (
    <Content
      isSelected={selectedNode?.field === field}
      isLibrary={isLibrary}
      fade={fade}
      isActive={!fade && typeof fade !== 'undefined'}
      nodeType={field.type.name as NodeTypes}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode({
          field,
          source: 'relation',
        });
      }}
    >
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
