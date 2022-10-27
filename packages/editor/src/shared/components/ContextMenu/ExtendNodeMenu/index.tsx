import React, { useMemo, useState } from 'react';
import { ResolveExtension } from '@/GraphQL/Resolve';
import {
  TypeExtension,
  TypeSystemDefinition,
  TypeDefinitionDisplayMap,
  ParserField,
  Options,
  createParserField,
} from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import {
  Menu,
  MenuScrollingArea,
  MenuSearch,
  MenuItem,
} from '@/Graf/Node/components';
import { sortNodes } from '@/shared/components/ContextMenu/sort';

interface ExtendNodeMenuProps {
  hideMenu: () => void;
}

export const ExtendNodeMenu: React.FC<ExtendNodeMenuProps> = ({ hideMenu }) => {
  const { tree, setTree, libraryTree, setSelectedNode } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const creationNodes = useMemo(
    () =>
      tree.nodes
        .concat(libraryTree.nodes)
        .filter(
          (a) =>
            ![
              TypeExtension.EnumTypeExtension,
              TypeExtension.InputObjectTypeExtension,
              TypeExtension.InterfaceTypeExtension,
              TypeExtension.ObjectTypeExtension,
              TypeExtension.ScalarTypeExtension,
              TypeExtension.UnionTypeExtension,
              TypeSystemDefinition.DirectiveDefinition,
            ].find((o) => a.data.type === o),
        ) || [],
    [tree.nodes, libraryTree.nodes],
  );
  const filteredNodes = useMemo(
    () => sortNodes(menuSearchValue, creationNodes),
    [tree.nodes, libraryTree.nodes, menuSearchValue],
  );

  const onClickFilteredNode = (f: ParserField) => {
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
    setSelectedNode({ field: extendNode, source: 'diagram' });
    hideMenu();
  };
  return (
    <Menu
      menuName={'Extend node'}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch
        onSubmit={() => {
          if (filteredNodes.length > 0) {
            onClickFilteredNode(filteredNodes[0]);
          }
        }}
        value={menuSearchValue}
        onChange={setMenuSearchValue}
        onClear={() => setMenuSearchValue('')}
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
};
