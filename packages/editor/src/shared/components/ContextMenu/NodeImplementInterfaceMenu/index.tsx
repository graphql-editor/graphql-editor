import React, { useEffect, useMemo, useState } from 'react';
import { ResolveImplementInterface } from '@/GraphQL/Resolve';
import { getTypeName, ParserField, TypeDefinition } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from '@/Graf/Node/components';
import { sortNodes } from '@/shared/components/ContextMenu/sort';

interface NodeImplementInterfacesMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeImplementInterfacesMenu: React.FC<
  NodeImplementInterfacesMenuProps
> = ({ node, hideMenu }) => {
  const { tree, libraryTree, updateNode } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creationNodes = useMemo(
    () =>
      ResolveImplementInterface(
        node,
        tree.nodes.concat(libraryTree.nodes),
      )?.filter((a) => !node.interfaces?.includes(a.name)) || [],
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
    if (!node.interfaces) {
      node.interfaces = [];
    }
    const interfacesToPush: string[] = [];
    const allInterfaces = tree.nodes.filter(
      (ni) => ni.data.type === TypeDefinition.InterfaceTypeDefinition,
    );
    const computeInterfaces = (interfaces: string[]) => {
      interfacesToPush.push(
        ...interfaces.filter((ii) => !interfacesToPush.includes(ii)),
      );
      for (const i of interfaces) {
        const hasInterface = allInterfaces.find(
          (interfaceObject) => interfaceObject.name === i,
        )!;
        if (hasInterface?.interfaces && hasInterface.interfaces.length) {
          computeInterfaces(hasInterface.interfaces);
        }
      }
    };
    computeInterfaces([f.name]);
    node.interfaces.push(...interfacesToPush);
    const argsToPush =
      f.args?.filter((a) => !node.args?.find((na) => na.name === a.name)) || [];
    node.args = node.args?.concat(argsToPush);
    hideMenu();
    updateNode(node);
  };
  return (
    <Menu
      menuName={'Implement interface'}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={() => hideMenu()}
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
            type={f.name}
            dataType={getTypeName(f.type.fieldType)}
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
