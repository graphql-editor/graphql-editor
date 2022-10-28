import React, { useMemo, useRef } from 'react';
import {
  ParserField,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  Directive,
  Options,
  createParserField,
} from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { NewNode } from '@/shared/components/PaintNodes/NewNode';
import { PaintNode } from '@/shared/components/PaintNodes/PaintNode';

export interface RootNodeProps {
  node: ParserField;
  filterNodes: string;
  libraryNode?: ParserField;
  readonly?: boolean;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

const NodeContainer = styled.div`
  margin: 0 25px;
`;

const NodeTopBar = styled.div<{ nodeType: NodeTypes }>`
  display: flex;
  align-items: center;
  margin: 0 20px 20px 0;
  color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text};
`;

const NodeName = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
  height: 34px;
  display: flex;
  align-items: center;
`;

const NodeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 15px 20px;
`;

export const RootNode: React.FC<RootNodeProps> = ({
  node,
  libraryNode,
  readonly,
  filterNodes,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { tree, schemaType, selectedNode } = useTreesState();
  const {
    sortAlphabetically,
    isSortAlphabetically,
    isNodeBaseType,
    isUserOrder,
    setFilterNodes,
  } = useSortState();

  const sortNodes = () =>
    isUserOrder
      ? node.args
          ?.filter((a) => isNodeBaseType(a.type.operations))
          .concat(node.args.filter((a) => !isNodeBaseType(a.type.operations)))
      : isSortAlphabetically
      ? node.args
          ?.filter((a) => isNodeBaseType(a.type.operations))
          .concat(
            node.args
              .filter((a) => !isNodeBaseType(a.type.operations))
              .sort(sortAlphabetically),
          )
      : node.args
          ?.filter((a) => isNodeBaseType(a.type.operations))
          .concat(node.args.filter((a) => !isNodeBaseType(a.type.operations)));

  const paintedNodes = useMemo(() => {
    return sortNodes()
      ?.filter((a) => a.name.toLowerCase().includes(filterNodes.toLowerCase()))
      .map((a, idx) => <PaintNode key={a.name} node={a} nodeIdx={idx} />);
  }, [
    selectedNode,
    tree,
    filterNodes,
    isUserOrder,
    isNodeBaseType,
    isSortAlphabetically,
    node,
  ]);

  return (
    <NodeContainer ref={thisNode}>
      <NodeTopBar nodeType={node.name as NodeTypes}>
        <NodeName
          data-cy={GraphQLEditorDomStructure.tree.elements.Graf.categoryName}
        >
          {node.name}
        </NodeName>
        {!readonly && (
          <NewNode
            node={node}
            onCreate={(name) => {
              const createdNode: ParserField =
                node.data.type === TypeSystemDefinition.DirectiveDefinition
                  ? createParserField({
                      ...node,
                      name,
                      args: [],
                      directives: [],
                      interfaces: [],
                      type: {
                        fieldType: {
                          name: TypeDefinitionDisplayMap[node.data.type],
                          type: Options.name,
                        },
                        directiveOptions: [Directive.OBJECT],
                      },
                    })
                  : createParserField({
                      ...node,
                      name,
                      args: [],
                      directives: [],
                      interfaces: [],
                      type: {
                        fieldType: {
                          name: (TypeDefinitionDisplayMap as any)[
                            node.data.type as any
                          ],
                          type: Options.name,
                        },
                      },
                    });
              setFilterNodes('');
              return createdNode;
            }}
          />
        )}
      </NodeTopBar>

      <NodeBox>
        {schemaType === 'user' && paintedNodes}
        {libraryNode?.args?.map((a, idx) => (
          <PaintNode isLibrary={true} key={a.name} node={a} nodeIdx={idx} />
        ))}
      </NodeBox>
    </NodeContainer>
  );
};
