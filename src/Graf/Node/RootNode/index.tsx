import React, { useMemo, useRef } from 'react';
import {
  ParserField,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  Directive,
} from 'graphql-js-tree';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { NewNode } from '@/Graf/Node/NewNode';
import { useTreesState } from '@/state/containers/trees';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

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
  const { tree, setTree, schemaType, selectedNode } = useTreesState();
  const {
    sortAlphabetically,
    isSortAlphabetically,
    isNodeBaseType,
    isUserOrder,
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
    return sortNodes()?.map((a) => (
      <PaintNode
        key={a.name}
        node={a}
        isMatchedToSearch={a.name
          .toLowerCase()
          .includes(filterNodes.toLowerCase())}
      />
    ));
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
              const createdNode =
                node.data.type === TypeSystemDefinition.DirectiveDefinition
                  ? {
                      ...node,
                      name,
                      args: [],
                      type: {
                        name: TypeDefinitionDisplayMap[node.data.type],
                        directiveOptions: [Directive.OBJECT],
                      },
                    }
                  : {
                      ...node,
                      name,
                      args: [],
                      type: {
                        name: (TypeDefinitionDisplayMap as any)[
                          node.data.type as any
                        ],
                      },
                    };
              tree.nodes.push(createdNode);
              setTree({ ...tree });
              return createdNode;
            }}
          />
        )}
      </NodeTopBar>

      <NodeBox>
        {schemaType === 'user' && paintedNodes}
        {libraryNode?.args?.map((a) => (
          <PaintNode
            isLibrary={true}
            key={a.name}
            node={a}
            isMatchedToSearch={a.name
              .toLowerCase()
              .includes(filterNodes.toLowerCase())}
          />
        ))}
      </NodeBox>
    </NodeContainer>
  );
};
