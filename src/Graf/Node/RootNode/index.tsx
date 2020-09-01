import React, { useRef, useState } from 'react';
import { ParserField, TypeDefinitionDisplayMap, TypeSystemDefinition, Directive } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { NewNode } from '@/Graf/Node/NewNode';
import { Colors } from '@/Colors';
import { GraphQLColors } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { MenuSearch } from '@/Graf/Node/components';
export interface RootNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
  onClick: (name: string, position: { offsetLeft: number; offsetTop: number; width: number }) => void;
  onTreeChanged: () => void;
}
const NodeCaption = style({
  flexBasis: '100%',
  margin: `15px 15px`,
  display: 'flex',
  borderBottom: `1px solid ${Colors.grey[5]}`,
  paddingBottom: 5,
  alignItems: 'center',
  $nest: {
    ...Object.keys(GraphQLColors).reduce((a, b) => {
      a[`&.CaptionType-${b}`] = {
        color: `${GraphQLColors[b]}bb`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
const CaptionTitle = style({
  marginRight: 10,
});
const NodeContainer = style({
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
});

export const RootNode: React.FC<RootNodeProps> = ({ node, libraryNode, onClick, onTreeChanged }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { tree } = useTreesState();

  const [filterNodes, setFilterNodes] = useState('');

  return (
    <div className={`${NodeContainer}`} ref={thisNode}>
      <div className={`${NodeCaption} CaptionType-${node.name}`}>
        <span className={CaptionTitle}>{node.name}</span>
        <MenuSearch
          onClear={() => {
            setFilterNodes('');
          }}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </div>
      {
        <NewNode
          node={node}
          onCreate={(name) => {
            tree.nodes.push({
              ...node,
              name,
              args: [],
              type: {
                name: (TypeDefinitionDisplayMap as any)[node.data.type as any],
                ...(node.data.type === TypeSystemDefinition.DirectiveDefinition
                  ? {
                      directiveOptions: [Directive.OBJECT],
                    }
                  : {}),
              },
            });
            onTreeChanged();
          }}
        />
      }
      {node.args
        ?.filter((a) => a.name.toLowerCase().includes(filterNodes.toLowerCase()))
        .map((a, i) => {
          return <PaintNode key={a.name} node={a} onClick={(position) => onClick(a.name, position)} />;
        })}
      {libraryNode?.args
        ?.filter((a) => a.name.toLowerCase().includes(filterNodes.toLowerCase()))
        .map((a, i) => {
          return <PaintNode isLibrary={true} key={a.name} node={a} onClick={(position) => onClick(a.name, position)} />;
        })}
    </div>
  );
};
