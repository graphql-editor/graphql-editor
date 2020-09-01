import React, { useState } from 'react';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@/Graf/Node/components';
import { DOM } from '@/Graf/DOM';
import { ResolveDirectives } from '@/GraphQL/Resolve';
import { ParserField, Instances } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';

interface NodeAddDirectiveMenuProps {
  node: ParserField;
  hideMenu: () => void;
  onTreeChanged: () => void;
}

export const NodeAddDirectiveMenu: React.FC<NodeAddDirectiveMenuProps> = ({ node, hideMenu, onTreeChanged }) => {
  const { tree, libraryTree } = useTreesState();
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
        {ResolveDirectives(node, tree.nodes.concat(libraryTree.nodes))
          ?.sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()))
          .map((f) => (
            <MenuItem
              key={f.name}
              node={f}
              onClick={() => {
                node.directives?.push({
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
                DOM.scrollLock = false;
                onTreeChanged();
              }}
            />
          ))}
      </MenuScrollingArea>
    </Menu>
  );
};
