import React, { useEffect, useMemo, useState } from 'react';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from '@/Graf/Node/components';
import { sortNodes } from '@/Graf/Node/ContextMenu/sort';
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!menuSearchValue) {
      setSelectedIndex(0);
    }
  }, [menuSearchValue]);

  const creationNodes = useMemo(
    () => ResolveCreateField(node, tree.nodes.concat(libraryTree.nodes)) || [],
    [tree.nodes, libraryTree.nodes],
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [tree.nodes, libraryTree.nodes, menuSearchValue],
  );

  const fNLength = filteredNodes?.length || 1;
  const selectedNodeIndex =
    (selectedIndex < 0 ? fNLength - selectedIndex : selectedIndex) % fNLength;

  const onNodeClick = (f: ParserField, name?: string) => {
    let newName = name || f.name[0].toLowerCase() + f.name.slice(1);
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
            onNodeClick(filteredNodes[selectedNodeIndex], menuSearchValue);
            setMenuSearchValue('');
            return;
          }
        }}
        placeholder="Field name..."
        icon="add"
        value={menuSearchValue}
        onChange={setMenuSearchValue}
        onClear={() => {
          setMenuSearchValue('');
        }}
      />
      <MenuScrollingArea
        controls={{
          arrowDown: () => setSelectedIndex((s) => s + 1),
          arrowUp: () => setSelectedIndex((s) => s - 1),
        }}
      >
        {filteredNodes?.map((f, i) => (
          <TypedMenuItem
            key={f.name + menuSearchValue}
            name={`${menuSearchValue}`}
            type={f.name}
            dataType={f.type.name}
            selected={i === selectedNodeIndex}
            onClick={() => {
              onNodeClick(f, menuSearchValue);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
};
