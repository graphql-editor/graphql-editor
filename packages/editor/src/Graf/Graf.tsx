import React, { useEffect, useMemo } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState } from '@/state/containers';
import { darken, toHex } from 'color2k';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { getScalarFields } from '@/Graf/utils/getScalarFields';
import { findInNodes } from '@/compare/compareNodes';
import {
  Options,
  ParserField,
  createParserField,
  TypeDefinition,
} from 'graphql-js-tree';
import styled from '@emotion/styled';
import { ErrorLabel, ErrorWrapper } from '@/shared/components/ErrorStyles';
import { PaintNodes } from '@/shared/components/PaintNodes/PaintNodes';
import { TopBar } from '@/shared/components/TopBar';
import { KeyboardActions, useIO } from '@/shared/hooks/io';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  overflow-y: auto;
  font-family: ${fontFamily};
`;

const ErrorContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  font-size: 12px;
  font-family: ${fontFamily};
  letter-spacing: 1;
  color: ${({ theme }) => theme.hover};
  background: ${({ theme }) => toHex(darken(theme.error, 0.6))}ee;
  border: 1px solid ${({ theme }) => theme.error};
`;

const SubNodeContainer = styled.div`
  background-color: ${({ theme }) => theme.background.mainFurther};
  font-family: ${fontFamilySans};
  left: 0;
  top: 60px;
  bottom: 0;
  position: absolute;
  transition: max-width 0.5s ease-in-out;
  max-width: 50%;
  z-index: 2;
`;

let snapLock = true;

export const Graf: React.FC = () => {
  const {
    libraryTree,
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
  const { lockGraf, grafErrors, errorsItems } = useErrorsState();
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
        const deletedNode = tree.nodes.findIndex(
          (n) => n === selectedNode?.field,
        )!;
        if (deletedNode === -1) return;
        const allNodes = [...tree.nodes];
        allNodes.splice(deletedNode, 1);
        setSelectedNode(undefined);
        setTree({ nodes: allNodes });
      },
    });
    return keyEvents.dispose;
  }, [snapshots, tree, selectedNode]);

  const node = useMemo(
    () =>
      selectedNode?.field
        ? findInNodes(tree.nodes, selectedNode.field) ||
          findInNodes(libraryTree.nodes, selectedNode.field)
        : undefined,
    [selectedNode?.field],
  );

  const selectedNodeComponent = useMemo(() => {
    if (node) {
      return (
        <SubNodeContainer onClick={() => {}}>
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
              const duplicatedNode = JSON.parse(
                JSON.stringify({
                  ...node,
                  name: nodeToDuplicate?.name + 'Copy',
                }),
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
      );
    }
    return null;
  }, [node, readonly, selectedNode, setSelectedNode, setTree, tree]);
  return (
    <>
      <Wrapper
        onClick={() => {
          setSelectedNode(undefined);
        }}
        data-cy={GraphQLEditorDomStructure.tree.elements.Graf.name}
      >
        <TopBar heading={lockGraf ? 'ERRORS' : 'CREATOR VIEW'} />
        {selectedNodeComponent}
        {lockGraf ? (
          <ErrorWrapper>
            <ErrorLabel>{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:`}</ErrorLabel>
            {errorsItems}
          </ErrorWrapper>
        ) : (
          <Main>{!lockGraf && <PaintNodes />}</Main>
        )}
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Wrapper>
    </>
  );
};
