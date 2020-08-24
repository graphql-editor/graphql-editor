import React, { useRef } from 'react';
import { ParserField, TypeDefinitionDisplayMap } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from './PaintNode';
import { NewNode } from './NewNode';
import { Colors } from '@Colors';
import { GraphQLColors } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
export interface NodeProps {
  node: ParserField;
  libraryNode?: ParserField;
  nodes: ParserField[];
  onClick: (name: string, position: { offsetLeft: number; offsetTop: number; width: number }) => void;
  onTreeChanged: () => void;
}
const NodeCaption = style({
  flexBasis: '100%',
  margin: `15px 15px`,
  borderBottom: `1px solid ${Colors.grey[5]}`,
  paddingBottom: 5,
  $nest: {
    ...Object.keys(GraphQLColors).reduce((a, b) => {
      a[`&.CaptionType-${b}`] = {
        color: `${GraphQLColors[b]}bb`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const NodeContainer = style({
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
});

export const RootNode: React.FC<NodeProps> = ({ node, libraryNode, nodes, onClick, onTreeChanged }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  return (
    <div className={`${NodeContainer}`} ref={thisNode}>
      <div className={`${NodeCaption} CaptionType-${node.name}`}>{node.name}</div>
      {
        <NewNode
          nodes={nodes}
          node={node}
          onCreate={(name) => {
            nodes.push({
              ...node,
              name,
              args: [],
              type: { name: (TypeDefinitionDisplayMap as any)[node.data.type as any] },
            });
            onTreeChanged();
          }}
        />
      }
      {node.args?.map((a, i) => {
        return <PaintNode key={a.name} node={a} onClick={(position) => onClick(a.name, position)} />;
      })}
      {libraryNode?.args?.map((a, i) => {
        return <PaintNode isLibrary={true} key={a.name} node={a} onClick={(position) => onClick(a.name, position)} />;
      })}
    </div>
  );
};
