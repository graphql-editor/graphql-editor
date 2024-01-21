import React, { useEffect, useMemo, useState } from "react";
import { ResolveImplementInterface } from "@/GraphQL/Resolve";
import { getTypeName, ParserField } from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from "@/Graf/Node/components";
import { sortNodes } from "@/shared/components/ContextMenu/sort";

interface NodeImplementInterfacesMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeImplementInterfacesMenu = React.forwardRef<
  HTMLDivElement,
  NodeImplementInterfacesMenuProps
>(({ node, hideMenu, ...props }, ref) => {
  const { allNodes, implementInterface } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creationNodes = useMemo(
    () =>
      ResolveImplementInterface(node, allNodes.nodes)?.filter(
        (a) => !node.interfaces?.includes(a.name)
      ) || [],
    [allNodes]
  );

  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [creationNodes, menuSearchValue]
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
    implementInterface(node, f);
    hideMenu();
  };
  return (
    <Menu
      {...props}
      menuName={"Implement interface"}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={() => hideMenu()}
      ref={ref}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes && filteredNodes.length > 0) {
            onNodeClick(filteredNodes[selectedNodeIndex]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
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
});
