import React, { useState } from 'react';
import { ResolveImplementInterface } from '@/GraphQL/Resolve';
import { ParserField, TypeDefinition } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from '@/Graf/Node/components';

interface NodeImplementInterfacesMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeImplementInterfacesMenu: React.FC<NodeImplementInterfacesMenuProps> = ({
  node,
  hideMenu,
}) => {
  const { tree, setTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const filteredNodes = ResolveImplementInterface(node, tree.nodes)
    ?.sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((a) => !node.interfaces?.includes(a.name))
    .filter((a) =>
      a.name.toLowerCase().includes(menuSearchValue.toLowerCase()),
    );
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
    setTree({ ...tree });
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
