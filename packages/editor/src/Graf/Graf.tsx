import React, { useEffect } from 'react';
import { fontFamilySans } from '@/vars';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';

import { getScalarFields } from '@/Graf/utils/getScalarFields';
import {
  Options,
  ParserField,
  createParserField,
  TypeDefinition,
} from 'graphql-js-tree';
import styled from '@emotion/styled';
import { KeyboardActions, useIO } from '@/shared/hooks/io';
import { DraggableProvider } from '@/Graf/state/draggable';

const SubNodeContainer = styled.div`
  font-family: ${fontFamilySans};
  transition: max-width 0.5s ease-in-out;
  max-width: 80%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  pointer-events: none;
  padding: 3.5rem 2rem;
  height: 100%;
`;

const SubNodeWrapper = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  overflow-x: auto;
  pointer-events: none;
`;

export const Graf: React.FC<{ node: ParserField }> = ({ node }) => {
  const {
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    snapshots,
    readonly,
    scalars,
    removeNode,
    undo,
    redo,
  } = useTreesState();

  const { mount } = useIO();

  useEffect(() => {
    const keyEvents = mount({
      [KeyboardActions.Undo]: undo,
      [KeyboardActions.Redo]: redo,
      [KeyboardActions.Delete]: () => {
        if (!readonly) {
          const deletedNode = tree.nodes.findIndex(
            (n) => n === selectedNode?.field,
          )!;
          if (deletedNode === -1) return;
          const allNodes = [...tree.nodes];
          allNodes.splice(deletedNode, 1);
          setSelectedNode(undefined);
          setTree({ nodes: allNodes });
        }
      },
    });
    return keyEvents.dispose;
  }, [snapshots, tree, selectedNode, readonly]);
  return (
    <SubNodeWrapper>
      <SubNodeContainer>
        <DraggableProvider>
          <ActiveNode
            readonly={readonly}
            onDelete={removeNode}
            onDuplicate={(nodeToDuplicate) => {
              const allNodes = [...tree.nodes];
              const { id, ...rest } = node;
              const duplicatedNode = JSON.parse(
                JSON.stringify(
                  createParserField({
                    ...rest,
                    name: nodeToDuplicate?.name + 'Copy',
                  }),
                ),
              ) as ParserField;
              allNodes.push(duplicatedNode);
              setSelectedNode({
                field: duplicatedNode,
                source: 'diagram',
              });
              setTree({ nodes: allNodes });
            }}
            onInputCreate={(nodeToCreateInput) => {
              const allNodes = [...tree.nodes];
              const createdInput = JSON.parse(
                JSON.stringify(
                  createParserField({
                    args: getScalarFields(node, scalars),
                    interfaces: [],
                    directives: [],
                    type: {
                      fieldType: {
                        name: 'input',
                        type: Options.name,
                      },
                    },
                    data: { type: TypeDefinition.InputObjectTypeDefinition },
                    name: nodeToCreateInput.name + 'Input',
                  }),
                ),
              ) as ParserField;
              allNodes.push(createdInput);
              setSelectedNode({
                field: createdInput,
                source: 'diagram',
              });
              setTree({ nodes: allNodes });
            }}
            node={node}
          />
        </DraggableProvider>
      </SubNodeContainer>
    </SubNodeWrapper>
  );
};
