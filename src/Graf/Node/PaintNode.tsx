import React, { useRef } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { GraphQLBackgrounds } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { NodeTitle } from './SharedNode';
export interface NodeProps {
  node: ParserField;
  onClick: (position: { offsetLeft: number; offsetTop: number; width: number }) => void;
  builtIn?: boolean;
  isLibrary?: boolean;
}
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  $nest: {
    '.NodeTitle': {
      ...NodeTitle,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      background: 'transparent',
    },
    '&:hover': {
      borderColor: Colors.green[0],
    },
  },
};
const LibraryNodeContainer = style({
  $nest: {
    '.MainNodeArea': MainNodeArea,
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        borderColor: `${GraphQLBackgrounds[b]}bb`,
        borderStyle: 'dashed',
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const MainNodeContainer = style({
  $nest: {
    '.MainNodeArea': MainNodeArea,
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        background: `${GraphQLBackgrounds[b]}bb`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const NodeContainer = style({
  margin: 15,
});
export const PaintNode: React.FC<NodeProps> = ({ node, onClick, isLibrary }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`${NodeContainer} ${isLibrary ? LibraryNodeContainer : MainNodeContainer}`}
      ref={thisNode}
      style={{}}
    >
      <div
        className={`MainNodeArea NodeType-${node.type.name}`}
        onClick={(e) => {
          e.stopPropagation();
          const rect = thisNode.current;
          if (rect) {
            onClick({
              offsetLeft: rect.offsetLeft,
              offsetTop: rect.offsetTop,
              width: rect.offsetWidth,
            });
          }
        }}
      >
        <div className={`NodeTitle`}>
          <div
            className={`NodeName`}
            onSeeked={(e) => {
              console.log(node);
            }}
          >
            {node.name}
          </div>
        </div>
      </div>
    </div>
  );
};
