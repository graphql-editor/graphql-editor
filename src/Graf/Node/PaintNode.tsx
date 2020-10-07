import React, { useRef } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { GraphQLBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { NodeTitle } from './SharedNode';
import { useTreesState } from '@/state/containers/trees';
import { DOM } from '../DOM';
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
  isMatchedToSearch?: boolean;
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
        borderColor: `${GraphQLBackgrounds[b]}`,
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
        background: `${GraphQLBackgrounds[b]}`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const NodeContainer = style({
  margin: 15,
});
const MatchedSearchContainer = style({
  opacity: 1,
});
const NoMatchedSearchContainer = style({
  opacity: 0.2,
});
const UnRelatedNode = style({
  opacity: 0.2,
});
const RelatedNode = style({
  opacity: 1.0,
});
export const PaintNode: React.FC<NodeProps> = ({ node, isLibrary, isMatchedToSearch }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { setSelectedNode, setPosition, relatedToSelected } = useTreesState();
  const relatedNodes = relatedToSelected();
  let relationClass = '';
  if (relatedNodes) {
    if (relatedNodes.includes(node.name)) {
      relationClass = RelatedNode;
    } else {
      relationClass = UnRelatedNode;
    }
  }
  return (
    <div
      className={`${NodeContainer} ${relationClass} ${isLibrary ? LibraryNodeContainer : MainNodeContainer} ${
        isMatchedToSearch ? MatchedSearchContainer : NoMatchedSearchContainer
      }`}
      ref={thisNode}
      style={{}}
    >
      <div
        className={`MainNodeArea NodeType-${node.type.name}`}
        onClick={(e) => {
          e.stopPropagation();
          if (DOM.panLock) return;
          setSelectedNode(undefined);
          setTimeout(() => {
            setSelectedNode({
              name: node.name,
              dataType: node.data.type!,
            });
            const rect = thisNode.current;
            if (rect) {
              setPosition({
                offsetLeft: rect.offsetLeft,
                offsetTop: rect.offsetTop,
                width: rect.offsetWidth,
              });
            }
          }, 1);
        }}
      >
        <div className={`NodeTitle`}>
          <div className={`NodeName`}>{node.name}</div>
        </div>
      </div>
    </div>
  );
};
