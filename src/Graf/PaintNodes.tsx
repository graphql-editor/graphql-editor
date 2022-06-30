import React, { useMemo } from 'react';
import {
  TypeDefinitionDisplayMap,
  TypeSystemExtension,
  TypeExtension,
} from 'graphql-js-tree';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
import { useSortState } from '@/state/containers/sort';
import { SortAlphabeticallyButton } from './Node/components/SortAlphabeticallyButton';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Main = style({
  width: '100%',
  position: 'relative',
  fontFamily,
  transition: `opacity 0.25s ease-in-out`,
  paddingBottom: 300,
});

const SortContainer = themed((theme) =>
  style({
    position: 'absolute',
    right: 20,
    top: 20,
    color: theme.backgrounds.type,
  }),
);

export const PaintNodes: React.FC = () => {
  const { libraryTree, tree, readonly } = useTreesState();
  const { orderTypes } = useSortState();
  const { theme } = useTheme();
  const baseTypes = [...orderTypes.map((t) => t.name)].map((d) => ({
    node: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `root-${d}`,
      },
      args: tree.nodes.filter((n) => n.data.type === d),
    },
    libraryNode: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `library-${d}`,
      },
      args: libraryTree.nodes.filter((n) => n.data.type === d),
    },
  }));
  const RootBaseTypes = useMemo(
    () =>
      baseTypes.map((d) => (
        <RootNode
          readonly={readonly}
          key={d.node.type.name}
          node={d.node}
          libraryNode={d.libraryNode}
        />
      )),
    [baseTypes],
  );

  return (
    <div className={Main}>
      <div className={SortContainer(theme)}>
        <SortAlphabeticallyButton />
      </div>
      {RootBaseTypes}
      <RootExtendNode
        readonly={readonly}
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
