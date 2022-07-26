import React, { useMemo, useRef, useState } from 'react';
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
import { SearchInput } from '@/Graf/Node/components/SearchInput';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';

export interface RootNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
  readonly?: boolean;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

const NodeCaption = styled.div<{ nodeType: NodeTypes }>`
  flex-basis: 100%;
  margin: 15px;
  display: flex;
  border-bottom: 1px solid;
  padding-bottom: 15px;
  align-items: center;
  user-select: none;

  border-color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text};
  color: ${({ theme, nodeType }) =>
    theme.colors[nodeType] ? theme.colors[nodeType] : theme.text};
`;

const CaptionTitle = styled.span`
  margin-right: 10px;
`;

const NodeContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
`;

export const RootNode: React.FC<RootNodeProps> = ({
  node,
  libraryNode,
  readonly,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { tree, setTree, selectedNode } = useTreesState();
  const {
    sortAlphabetically,
    isSortAlphabetically,
    isNodeBaseType,
    isUserOrder,
  } = useSortState();

  const [filterNodes, setFilterNodes] = useState('');

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
      <NodeCaption nodeType={node.name as NodeTypes}>
        <CaptionTitle
          data-cy={GraphQLEditorDomStructure.tree.elements.Graf.categoryName}
        >
          {node.name}
        </CaptionTitle>
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
      </NodeCaption>
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
      {paintedNodes}
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
    </NodeContainer>
  );
};
