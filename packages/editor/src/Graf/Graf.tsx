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

const SubNodeContainer = styled.div`
  font-family: ${fontFamilySans};
  transition: max-width 0.5s ease-in-out;
  max-width: 50%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  pointer-events: none;
  padding: 2rem;
  height: 100%;
`;

const SubNodeWrapper = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  pointer-events: none;
`;

let snapLock = true;

export const Graf: React.FC<{ node: ParserField }> = ({ node }) => {
  const {
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    setSnapshots,
    snapshots,
    past,
    future,
    readonly,
    scalars,
  } = useTreesState();

  const { mount } = useIO();

  useEffect(() => {
    if (snapLock) {
      snapLock = false;
      return;
    }
    const copyTree = JSON.stringify(tree);
    if (snapshots.length === 0) {
      setSnapshots([copyTree]);
      return;
    }
    if (snapshots[snapshots.length - 1] !== copyTree) {
      setSnapshots([...snapshots, copyTree]);
    }
  }, [tree]);

  useEffect(() => {
    const keyEvents = mount({
      [KeyboardActions.Undo]: () => {
        const p = past();
        if (p) {
          snapLock = true;
          setTree(JSON.parse(p));
        }
      },
      [KeyboardActions.Redo]: () => {
        const f = future();
        if (f) {
          snapLock = true;
          setTree(JSON.parse(f));
        }
      },
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
        <ActiveNode
          readonly={readonly}
          onDelete={(nodeToDelete) => {
            const deletedNode = tree.nodes.findIndex(
              (n) => n === nodeToDelete,
            )!;
            const allNodes = [...tree.nodes];
            allNodes.splice(deletedNode, 1);
            setSelectedNode(undefined);
            setTree({ nodes: allNodes });
          }}
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
      </SubNodeContainer>
    </SubNodeWrapper>
  );
};
