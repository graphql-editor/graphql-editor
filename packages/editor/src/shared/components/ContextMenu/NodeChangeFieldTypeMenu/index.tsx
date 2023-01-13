import React, { useEffect, useMemo, useState } from 'react';
import { ResolveCreateField } from '@/GraphQL/Resolve';
import { getTypeName, ParserField, TypeDefinition } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from '@/Graf/Node/components';
import { sortNodes } from '@/shared/components/ContextMenu/sort';
import { changeTypeName } from '@/utils';

interface NodeChangeFieldTypeMenuProps {
  node: ParserField;
  nodeName: string;
  fieldIndex: number;
  hideMenu: () => void;
}

export const NodeChangeFieldTypeMenu = React.forwardRef<
  HTMLDivElement,
  NodeChangeFieldTypeMenuProps
>(({ node, nodeName, fieldIndex, hideMenu, ...props }, ref) => {
  const { updateNode, allNodes } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creationNodes = useMemo(
    () => ResolveCreateField(node, allNodes.nodes) || [],
    [allNodes, node],
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [creationNodes, menuSearchValue],
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
      if (node.data.type === TypeDefinition.InterfaceTypeDefinition) {
        const nodesWithThisInterface = allNodes.nodes.filter((el) =>
          el.interfaces.includes(node.name),
        );

        nodesWithThisInterface.forEach((n) => {
          const foundArgIdx = n.args.findIndex((arg) => arg.name === nodeName);
          n.args[foundArgIdx].data.type = f.data.type;
          changeTypeName(n.args[foundArgIdx].type.fieldType, f.name);
          updateNode(n);
        });
      }

      node.args[fieldIndex].data.type = f.data.type;
      changeTypeName(node.args[fieldIndex].type.fieldType, f.name);
      updateNode(node);
    }
    hideMenu();
  };
  return (
    <Menu
      {...props}
      ref={ref}
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
});
