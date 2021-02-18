import React, { useRef } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { GraphQLBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
  isMatchedToSearch?: boolean;
  subNode?: boolean;
}
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  display: 'flex',
  alignItems: 'stretch',
  color: Colors.grey[0],
  fontSize: 12,
  padding: `10px 15px`,
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
  $nest: {
    '&:hover': {
      borderColor: Colors.green[0],
    },
  },
};
const LibraryNodeContainer = style({
  ...MainNodeArea,
  $nest: {
    ...MainNodeArea.$nest,
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`&.NodeType-${b}`] = {
        borderColor: `${GraphQLBackgrounds[b]}`,
        borderStyle: 'dashed',
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const MainNodeContainer = style({
  ...MainNodeArea,
  background: Colors.grey[8],
  $nest: {
    ...MainNodeArea.$nest,
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`&.NodeType-${b}`] = {
        background: `${GraphQLBackgrounds[b]}`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
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
export const PaintNode: React.FC<NodeProps> = ({
  node,
  isLibrary,
  isMatchedToSearch,
  subNode,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { setSelectedNode, selectedNode } = useTreesState();
  return (
    <div
      className={`${NodeContainer} ${
        isLibrary ? LibraryNodeContainer : MainNodeContainer
      } ${
        isMatchedToSearch ? MatchedSearchContainer : NoMatchedSearchContainer
      } ${
        selectedNode ? (selectedNode !== node ? NotSelected : '') : ''
      } NodeType-${node.type.name}`}
      ref={thisNode}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
      }}
    >
      {node.name}
    </div>
  );
};
