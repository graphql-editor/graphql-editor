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
  TypeSystemDefinition,
} from 'graphql-js-tree';
import styled from '@emotion/styled';
import { KeyboardActions, useIO } from '@/shared/hooks/io';
import { DraggableProvider } from '@/Graf/state/draggable';
import { useRelationsState } from '@/state/containers';
import { Button, Stack, useToasts } from '@aexol-studio/styling-system';

const SubNodeContainer = styled.div`
  font-family: ${fontFamilySans};
  transition: max-width 0.5s ease-in-out;
  max-width: 80%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
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
`;

export const Graf: React.FC<{ node: ParserField }> = ({ node }) => {
  const {
    tree,
    setTree,
    snapshots,
    selectedNodeId,
    readonly,
    setSelectedNodeId,
    scalars,
    undo,
    updateNode,
    activeNode,
    redo,
  } = useTreesState();
  const { setEditMode } = useRelationsState();
  const { mount } = useIO();
  const { createToast } = useToasts();

  useEffect(() => {
    const keyEvents = mount({
      [KeyboardActions.Undo]: undo,
      [KeyboardActions.Redo]: redo,
    });
    return keyEvents.dispose;
  }, [snapshots, tree, selectedNodeId?.value?.id, readonly]);

  const exit = () => {
    const d = activeNode?.data.type;
    if (
      d === TypeDefinition.EnumTypeDefinition ||
      d === TypeDefinition.ScalarTypeDefinition ||
      d === TypeSystemDefinition.DirectiveDefinition
    ) {
      setSelectedNodeId({
        source: 'relation',
        value: undefined,
      });
    }
    setEditMode('');
  };

  const cancelCreate = () => {
    const allNodes = tree.nodes.filter(
      (n) => n.id !== selectedNodeId?.value?.id,
    );
    setSelectedNodeId({ source: 'relation', value: undefined });
    setTree({ nodes: allNodes });
    setEditMode('');
  };
  return (
    <SubNodeWrapper
      onClick={(e) => {
        e.stopPropagation();
        if (selectedNodeId?.justCreated) return;
        exit();
      }}
    >
      <SubNodeContainer>
        <DraggableProvider>
          <ActiveNode
            readonly={readonly}
            onDuplicate={(nodeToDuplicate) => {
              const allNodes = [...tree.nodes];
              const { ...rest } = node;
              const duplicatedNode = JSON.parse(
                JSON.stringify(
                  createParserField({
                    ...rest,
                    name: nodeToDuplicate?.name + 'Copy',
                  }),
                ),
              ) as ParserField;
              allNodes.push(duplicatedNode);
              setSelectedNodeId({
                value: {
                  id: duplicatedNode.id,
                  name: duplicatedNode.name,
                },
                source: 'relation',
              });
              setTree({ nodes: allNodes });
            }}
            onInputCreate={(nodeToCreateInput) => {
              const createdInput = createParserField({
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
              });
              updateNode(createdInput, () => {
                tree.nodes.push(createdInput);
                setSelectedNodeId({
                  value: {
                    id: createdInput.id,
                    name: createdInput.name,
                  },
                  source: 'relation',
                });
              });
            }}
            node={node}
          />
        </DraggableProvider>
        {selectedNodeId?.justCreated && (
          <CreateActions justify="end" gap="1rem">
            <Button
              variant="neutral"
              onClick={(e) => {
                e.stopPropagation();
                cancelCreate();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (
                  activeNode?.args.length ||
                  activeNode?.data.type ===
                    TypeSystemDefinition.DirectiveDefinition
                ) {
                  exit();
                  return;
                }
                createToast({
                  message: 'Node must have fields to be created',
                  variant: 'error',
                });
              }}
            >
              Create
            </Button>
          </CreateActions>
        )}
      </SubNodeContainer>
    </SubNodeWrapper>
  );
};

const CreateActions = styled(Stack)`
  padding: 1rem 0;
`;
