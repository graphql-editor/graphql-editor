import React, { useMemo, useState } from "react";
import { ResolveExtension } from "@/GraphQL/Resolve";
import {
  TypeExtension,
  TypeSystemDefinition,
  TypeDefinitionDisplayMap,
  ParserField,
  Options,
  createParserField,
} from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from "@/Graf/Node/components";
import { sortNodes } from "@/shared/components/ContextMenu/sort";

interface ExtendNodeMenuProps {
  hideMenu: () => void;
}

export const ExtendNodeMenu = React.forwardRef<
  HTMLDivElement,
  ExtendNodeMenuProps
>(({ hideMenu, ...props }, ref) => {
  const { tree, allNodes, setTree, setSelectedNodeId } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState("");
  const creationNodes = useMemo(
    () =>
      allNodes.nodes.filter(
        (a) =>
          ![
            TypeExtension.EnumTypeExtension,
            TypeExtension.InputObjectTypeExtension,
            TypeExtension.InterfaceTypeExtension,
            TypeExtension.ObjectTypeExtension,
            TypeExtension.ScalarTypeExtension,
            TypeExtension.UnionTypeExtension,
            TypeSystemDefinition.DirectiveDefinition,
          ].find((o) => a.data.type === o)
      ) || [],
    [allNodes]
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [allNodes, menuSearchValue]
  );

  const onClickFilteredNode = (f: ParserField) => {
    hideMenu();
    const extendNode = createParserField({
      data: {
        type: ResolveExtension(f.data.type)!,
      },
      description: undefined,
      type: {
        fieldType: {
          name: TypeDefinitionDisplayMap[ResolveExtension(f.data.type)!],
          type: Options.name,
        },
      },
      name: f.name,
      args: [],
      interfaces: [],
      directives: [],
    });
    tree.nodes.push(extendNode);
    setTree({ ...tree });
    setSelectedNodeId({
      value: {
        id: extendNode.id,
        name: extendNode.name,
      },
      source: "relation",
      justCreated: true,
    });
  };
  return (
    <Menu
      {...props}
      menuName={"Extend node"}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
      ref={ref}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes.length > 0) {
            onClickFilteredNode(filteredNodes[0]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
      />
      <MenuScrollingArea>
        {filteredNodes.map((f) => (
          <MenuItem
            key={f.name}
            node={f}
            onClick={() => {
              onClickFilteredNode(f);
            }}
          />
        ))}
      </MenuScrollingArea>
    </Menu>
  );
});

ExtendNodeMenu.displayName = "ExtendNodeMenu";
