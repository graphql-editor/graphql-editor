import React from 'react';
import { ParserTree, TypeDefinition, TypeDefinitionDisplayMap } from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@vars';
import { FIELD_HEIGHT } from './constants';
import { DOM } from './DOM';
import { RootNode } from './Node/RootNode';
export interface PaintNodesProps {
  tree: ParserTree;
  onSelectNode: (name: string, position: { offsetLeft: number; offsetTop: number; width: number }) => void;
  onTreeChanged: () => void;
  blur?: boolean;
}
const Main = style({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  fontFamily,
  transition: `opacity 0.25s ease-in-out`,
});
export const PaintNodes: React.FC<PaintNodesProps> = ({ tree, onSelectNode, onTreeChanged, blur }) => {
  const area = tree.nodes.length * 400 * FIELD_HEIGHT * 2;
  const wArea = window.innerHeight * window.innerWidth;
  const totalArea = Math.max(area / wArea, 1);
  const width = Math.floor(Math.sqrt(totalArea) * 100);
  return (
    <div
      className={Main}
      style={{
        width: `${width}%`,
        ...(blur
          ? {
              opacity: 0.5,
            }
          : {}),
      }}
    >
      {[
        TypeDefinition.ObjectTypeDefinition,
        TypeDefinition.InterfaceTypeDefinition,
        TypeDefinition.UnionTypeDefinition,
        TypeDefinition.EnumTypeDefinition,
        TypeDefinition.ScalarTypeDefinition,
        TypeDefinition.InputObjectTypeDefinition,
      ].map((d) => (
        <RootNode
          key={d}
          onClick={(name, position) => {
            if (DOM.lock) return;
            onSelectNode(name, position);
          }}
          nodes={tree.nodes}
          node={{
            name: TypeDefinitionDisplayMap[d],
            data: {
              type: d,
            },
            type: {
              name: 'root',
            },
            args: tree.nodes
              .filter((n) => n.data.type === d)
              .sort((a, b) => ((a.args?.length || 1) > (b.args?.length || 1) ? -1 : 1)),
          }}
          onTreeChanged={onTreeChanged}
        />
      ))}
    </div>
  );
};
