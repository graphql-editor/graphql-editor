import React, { useMemo } from 'react';
import {
  TypeDefinitionDisplayMap,
  TypeSystemExtension,
  TypeExtension,
  Options,
  getTypeName,
  ParserField,
  createParserField,
} from 'graphql-js-tree';
import { fontFamily } from '@/vars';
import { RootNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { RootExtendNode } from './Node/RootExtendNode';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';

const Main = styled.div<{ openedNode?: boolean }>`
  width: 100%;
  padding-left: ${({ openedNode }) => (openedNode ? '50%' : '0')};
  position: relative;
  font-family: ${fontFamily};
  transition: opacity 0.25s ease-in-out;
  padding-bottom: 300px;
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

type BaseTypesType = { node: ParserField; libraryNode: ParserField }[];

export const PaintNodes: React.FC = () => {
  const { libraryTree, tree, readonly, selectedNode } = useTreesState();
  const { orderTypes, filterNodes } = useSortState();

  const baseTypes: BaseTypesType = [...orderTypes.map((t) => t.name)].map(
    (d) => ({
      node: createParserField({
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
        args: tree.nodes.filter((n) => n.data.type === d),
      }),
      libraryNode: createParserField({
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
        args: libraryTree.nodes.filter((n) => n.data.type === d),
      }),
    }),
  );

  const RootBaseTypes = useMemo(
    () =>
      baseTypes.map((d, i) => (
        <div key={getTypeName(d.node.type.fieldType)}>
          {i !== 0 && <LineSpacer />}
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
    <Main openedNode={!!selectedNode?.field}>
      {RootBaseTypes}
      <LineSpacer />
      <RootExtendNode
        filterNodes={filterNodes}
        readonly={readonly}
        node={createParserField({
          name: TypeSystemExtension.TypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            fieldType: { name: 'root', type: Options.name },
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
        })}
        libraryNode={createParserField({
          name: TypeDefinitionDisplayMap.ObjectTypeExtension,
          data: {
            type: TypeExtension.ObjectTypeExtension,
          },
          type: {
            fieldType: { name: 'root', type: Options.name },
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
        })}
      />
    </Main>
  );
};
