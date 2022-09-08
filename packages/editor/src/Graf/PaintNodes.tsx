import React, { useMemo, useState } from 'react';
import {
  TypeDefinitionDisplayMap,
  TypeSystemExtension,
  TypeExtension,
  Options,
  getTypeName,
  ParserField,
} from 'graphql-js-tree';
import { fontFamily } from '@/vars';
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
import { useSortState } from '@/state/containers/sort';
import { SortNodes } from './Node/components/SortNodes';
import styled from '@emotion/styled';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { SearchInput } from '@/shared/components';

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

type BaseTypesType = { node: ParserField; libraryNode: ParserField }[];

export const PaintNodes: React.FC = () => {
  const { libraryTree, tree, readonly } = useTreesState();
  const { orderTypes } = useSortState();
  const [filterNodes, setFilterNodes] = useState('');

  const baseTypes: BaseTypesType = [...orderTypes.map((t) => t.name)].map(
    (d) => ({
      node: {
        name: TypeDefinitionDisplayMap[d],
        data: {
          type: d,
        },
        type: {
          fieldType: {
            name: `root-${d}`,
            type: Options.name,
          },
        },
        interfaces: [],
        directives: [],
        args: tree.nodes.filter((n) => n.data.type === d),
      },
      libraryNode: {
        name: TypeDefinitionDisplayMap[d],
        data: {
          type: d,
        },
        type: {
          fieldType: {
            type: Options.name,
            name: `library-${d}`,
          },
        },
        interfaces: [],
        directives: [],
        args: libraryTree.nodes.filter((n) => n.data.type === d),
      },
    }),
  );

  const RootBaseTypes = useMemo(
    () =>
      baseTypes.map((d) => (
        <div key={getTypeName(d.node.type.fieldType)}>
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
            fieldType: { name: 'root', type: Options.name },
          },
          interfaces: [],
          directives: [],
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
            fieldType: { name: 'root', type: Options.name },
          },
          interfaces: [],
          directives: [],
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
