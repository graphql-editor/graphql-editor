import React, { useState } from 'react';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from '@/Graf/Node/components';

interface NodeAddFieldMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeAddFieldMenu: React.FC<NodeAddFieldMenuProps> = ({
  node,
  hideMenu,
}) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const filteredNodes = ResolveCreateField(
    node,
    tree.nodes.concat(libraryTree.nodes),
  )
    ?.sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((a) =>
      a.name.toLowerCase().includes(menuSearchValue.toLowerCase()),
    );
  const onNodeClick = (f: ParserField) => {
    let newName = f.name[0].toLowerCase() + f.name.slice(1);
    const existingNodes =
      node.args?.filter((a) => a.name.match(`${newName}\d?`)) || [];
    if (existingNodes.length > 0) {
      newName = `${newName}${existingNodes.length}`;
    }
    node.args?.push({
      ...f,
      description: undefined,
      directives: [],
      interfaces: undefined,
      type: {
        name: f.name,
      },
      name: newName,
      args: [],
    });
    hideMenu();
    setTree({ ...tree });
  };
  return (
    <Menu
      menuName={'Create Field'}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes && filteredNodes.length > 0) {
            onNodeClick(filteredNodes[0]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
        onClear={() => setMenuSearchValue('')}
      />
      <MenuScrollingArea>
        {filteredNodes?.map((f) => (
          <MenuItem
            key={f.name}
            node={f}
            onClick={() => {
              onNodeClick(f);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
};
