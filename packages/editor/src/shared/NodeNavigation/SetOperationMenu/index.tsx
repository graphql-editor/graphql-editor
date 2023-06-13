import React, { useEffect, useMemo, useState } from "react";
import { ResolvePossibleOperationTypes } from "@/GraphQL/Resolve";
import { getTypeName, OperationType, ParserField } from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from "@/Graf/Node/components";
import { sortNodes } from "@/shared/components/ContextMenu/sort";

interface NodeChangeFieldTypeMenuProps {
  selectedNode?: ParserField;
  operationType: OperationType;
  hideMenu: () => void;
  onSelectType: (f: ParserField) => void;
}

export const SetOperationMenu = React.forwardRef<
  HTMLDivElement,
  NodeChangeFieldTypeMenuProps
>(({ hideMenu, onSelectType, operationType, ...props }, ref) => {
  const { allNodes } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creationNodes = useMemo(
    () => ResolvePossibleOperationTypes(allNodes.nodes),
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
    onSelectType(f);
    hideMenu();
  };
  return (
    <Menu
      {...props}
      ref={ref}
      menuName={`Set ${operationType}`}
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

SetOperationMenu.displayName = "SetOperationMenu";
