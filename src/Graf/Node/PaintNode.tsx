import React, { useRef } from 'react';
import { ParserField } from 'graphql-js-tree';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useSortState } from '@/state/containers/sort';
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
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      cursor: 'pointer',
      transition: `all 0.25s ease-in-out`,
      display: 'flex',
      alignItems: 'stretch',
      color: backgroundedText,
      fontSize: 12,
      padding: `10px 15px`,
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
const BaseNode = themed((theme) =>
  style({
    color: `${theme.backgroundedText} !important`,
    borderColor: `${theme.backgroundedText} !important`,
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
  } = useTreesState();
  const { isNodeBaseType } = useSortState();
  const { theme } = useTheme();

  return (
    <div
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.PaintNode}
      className={`
      ${isNodeBaseType(node.type.operations) ? BaseNode(theme) : null}
      ${NodeContainer} 
      ${isLibrary ? LibraryNodeContainer(theme) : MainNodeContainer(theme)} ${
        isMatchedToSearch ? MatchedSearchContainer : NoMatchedSearchContainer
      } ${selectedNode ? (selectedNode !== node ? NotSelected : '') : ''}
      ${
        nodesImplementsInterface.find((a) => a.name === node.name)
          ? RelatedNode
          : ''
      }NodeType-${node.type.name} 
      `}
      ref={thisNode}
      onClick={(e) => {
        e.stopPropagation();
        checkRelatedNodes(node);
        setSelectedNode(node);
      }}
    >
      {node.name}
    </div>
  );
};
