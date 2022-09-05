import React, { useRef, useEffect, useState, useMemo } from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '@/Graf/Node';
import { useTreesState } from '@/state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
} from '@/state/containers';
import { darken, toHex } from 'color2k';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { getScalarFields } from '@/Graf/utils/getScalarFields';
import { findInNodes } from '@/compare/compareNodes';
import { ErrorItem } from './ErrorItem';
import { ParserField } from 'graphql-js-tree';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  flex: 1;
  background-color: ${({ theme }) => theme.background.mainFar};
  overflow: hidden;
  scrollbar-color: ${({
    theme: {
      background: { mainClose, mainFurthest },
    },
  }) => `${mainClose} ${mainFurthest}`};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  font-family: ${fontFamily};
`;

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  margin: 20px 25px 15px;
  font-family: ${fontFamilySans};
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
  width: min(clamp(400px, 40%, 1280px), calc(100vw - 50px));
  background-color: ${({ theme }) => theme.background.mainFurther};
  font-family: ${fontFamily};
  right: 0;
  top: 0;
  bottom: 0;
  transition: max-width 0.25s ease-in-out;
  scrollbar-color: ${({
    theme: {
      background: { mainCloser, mainClose },
    },
  }) => `${mainCloser} ${mainClose}`};
`;

const ErrorWrapper = styled.div`
  font-family: ${fontFamily};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.background.mainFurthest};
  cursor: pointer;
  color: ${({ theme }) => theme.error};
  padding-left: 16px;
`;

const ErrorLabel = styled.p`
  width: 90%;
`;

let snapLock = true;

export const Graf: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  const { lockGraf, grafErrors } = useErrorsState();
  const { setActions } = useIOState();

  const [errorsItems, setErrorsItems] = useState<JSX.Element[]>();

  const generateErrorsText = () => {
    if (lockGraf) {
      const lockGrafArray = lockGraf.split('}').filter((ee) => ee);
      const errors = lockGrafArray.map((e, i) => (
        <ErrorItem key={i} error={e} />
      ));
      setErrorsItems(errors);
    }
  };

  useEffect(() => {
    generateErrorsText();
  }, [lockGraf]);

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
    setActions((acts) => ({
      ...acts,
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
    }));
  }, [snapshots]);

  const node = selectedNode?.field
    ? findInNodes(tree.nodes, selectedNode.field) ||
      findInNodes(libraryTree.nodes, selectedNode.field)
    : undefined;

  const selectedNodeComponent = useMemo(() => {
    if (node && wrapperRef.current) {
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
                JSON.stringify({
                  ...node,
                  args: getScalarFields(node, scalars),
                  interfaces: [],
                  directives: [],
                  type: { name: 'input' },
                  data: { type: 'InputObjectTypeDefinition' },
                  name: nodeToCreateInput.name + 'Input',
                }),
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
  }, [
    node,
    wrapperRef.current,
    readonly,
    selectedNode,
    setSelectedNode,
    setTree,
    tree,
  ]);

  return (
    <>
      {selectedNodeComponent}
      <Wrapper
        ref={wrapperRef}
        onClick={() => {
          setSelectedNode(undefined);
        }}
        data-cy={GraphQLEditorDomStructure.tree.elements.Graf.name}
      >
        <Heading>DIAGRAM VIEW</Heading>
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
