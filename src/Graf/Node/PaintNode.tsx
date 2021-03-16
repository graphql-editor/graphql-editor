import React, { useRef } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
export interface NodeProps {
  node: ParserField;
  builtIn?: boolean;
  isLibrary?: boolean;
  isMatchedToSearch?: boolean;
  subNode?: boolean;
}
const MainNodeArea = themed(
  ({ colors: { textColor } }) =>
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
      color: Colors.grey,
      fontSize: 12,
      padding: `10px 15px`,
      userSelect: 'none',
      '-moz-user-select': '-moz-none',
      $nest: {
        '&:hover': {
          borderColor: textColor,
        },
      },
    } as NestedCSSProperties),
);
const LibraryNodeContainer = themed((theme) =>
  style({
    ...MainNodeArea(theme),
    $nest: {
      ...MainNodeArea(theme).$nest,
      ...Object.keys(theme.colors.backgrounds).reduce((a, b) => {
        a[`&.NodeType-${b}`] = {
          borderColor: `${(theme.colors.backgrounds as any)[b]}`,
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
      ...Object.keys(theme.colors.backgrounds).reduce((a, b) => {
        a[`&.NodeType-${b}`] = {
          background: `${(theme.colors.backgrounds as any)[b]}`,
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
export const PaintNode: React.FC<NodeProps> = ({
  node,
  isLibrary,
  isMatchedToSearch,
  subNode,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { setSelectedNode, selectedNode } = useTreesState();
  const { theme } = useTheme();
  return (
    <div
      className={`${NodeContainer} ${
        isLibrary ? LibraryNodeContainer(theme) : MainNodeContainer(theme)
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
