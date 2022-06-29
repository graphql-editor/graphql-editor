import React, { useEffect, useRef } from 'react';
import { ParserField } from 'graphql-js-tree';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { themed } from '@/Theming/utils';
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
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
  isMatchedToSearch?: boolean;
  subNode?: boolean;
}
const MainNodeArea = themed(
  ({ backgroundedText }) =>
    ({
      position: 'relative',
      borderColor: 'transparent',
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: 4,
      cursor: 'pointer',
      transition: `all 0.25s ease-in-out`,
      display: 'flex',
      alignItems: 'stretch',
      color: backgroundedText,
      fontSize: 12,
      padding: `9.5px 15px`,
      userSelect: 'none',
      '-moz-user-select': '-moz-none',
      $nest: {
        '&:hover': {
          borderColor: backgroundedText,
        },
      },
    } as NestedCSSProperties),
);
const LibraryNodeContainer = themed((theme) =>
  style({
    ...MainNodeArea(theme),
    $nest: {
      ...MainNodeArea(theme).$nest,
      ...Object.keys(theme.backgrounds).reduce((a, b) => {
        a[`&.NodeType-${b}`] = {
          borderColor: `${(theme.backgrounds as any)[b]}`,
          borderStyle: 'dashed',
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
    },
  }),
);
const MainNodeContainer = themed((theme) =>
  style({
    ...MainNodeArea(theme),
    $nest: {
      ...MainNodeArea(theme).$nest,
      ...Object.keys(theme.backgrounds).reduce((a, b) => {
        a[`&.NodeType-${b}`] = {
          background: `${(theme.backgrounds as any)[b]}`,
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
    },
  }),
);
const NodeContainer = style({
  margin: 10,
});
const MatchedSearchContainer = style({
  opacity: 1,
});
const NoMatchedSearchContainer = style({
  opacity: 0.2,
});
const NotSelected = style({
  opacity: 0.4,
});
const RelatedNode = style({
  opacity: 0.9,
});

const ErrorNode = themed((theme) =>
  style({
    display: '',
    borderColor: `${theme.background.error} !important`,
    borderWidth: `2px !important`,
    opacity: 1,
  }),
);

const BaseNode = themed((theme) =>
  style({
    color: `${theme.backgroundedText} !important`,
    borderColor: `${theme.backgroundedText} !important`,
  }),
);

const DragOverStyle = style({
  marginLeft: 40,
});

const DragNotAllowed = themed((theme) =>
  style({
    backgroundColor: `${theme.disabled} !important`,
  }),
);

export const PaintNode: React.FC<NodeProps> = ({
  node,
  isLibrary,
  isMatchedToSearch,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const {
    setSelectedNode,
    selectedNode,
    nodesImplementsInterface,
    checkRelatedNodes,
    tree,
    setTree,
  } = useTreesState();
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

  return (
    <div
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
      className={`
      ${
        !isNodeBaseType(node.type.operations) &&
        node.name === dragOverStylesDiagram?.nodeName &&
        dndType === dragOverStylesDiagram.nodeType
          ? DragOverStyle
          : dragOverStylesDiagram &&
            node.name === dragOverStylesDiagram?.nodeName &&
            dndType !== dragOverStylesDiagram.nodeType
          ? DragNotAllowed(theme)
          : null
      }
      ${isNodeBaseType(node.type.operations) ? BaseNode(theme) : ''}
      ${NodeContainer} 
      ${isLibrary ? LibraryNodeContainer(theme) : MainNodeContainer(theme)} ${
        isMatchedToSearch ? MatchedSearchContainer : NoMatchedSearchContainer
      } ${
        selectedNode
          ? compareNodesWithData(node, selectedNode.field)
            ? ''
            : NotSelected
          : ''
      }
      ${nodesImplementsInterface.includes(node) ? RelatedNode : ''}
      ${errorNodeNames?.includes(node.name) ? ErrorNode(theme) : ''}
      NodeType-${node.type.name} 
      `}
      ref={thisNode}
      onClick={(e) => {
        e.stopPropagation();
        checkRelatedNodes(node);
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
    </div>
  );
};
