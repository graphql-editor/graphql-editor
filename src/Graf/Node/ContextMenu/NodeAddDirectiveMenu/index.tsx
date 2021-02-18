import React, { useState } from 'react';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from '@/Graf/Node/components';
import { ResolveDirectives } from '@/GraphQL/Resolve';
import { ParserField, Instances } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';

interface NodeAddDirectiveMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeAddDirectiveMenu: React.FC<NodeAddDirectiveMenuProps> = ({
  node,
  hideMenu,
}) => {
  const { tree, libraryTree, setTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const filteredNodes = ResolveDirectives(
    node,
    tree.nodes.concat(libraryTree.nodes),
  )
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((a) =>
      a.name.toLowerCase().includes(menuSearchValue.toLowerCase()),
    );
  const onNodeClick = (f: ParserField) => {
    if (!node.directives) {
      node.directives = [];
    }
    node.directives.push({
      ...f,
      type: {
        name: f.name,
      },
      name: f.name[0].toLowerCase() + f.name.slice(1),
      args: [],
      data: {
        type: Instances.Directive,
      },
    });
    hideMenu();
    setTree({ ...tree });
  };
  return (
    <Menu
      menuName={'Add directive'}
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
        {filteredNodes.map((f) => (
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
