import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { GraphQLColors } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { MenuSearch } from '@/Graf/Node/components';
export interface SubNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
}

const NodeCaption = style({
  flexBasis: '100%',
  margin: `15px 15px`,
  display: 'flex',
  borderBottom: `1px solid`,
  paddingBottom: 5,
  alignItems: 'center',
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
  $nest: {
    ...Object.keys(GraphQLColors).reduce((a, b) => {
      a[`&.CaptionType-${b}`] = {
        color: `${GraphQLColors[b]}`,
        borderColor: `${GraphQLColors[b]}22`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const CaptionTitle = style({
  marginRight: 10,
});
const NodeContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: 'auto',
  zIndex: 2,
  overflowY: 'hidden',
});

export const SubNode: React.FC<SubNodeProps> = ({ node, libraryNode }) => {
  const thisNode = useRef<HTMLDivElement>(null);

  const [filterNodes, setFilterNodes] = useState('');
  return (
    <div className={`${NodeContainer}`} ref={thisNode}>
      <div className={`${NodeCaption} CaptionType-${node.type.name}`}>
        <span className={CaptionTitle}>{node.name}</span>
        <MenuSearch
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </div>
      {node.args?.map((a, i) => {
        return (
          <PaintNode
            key={a.name}
            node={a}
            subNode
            isMatchedToSearch={a.name.toLowerCase().includes(filterNodes.toLowerCase())}
          />
        );
      })}
      {libraryNode?.args?.map((a, i) => {
        return (
          <PaintNode
            isLibrary={true}
            key={a.name}
            node={a}
            subNode
            isMatchedToSearch={a.name.toLowerCase().includes(filterNodes.toLowerCase())}
          />
        );
      })}
    </div>
  );
};
