import React, { useState } from 'react';
import { DOM } from '@/Graf/DOM';
import { ResolveImplementInterface } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@/Graf/Node/components';

interface NodeImplementInterfacesMenuProps {
  node: ParserField;
  hideMenu: () => void;
  onTreeChanged: () => void;
}

export const NodeImplementInterfacesMenu: React.FC<NodeImplementInterfacesMenuProps> = ({
  node,
  hideMenu,
  onTreeChanged,
}) => {
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
      hideMenu={() => hideMenu()}
    >
      <MenuSearch value={menuSearchValue} onChange={setMenuSearchValue} onClear={() => setMenuSearchValue('')} />
      <MenuScrollingArea>
        {ResolveImplementInterface(node, tree.nodes)
          ?.sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((a) => !node.interfaces?.includes(a.name))
          .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()))
          .map((f) => (
            <MenuItem
              key={f.name}
              node={f}
              onClick={() => {
                node.interfaces?.push(f.name);
                const argsToPush = f.args?.filter((a) => !node.args?.find((na) => na.name === a.name)) || [];
                node.args = node.args?.concat(argsToPush);
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
