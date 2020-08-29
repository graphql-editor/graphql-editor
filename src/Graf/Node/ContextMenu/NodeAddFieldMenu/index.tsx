import React, { useState } from 'react';
import { DOM } from '@Graf/DOM';
import { ResolveCreateField } from '@GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';
import { useTreesState } from '@state/containers/trees';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@Graf/Node/components';

interface NodeAddFieldMenuProps {
  node: ParserField;
  hideMenu: () => void;
  onTreeChanged: () => void;
}

export const NodeAddFieldMenu: React.FC<NodeAddFieldMenuProps> = ({ node, hideMenu, onTreeChanged }) => {
  const { tree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  return (
    <Menu
      onMouseEnter={() => {
        DOM.scrollLock = true;
      }}
      onMouseLeave={() => {
        DOM.scrollLock = false;
      }}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch value={menuSearchValue} onChange={setMenuSearchValue} onClear={() => setMenuSearchValue('')} />
      <MenuScrollingArea>
        {ResolveCreateField(node, tree.nodes)
          ?.sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()))
          .map((f) => (
            <MenuItem
              key={f.name}
              node={f}
              onClick={() => {
                node.args?.push({
                  ...f,
                  description: undefined,
                  directives: [],
                  interfaces: undefined,
                  type: {
                    name: f.name,
                  },
                  name: f.name[0].toLowerCase() + f.name.slice(1),
                  args: [],
                });
                hideMenu();
                DOM.scrollLock = false;
                onTreeChanged();
              }}
            />
          ))}
      </MenuScrollingArea>
    </Menu>
  );
};
