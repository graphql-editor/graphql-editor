import React, { useState } from 'react';
import { DOM } from '@/Graf/DOM';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@/Graf/Node/components';

interface NodeAddFieldMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeAddFieldMenu: React.FC<NodeAddFieldMenuProps> = ({ node, hideMenu }) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  return (
    <Menu
      menuName={'Create Field'}
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
        {ResolveCreateField(node, tree.nodes.concat(libraryTree.nodes))
          ?.sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()))
          .map((f) => (
            <MenuItem
              key={f.name}
              node={f}
              onClick={() => {
                let newName = f.name[0].toLowerCase() + f.name.slice(1);
                const existingNodes = node.args?.filter((a) => a.name.match(`${newName}\d?`)) || [];
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
                DOM.scrollLock = false;
                setTree({ ...tree });
              }}
            />
          ))}
      </MenuScrollingArea>
    </Menu>
  );
};
