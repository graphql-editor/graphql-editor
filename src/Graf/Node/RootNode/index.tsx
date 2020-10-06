import React, { useRef, useState } from 'react';
import { ParserField, TypeDefinitionDisplayMap, TypeSystemDefinition, Directive } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { NewNode } from '@/Graf/Node/NewNode';
import { GraphQLColors } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { MenuSearch } from '@/Graf/Node/components';
export interface RootNodeProps {
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
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
});

export const RootNode: React.FC<RootNodeProps> = ({ node, libraryNode }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { tree, setTree, readonly } = useTreesState();

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
      {!readonly && (
        <NewNode
          node={node}
          onCreate={(name) => {
            if (node.data.type === TypeSystemDefinition.DirectiveDefinition) {
              tree.nodes.push({
                ...node,
                name,
                args: [],
                type: {
                  name: TypeDefinitionDisplayMap[node.data.type],
                  directiveOptions: [Directive.OBJECT],
                },
              });
            } else {
              tree.nodes.push({
                ...node,
                name,
                args: [],
                type: {
                  name: (TypeDefinitionDisplayMap as any)[node.data.type as any],
                },
              });
            }
            setTree({ ...tree });
          }}
        />
      )}
      {node.args?.map((a, i) => {
        return (
          <PaintNode
            key={a.name}
            node={a}
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
            isMatchedToSearch={a.name.toLowerCase().includes(filterNodes.toLowerCase())}
          />
        );
      })}
    </div>
  );
};
