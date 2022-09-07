import React, { useMemo, useState } from 'react';
import {
  TypeDefinitionDisplayMap,
  TypeSystemExtension,
  TypeExtension,
} from 'graphql-js-tree';
import { fontFamily } from '@/vars';
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
import { useSortState } from '@/state/containers/sort';
import { SortNodes } from './Node/components/SortNodes';
import styled from '@emotion/styled';
import { SearchInput } from '@/Graf/Node/components/SearchInput';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useLayoutState } from '@/state/containers';

const Main = styled.div`
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  transition: opacity 0.25s ease-in-out;
  padding-bottom: 300px;
`;

const TopBar = styled.div`
  display: flex;
  margin: 0 25px;
  gap: 20px;

  & > div:first-of-type {
    flex: 1;
  }
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

export const PaintNodes: React.FC = () => {
  const { libraryTree, tree, readonly } = useTreesState();
  const { orderTypes } = useSortState();
  const { setIsOrderListVisible } = useLayoutState();
  const [filterNodes, setFilterNodes] = useState('');

  const baseTypes = [...orderTypes.map((t) => t.name)].map((d) => ({
    node: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `root-${d}`,
      },
      args: tree.nodes.filter((n) => n.data.type === d),
    },
    libraryNode: {
      name: TypeDefinitionDisplayMap[d],
      data: {
        type: d,
      },
      type: {
        name: `library-${d}`,
      },
      args: libraryTree.nodes.filter((n) => n.data.type === d),
    },
  }));
  const RootBaseTypes = useMemo(
    () =>
      baseTypes.map((d) => (
        <div
          key={d.node.type.name}
          onClick={() => setIsOrderListVisible(false)}
        >
          <LineSpacer />
          <RootNode
            readonly={readonly}
            node={d.node}
            libraryNode={d.libraryNode}
            filterNodes={filterNodes}
          />
        </div>
      )),
    [baseTypes],
  );

  return (
    <Main>
      <TopBar>
        <SearchInput
          cypressName={GraphQLEditorDomStructure.tree.elements.Graf.searchInput}
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          onSubmit={() => {}}
          value={filterNodes}
          onChange={setFilterNodes}
        />
        <SortNodes />
      </TopBar>
      {RootBaseTypes}
      <LineSpacer />
      <RootExtendNode
        filterNodes={filterNodes}
        readonly={readonly}
        node={{
          name: TypeSystemExtension.TypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            name: 'root',
          },
          args: tree.nodes
            .filter(
              (n) =>
                n.data.type === TypeExtension.ObjectTypeExtension ||
                n.data.type === TypeExtension.InputObjectTypeExtension ||
                n.data.type === TypeExtension.EnumTypeExtension ||
                n.data.type === TypeExtension.ScalarTypeExtension ||
                n.data.type === TypeExtension.InterfaceTypeExtension ||
                n.data.type === TypeExtension.UnionTypeExtension,
            )
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
        libraryNode={{
          name: TypeDefinitionDisplayMap.ObjectTypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            name: 'root',
          },
          args: libraryTree.nodes
            .filter(
              (n) =>
                n.data.type === TypeExtension.ObjectTypeExtension ||
                n.data.type === TypeExtension.InputObjectTypeExtension ||
                n.data.type === TypeExtension.EnumTypeExtension ||
                n.data.type === TypeExtension.ScalarTypeExtension ||
                n.data.type === TypeExtension.InterfaceTypeExtension ||
                n.data.type === TypeExtension.UnionTypeExtension,
            )
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        }}
      />
    </Main>
  );
};
