import React, { useState } from 'react';
import { DOM } from '@/Graf/DOM';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@/Graf/Node/components';

interface NodeChangeFieldTypeMenuProps {
  node: ParserField;
  fieldIndex: number;
  hideMenu: () => void;
}

export const NodeChangeFieldTypeMenu: React.FC<NodeChangeFieldTypeMenuProps> = ({ node, fieldIndex, hideMenu }) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const filteredNodes = ResolveCreateField(node, tree.nodes.concat(libraryTree.nodes))
    ?.sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()));
  const onNodeClick = (f: ParserField) => {
    if (node.args) {
      node.args[fieldIndex].data.type = f.data.type;
      node.args[fieldIndex].type.name = f.name;
    }
    hideMenu();
    DOM.scrollLock = false;
    setTree({ ...tree });
  };
  return (
    <Menu
      menuName={'Change type'}
      onMouseEnter={() => {
        DOM.scrollLock = true;
      }}
      onMouseLeave={() => {
        DOM.scrollLock = false;
      }}
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
