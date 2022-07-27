import React, { useEffect, useRef } from 'react';
import { ParserField } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useLayoutState, useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useSortState } from '@/state/containers/sort';
import { compareNodesWithData } from '@/compare/compareNodes';
import { Error } from '../icons';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from './ActiveNode/dnd';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
  isMatchedToSearch?: boolean;
  subNode?: boolean;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

interface MainNodeAreaProps {
  nodeType: NodeTypes;
  isLibrary?: boolean;
  isBaseNode?: boolean;
  isDragNotAllowed?: boolean;
  isDragOver?: boolean;
  isError?: boolean;
  isMatchedToSearch?: boolean;
  isNotSelected?: boolean;
  isRelatedNode?: boolean;
}

const MainNodeArea = styled.div<MainNodeAreaProps>`
  position: relative;
  border-color: transparent;
  border-radius: 4px;
  margin: 10px;
  margin-left: ${({ isDragOver }) => (isDragOver ? '40px' : '10px')};
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 12px;
  padding: 9.5px 15px;
  user-select: none;
  border-width: 2px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  border-color: ${({ theme, nodeType, isBaseNode, isError }) => {
    if (isError) return theme.background.error;
    if (isBaseNode) return theme.backgroundedText;
    return theme.backgrounds[nodeType]
      ? theme.backgrounds[nodeType]
      : 'transparent';
  }};
  background-color: ${({ theme, nodeType, isDragNotAllowed, isLibrary }) => {
    if (isDragNotAllowed) return theme.disabled;
    if (isLibrary) return 'transparent';
    return theme.backgrounds[nodeType]
      ? theme.backgrounds[nodeType]
      : 'transparent';
  }};
  opacity: ${({ isMatchedToSearch, isNotSelected, isRelatedNode }) => {
    if (isRelatedNode) return 0.9;
    if (isNotSelected) return 0.4;
    if (isMatchedToSearch === false) return 0.2;
    return 1;
  }};

  &:hover {
    border-color: ${({ theme }) => theme.backgroundedText};
  }
`;

export const PaintNode: React.FC<NodeProps> = ({
  node,
  isLibrary,
  isMatchedToSearch,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { setSelectedNode, selectedNode, tree, setTree } = useTreesState();
  const { isNodeBaseType, setIsUserOrder } = useSortState();
  const { theme } = useTheme();
  const { errorNodeNames } = useErrorsState();
  const {
    setDragOverStylesDiagram,
    dragOverStylesDiagram,
    dndType,
    setDndType,
  } = useLayoutState();

  useEffect(() => {
    if (
      thisNode &&
      thisNode.current &&
      compareNodesWithData(selectedNode?.field, node)
    ) {
      thisNode.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedNode]);

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    endNodeName: string,
  ) => {
    e.stopPropagation();
    setIsUserOrder(true);
    const startNodeName = e.dataTransfer?.getData('startName');
    if (endNodeName === startNodeName) return;
    const newTree = [...tree.nodes];
    const startIdx = newTree.findIndex((a) => a.name === startNodeName);
    const endIdx = newTree.findIndex((a) => a.name === endNodeName);
    newTree.splice(endIdx, 0, newTree.splice(startIdx, 1)[0]);
    setTree({ nodes: newTree });
  };

  const isDragNotAllowed =
    dragOverStylesDiagram &&
    node.name === dragOverStylesDiagram?.nodeName &&
    dndType !== dragOverStylesDiagram.nodeType;

  const isDragOver =
    !isNodeBaseType(node.type.operations) &&
    node.name === dragOverStylesDiagram?.nodeName &&
    dndType === dragOverStylesDiagram.nodeType;

  return (
    <MainNodeArea
      id={node.type.name}
      draggable={!isNodeBaseType(node.type.operations)}
      onDragStart={(e) => {
        setDndType(node.data.type);
        dragStartHandler(e, node.name);
      }}
      onDragEnd={() => {
        setDragOverStylesDiagram(undefined);
      }}
      onDragLeave={(e) => {
        dragLeaveHandler(e);
      }}
      onDrop={(e) => {
        setDragOverStylesDiagram(undefined);
        if (!isNodeBaseType(node.type.operations)) {
          dropHandler(e, node.name);
        }
      }}
      onDragOver={(e) => {
        setDragOverStylesDiagram({
          nodeName: node.name,
          nodeType: node.data.type,
        });

        dragOverHandler(e);
      }}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.PaintNode}
      nodeType={node.type.name as NodeTypes}
      isLibrary={isLibrary}
      isBaseNode={isNodeBaseType(node.type.operations)}
      isDragNotAllowed={isDragNotAllowed}
      isDragOver={isDragOver}
      isError={errorNodeNames?.includes(node.name)}
      isMatchedToSearch={isMatchedToSearch}
      isNotSelected={
        selectedNode
          ? !compareNodesWithData(node, selectedNode.field)
          : undefined
      }
      isRelatedNode={
        selectedNode?.field &&
        node?.interfaces?.includes(selectedNode.field.name)
      }
      ref={thisNode}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode({
          field: node,
          source: 'diagram',
        });
      }}
    >
      {errorNodeNames?.includes(node.name) && (
        <Error fill={theme.background.error} style={{ marginRight: 8 }} />
      )}
      {node.name}
    </MainNodeArea>
  );
};
