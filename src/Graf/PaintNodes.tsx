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
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
const Main = style({
  width: '100%',
  position: 'relative',
  fontFamily,
  transition: `opacity 0.25s ease-in-out`,
  paddingBottom: 300,
});
export const PaintNodes: React.FC = () => {
  const { libraryTree, tree } = useTreesState();
  const baseTypes = [
    TypeDefinition.ObjectTypeDefinition,
    TypeDefinition.InterfaceTypeDefinition,
    TypeDefinition.UnionTypeDefinition,
    TypeDefinition.EnumTypeDefinition,
    TypeDefinition.ScalarTypeDefinition,
    TypeDefinition.InputObjectTypeDefinition,
  ].map((d) => ({
    node: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `root-${d}`,
      },
      args: tree.nodes.filter((n) => n.data.type === d).sort((a, b) => (a.name > b.name ? 1 : -1)),
    },
    libraryNode: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `library-${d}`,
      },
      args: libraryTree.nodes.filter((n) => n.data.type === d).sort((a, b) => (a.name > b.name ? 1 : -1)),
    },
  }));
  return (
    <div className={Main}>
      {baseTypes.map((d) => (
        <RootNode key={d.node.type.name} node={d.node} libraryNode={d.libraryNode} />
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
