import React, { useEffect, useMemo, useState } from 'react';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { getTypeName, ParserField } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from '@/Graf/Node/components';
import { sortNodes } from '@/Graf/Node/ContextMenu/sort';
import { changeNodeName } from '@/utils';

interface NodeChangeFieldTypeMenuProps {
  node: ParserField;
  fieldIndex: number;
  hideMenu: () => void;
}

export const NodeChangeFieldTypeMenu: React.FC<
  NodeChangeFieldTypeMenuProps
> = ({ node, fieldIndex, hideMenu }) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creationNodes = useMemo(
    () => ResolveCreateField(node, tree.nodes.concat(libraryTree.nodes)) || [],
    [tree.nodes, libraryTree.nodes],
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [tree.nodes, libraryTree.nodes, menuSearchValue],
  );

  useEffect(() => {
    if (!menuSearchValue) {
      setSelectedIndex(0);
    }
  }, [menuSearchValue]);

  const fNLength = filteredNodes?.length || 1;
  const selectedNodeIndex =
    (selectedIndex < 0 ? fNLength - selectedIndex : selectedIndex) % fNLength;

  const onNodeClick = (f: ParserField) => {
    if (node.args) {
      node.args[fieldIndex].data.type = f.data.type;
      changeNodeName(node.args[fieldIndex].type.fieldType, f.name);
    }
    hideMenu();
    setTree({ ...tree });
  };
  return (
    <Menu
      menuName={'Change type'}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes && filteredNodes.length > 0) {
            onNodeClick(filteredNodes[selectedNodeIndex]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
        onClear={() => setMenuSearchValue('')}
      />
      <MenuScrollingArea
        controls={{
          arrowDown: () => setSelectedIndex((s) => s + 1),
          arrowUp: () => setSelectedIndex((s) => s - 1),
        }}
      >
        {filteredNodes?.map((f, i) => (
          <TypedMenuItem
            key={f.name}
            dataType={getTypeName(f.type.fieldType)}
            type={f.name}
            selected={i === selectedNodeIndex}
            onClick={() => {
              onNodeClick(f);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
};
