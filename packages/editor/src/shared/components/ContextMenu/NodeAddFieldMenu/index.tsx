import React, { useEffect, useMemo, useState } from "react";
import { ResolveCreateField } from "@/GraphQL/Resolve";
import {
  createParserField,
  generateNodeId,
  getTypeName,
  Options,
  ParserField,
} from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from "@/Graf/Node/components";
import { sortNodes } from "@/shared/components/ContextMenu/sort";
import { useRelationsState } from "@/state/containers/relations";
interface NodeAddFieldMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeAddFieldMenu = React.forwardRef<
  HTMLDivElement,
  NodeAddFieldMenuProps
>(({ node, hideMenu, ...props }, ref) => {
  const { allNodes, addFieldToNode } = useTreesState();
  const { editMode } = useRelationsState();
  const [menuSearchValue, setMenuSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!menuSearchValue) {
      setSelectedIndex(0);
    }
  }, [menuSearchValue]);

  const creationNodes = useMemo(
    () => ResolveCreateField(node, allNodes.nodes) || [],
    [allNodes]
  );

  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [creationNodes, menuSearchValue]
  );

  const fNLength = filteredNodes?.length || 1;
  const selectedNodeIndex =
    (selectedIndex < 0 ? fNLength - selectedIndex : selectedIndex) % fNLength;

  const addNode = (n: ParserField, name: string) => {
    const addedNode = createParserField(
      JSON.parse(JSON.stringify(n)) as ParserField
    );
    addFieldToNode(
      node,
      createParserField({
        ...addedNode,
        args: [],
        fromInterface: [],
        id: generateNodeId(name, addedNode.data.type, []),
        value: undefined,
        interfaces: [],
        directives: [],
        fromLibrary: false,
        description: "",
        type: {
          fieldType: {
            name: addedNode.name,
            type: Options.name,
          },
        },
      }),
      name,
      editMode
    );
    setMenuSearchValue("");
    return;
  };

  return (
    <Menu
      {...props}
      menuName={"Create Field"}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
      ref={ref}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes && filteredNodes.length > 0) {
            addNode(
              filteredNodes[selectedNodeIndex],
              menuSearchValue.split(" ")[0]
            );
          }
        }}
        placeholder="Field name..."
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
            key={f.name + menuSearchValue}
            name={`${menuSearchValue.split(" ")[0]}`}
            type={f.name}
            dataType={getTypeName(f.type.fieldType)}
            selected={i === selectedNodeIndex}
            onClick={() => {
              addNode(f, menuSearchValue.split(" ")[0]);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
});
NodeAddFieldMenu.displayName = "NodeAddFieldMenu";
