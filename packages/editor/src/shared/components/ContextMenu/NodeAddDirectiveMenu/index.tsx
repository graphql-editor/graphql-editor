import React, { useEffect, useMemo, useState } from "react";
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  TypedMenuItem,
} from "@/Graf/Node/components";
import { ResolveDirectives } from "@/GraphQL/Resolve";
import {
  ParserField,
  Instances,
  getTypeName,
  createParserField,
  Options,
} from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import { sortNodes } from "@/shared/components/ContextMenu/sort";

interface NodeAddDirectiveMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

export const NodeAddDirectiveMenu = React.forwardRef<
  HTMLDivElement,
  NodeAddDirectiveMenuProps
>(({ node, hideMenu, ...props }, ref) => {
  const { tree, setTree, allNodes } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const creationNodes = useMemo(
    () => ResolveDirectives(node, allNodes.nodes) || [],
    [allNodes]
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [tree, menuSearchValue]
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
    if (!node.directives) {
      node.directives = [];
    }
    node.directives.push(
      createParserField({
        ...f,
        type: {
          fieldType: {
            name: f.name,
            type: Options.name,
          },
        },
        name: f.name[0].toLowerCase() + f.name.slice(1),
        args: [],
        directives: [],
        interfaces: [],
        data: {
          type: Instances.Directive,
        },
      })
    );
    hideMenu();
    setTree({ ...tree });
  };
  return (
    <Menu
      {...props}
      ref={ref}
      menuName={"Add directive"}
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
        {filteredNodes.map((f, i) => (
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
NodeAddDirectiveMenu.displayName = "NodeAddDirectiveMenu";
