import React from 'react';
import {
  TypeDefinition,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  TypeSystemExtension,
  TypeExtension,
} from 'graphql-zeus';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { FIELD_HEIGHT } from './constants';
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
export interface PaintNodesProps {
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
export const PaintNodes: React.FC<PaintNodesProps> = ({ blur }) => {
  const { libraryTree, tree } = useTreesState();

  const area = tree.nodes.length * 400 * FIELD_HEIGHT * 2;
  const wArea = window.innerHeight * window.innerWidth;
  const totalArea = Math.max(area / wArea, 1);
  const width = Math.floor(Math.sqrt(totalArea) * 100);
  const baseTypes = [
    TypeDefinition.ObjectTypeDefinition,
    TypeDefinition.InterfaceTypeDefinition,
    TypeDefinition.UnionTypeDefinition,
    TypeDefinition.EnumTypeDefinition,
    TypeDefinition.ScalarTypeDefinition,
    TypeDefinition.InputObjectTypeDefinition,
  ];
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
      {baseTypes.map((d) => (
        <RootNode
          key={d}
          node={{
            name: TypeDefinitionDisplayMap[d],
            data: {
              type: d,
            },
            type: {
              name: 'root',
            },
            args: tree.nodes.filter((n) => n.data.type === d).sort((a, b) => (a.name > b.name ? 1 : -1)),
          }}
          libraryNode={{
            name: TypeDefinitionDisplayMap[d],
            data: {
              type: d,
            },
            type: {
              name: 'root',
            },
            args: libraryTree.nodes.filter((n) => n.data.type === d).sort((a, b) => (a.name > b.name ? 1 : -1)),
          }}
        />
      ))}
      <RootNode
        node={{
          name: TypeDefinitionDisplayMap.DirectiveDefinition,
          data: {
            type: TypeSystemDefinition.DirectiveDefinition,
          },
          type: {
            name: 'root',
          },
          args: tree.nodes
            .filter((n) => n.data.type === TypeSystemDefinition.DirectiveDefinition)
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
        libraryNode={{
          name: TypeDefinitionDisplayMap.DirectiveDefinition,
          data: {
            type: TypeSystemDefinition.DirectiveDefinition,
          },
          type: {
            name: 'root',
          },
          args: libraryTree.nodes
            .filter((n) => n.data.type === TypeSystemDefinition.DirectiveDefinition)
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
      />
      <RootExtendNode
        node={{
          name: TypeSystemExtension.TypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            name: 'root',
          },
          args: tree.nodes
            .filter(
              (n) =>
                n.data.type === TypeExtension.ObjectTypeExtension ||
                n.data.type === TypeExtension.InputObjectTypeExtension ||
                n.data.type === TypeExtension.EnumTypeExtension ||
                n.data.type === TypeExtension.ScalarTypeExtension ||
                n.data.type === TypeExtension.InterfaceTypeExtension ||
                n.data.type === TypeExtension.UnionTypeExtension,
            )
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
        libraryNode={{
          name: TypeDefinitionDisplayMap.ObjectTypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            name: 'root',
          },
          args: libraryTree.nodes
            .filter(
              (n) =>
                n.data.type === TypeExtension.ObjectTypeExtension ||
                n.data.type === TypeExtension.InputObjectTypeExtension ||
                n.data.type === TypeExtension.EnumTypeExtension ||
                n.data.type === TypeExtension.ScalarTypeExtension ||
                n.data.type === TypeExtension.InterfaceTypeExtension ||
                n.data.type === TypeExtension.UnionTypeExtension,
            )
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
      />
    </div>
  );
};
