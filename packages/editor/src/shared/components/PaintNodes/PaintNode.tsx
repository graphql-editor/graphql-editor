import React, { useEffect, useRef } from 'react';
import { ParserField, getTypeName, compareParserFields } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useLayoutState, useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useSortState } from '@/state/containers/sort';
import { Error } from '@/shared/icons';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/shared/dnd';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { fontFamilySans } from '@/vars';
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
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
  isRelatedNode?: boolean;
}

const MainNodeArea = styled.div<MainNodeAreaProps>`
  position: relative;
  border-color: transparent;
  border-radius: 4px;
  margin-left: ${({ isDragOver }) => (isDragOver ? '40px' : '0')};
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.dimmed};
  font-size: 12px;
  font-weight: 400;
  font-family: ${fontFamilySans};
  padding: 0 15px;
  height: 40px;
  user-select: none;
  border-width: 1px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  color: ${({ theme, nodeType }) => {
    return theme.colors[nodeType] ? `${theme.colors[nodeType]}` : 'transparent';
  }};
  background-color: ${({ theme, isDragNotAllowed, isLibrary }) => {
    if (isDragNotAllowed) return theme.disabled;
    if (isLibrary) return 'transparent';
    return theme.background.mainMiddle;
  }};
  opacity: ${({ isRelatedNode }) => {
    if (isRelatedNode) return 0.9;
    return 1;
  }};

  border-color: ${({ theme, nodeType, isBaseNode, isLibrary, isError }) => {
    if (isError) return theme.background.error;
    if (isBaseNode) return theme.backgroundedText;
    if (!isLibrary) return 'transparent';
    return theme.backgrounds[nodeType]
      ? `${theme.backgrounds[nodeType]}`
      : 'transparent';
  }};
  &:hover {
    border-color: ${({ theme, nodeType, isBaseNode, isError }) => {
      if (isError) return theme.background.error;
      if (isBaseNode) return theme.backgroundedText;
      return theme.backgrounds[nodeType]
        ? `${theme.backgrounds[nodeType]}`
        : 'transparent';
    }};
  }
`;

export const PaintNode: React.FC<NodeProps> = ({ node, isLibrary }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { setSelectedNode, selectedNode, tree, setTree } = useTreesState();
  const { isNodeBaseType, setIsUserOrder, setIsSortAlphabetically } =
    useSortState();
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
      selectedNode?.field &&
      compareParserFields(selectedNode.field)(node)
    ) {
      thisNode.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedNode]);

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    endNodeName: string,
  ) => {
    e.stopPropagation();
    setIsUserOrder(true);
    setIsSortAlphabetically(false);
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
      id={getTypeName(node.type.fieldType)}
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
      nodeType={getTypeName(node.type.fieldType) as NodeTypes}
      isLibrary={isLibrary}
      isBaseNode={isNodeBaseType(node.type.operations)}
      isDragNotAllowed={isDragNotAllowed}
      isDragOver={isDragOver}
      isError={errorNodeNames?.includes(node.name)}
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
