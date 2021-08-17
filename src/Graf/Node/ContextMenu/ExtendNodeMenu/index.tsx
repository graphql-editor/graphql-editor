import React, { useState } from 'react';
import { ResolveExtension } from '@/GraphQL/Resolve';
import {
  TypeExtension,
  TypeSystemDefinition,
  TypeDefinitionDisplayMap,
  ParserField,
} from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from '@/Graf/Node/components';

interface ExtendNodeMenuProps {
  hideMenu: () => void;
}

export const ExtendNodeMenu: React.FC<ExtendNodeMenuProps> = ({ hideMenu }) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const allNodes = tree.nodes.concat(libraryTree.nodes);
  const filteredNodes = allNodes
    .filter(
      (a) =>
        ![
          TypeExtension.EnumTypeExtension,
          TypeExtension.InputObjectTypeExtension,
          TypeExtension.InterfaceTypeExtension,
          TypeExtension.ObjectTypeExtension,
          TypeExtension.ScalarTypeExtension,
          TypeExtension.UnionTypeExtension,
          TypeSystemDefinition.DirectiveDefinition,
        ].find((o) => a.data.type === o),
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((a) =>
      a.name.toLowerCase().includes(menuSearchValue.toLowerCase()),
    );
  const onClickFilteredNode = (f: ParserField) => {
    tree.nodes.push({
      data: {
        type: ResolveExtension(f.data.type!),
      },
      description: undefined,
      type: {
        name: TypeDefinitionDisplayMap[ResolveExtension(f.data.type!)!],
      },
      name: f.name,
      args: [],
    });
    hideMenu();
    setTree({ ...tree });
  };
  return (
    <Menu
      menuName={'Extend node'}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes.length > 0) {
            onClickFilteredNode(filteredNodes[0]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
        onClear={() => setMenuSearchValue('')}
      />
      <MenuScrollingArea>
        {filteredNodes.map((f) => (
          <MenuItem
            key={f.name}
            node={f}
            onClick={() => {
              onClickFilteredNode(f);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
};
