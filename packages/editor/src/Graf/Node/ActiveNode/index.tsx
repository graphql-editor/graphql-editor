import React, { useEffect, useState, DragEvent } from 'react';
import {
  ParserField,
  TypeSystemDefinition,
  Instances,
  TypeDefinition,
  TypeExtension,
  getTypeName,
  compareParserFields,
} from 'graphql-js-tree';
import { ActiveField } from '@/Graf/Node/Field';
import { ActiveDirective } from '@/Graf/Node/Directive';
import { ActiveInputValue } from '@/Graf/Node/InputValue';
import { DOM } from '@/Graf/DOM';
import { ActiveType } from '@/Graf/Node/Type';
import {
  ActiveDescription,
  NodeInterface,
  EditableText,
} from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers/trees';
import { TopNodeMenu } from '@/Graf/Node/ActiveNode/TopNodeMenu';
import { ChangeAllRelatedNodes, isExtensionNode } from '@/GraphQL/Resolve';
import { ActiveArgument } from '@/Graf/Node/Argument';
import { useVisualState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/shared/dnd';
import styled from '@emotion/styled';
import { NodeName, NodeTitle, NodeType } from '@/Graf/Node/SharedNode';

interface NodeProps {
  node: ParserField;
  onDelete: (node: ParserField) => void;
  onDuplicate?: (node: ParserField) => void;
  onInputCreate?: (node: ParserField) => void;
  readonly?: boolean;
  parentNode?: ParserField;
}

const OpenedNode = styled.div`
  position: absolute;
  z-index: 4;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
`;

const MainNodeArea = styled.div`
  position: relative;
  transition: border-color 0.25s ease-in-out;
  border-color: ${({ theme }) => theme.success};
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  animation-name: fadeIn;
  animation-duration: 0.25s;
  overflow-y: auto;

  &.library-node-area {
    border-style: dotted;
    border-color: ${({ theme }) => theme.success}33;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const NodeContainer = styled.div`
  position: relative;
  break-inside: avoid;
  height: 100%;
  background-color: ${({ theme }) => theme.background.mainMiddle};
  display: flex;
  flex-flow: column nowrap;
  box-shadow: ${({ theme }) => theme.background.mainFurther} 0 0 20px;
`;

const NodeFields = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NodeInterfaces = styled.div`
  max-width: 600px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  padding: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.background.mainClose};
`;

const DndContainer = styled.div`
  &.drag-over {
    padding-top: 30px;
  }
`;

const GapBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.mainFurthest}99;
  transition: 0.25s background-color ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.mainFurthest}11;
  }
`;

const NodeArea = styled.div`
  min-width: 80%;
  max-width: 50vw;
  left: 20%;
  position: absolute;
  height: 100%;
  box-shadow: ${({ theme }) => theme.background.mainFurthest} 0 0 20px;
`;

const EditableTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 'bold',
};

export const ActiveNode: React.FC<NodeProps> = ({
  node,
  parentNode,
  ...sharedProps
}) => {
  const [openedNode, setOpenedNode] = useState<{
    type:
      | keyof Pick<ParserField, 'args' | 'directives'>
      | 'output'
      | 'directiveOutput';
    index: number;
  }>();
  const [dragOverName, setDragOverName] = useState('');

  const {
    libraryTree,
    tree,
    setSelectedNode,
    selectedNode,
    parentTypes,
    readonly,
    updateNode,
  } = useTreesState();
  const { draggingAllowed } = useVisualState();

  const isLibrary = !!libraryTree.nodes.find(
    (lN) => lN.name === node.name && lN.data.type === node.data.type,
  );
  const isInputNode = [
    TypeSystemDefinition.FieldDefinition,
    TypeSystemDefinition.DirectiveDefinition,
    TypeDefinition.InputObjectTypeDefinition,
    TypeExtension.InputObjectTypeExtension,
    Instances.Directive,
  ].includes(node.data.type as any);

  const isArgumentNode = [Instances.Directive].includes(node.data.type as any);
  const isLocked = !!sharedProps.readonly || isLibrary;

  const findNodeByField = (field?: ParserField) => {
    return field
      ? (tree.nodes.find(
          (n) =>
            n.name === getTypeName(field.type.fieldType) &&
            !isExtensionNode(n.data.type!),
        ) ||
          libraryTree.nodes.find(
            (n) =>
              n.name === getTypeName(field.type.fieldType) &&
              !isExtensionNode(n.data.type!),
          ))!
      : undefined;
  };

  const dropHandler = (e: DragEvent, endNodeName: string) => {
    e.stopPropagation();
    const startNodeName = e.dataTransfer.getData('startName');
    if (endNodeName === startNodeName) return;
    if (node.args) {
      const startIdx = node.args.findIndex((a) => a.name === startNodeName);
      const endIdx = node.args.findIndex((a) => a.name === endNodeName);
      node.args.splice(endIdx, 0, node.args.splice(startIdx, 1)[0]);
    }
    updateNode(node);
  };

  useEffect(() => {
    setOpenedNode(undefined);
  }, [selectedNode]);

  const openedNodeNode = openedNode
    ? openedNode.type === 'directives'
      ? node.directives![openedNode.index]
      : openedNode.type === 'args'
      ? node.args![openedNode.index]
      : openedNode.type === 'directiveOutput'
      ? findNodeByField(node.directives![openedNode.index])
      : findNodeByField(node.args![openedNode.index])
    : undefined;

  return (
    <NodeContainer
      className={`NodeBackground-${getTypeName(node.type.fieldType)} ${
        DOM.classes.node
      } ${DOM.classes.nodeSelected}`}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.name}
    >
      <ActiveDescription
        onChange={(d) => {
          node.description = d;
          updateNode(node);
        }}
        isLocked={isLocked}
        value={node.description || ''}
      />
      {!!node.interfaces?.length && (
        <NodeInterfaces>
          {node.interfaces.map((i) => (
            <NodeInterface
              key={i}
              isLocked={isLocked}
              onDelete={() => {
                node.interfaces = node.interfaces?.filter(
                  (oldInterface) => oldInterface !== i,
                );
                updateNode(node);
              }}
            >
              {i}
            </NodeInterface>
          ))}
        </NodeInterfaces>
      )}
      {openedNodeNode && openedNode && (
        <OpenedNode>
          <GapBar
            onClick={(e) => {
              e.stopPropagation();
              if (openedNode) {
                setOpenedNode(undefined);
              }
            }}
          />
          <NodeArea>
            <ActiveNode
              {...sharedProps}
              readonly={isLocked}
              parentNode={
                openedNode.type === 'args' || openedNode.type === 'directives'
                  ? node
                  : undefined
              }
              node={openedNodeNode}
              onDuplicate={undefined}
              onInputCreate={undefined}
              onDelete={() => {
                if (openedNode.type === 'directives') {
                  node.directives!.splice(openedNode.index, 1);
                }
                if (openedNode.type === 'args') {
                  node.args!.splice(openedNode.index, 1);
                }
                if (
                  openedNode.type === 'output' ||
                  openedNode.type === 'directiveOutput'
                ) {
                  sharedProps.onDelete(openedNodeNode);
                  return;
                }
                updateNode(node);
              }}
            />
          </NodeArea>
        </OpenedNode>
      )}
      <MainNodeArea
        className={isLibrary ? 'library-node-area' : undefined}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <NodeTitle>
          <NodeName>
            {parentNode && (
              <EditableText
                style={EditableTitle}
                value={`${parentNode.name}.`}
              />
            )}
            {isLocked && (
              <EditableText style={EditableTitle} value={node.name} />
            )}
            {!isLocked && (
              <EditableText
                style={EditableTitle}
                value={node.name}
                exclude={Object.keys(parentTypes).filter(
                  (pt) => pt !== node.name,
                )}
                onChange={(v) => {
                  const isError =
                    tree.nodes.map((n) => n.name).includes(v) ||
                    libraryTree.nodes.map((n) => n.name).includes(v);
                  if (isError) {
                    return;
                  }
                  //TODO: Change the node name
                  ChangeAllRelatedNodes({
                    newName: v,
                    nodes: tree.nodes,
                    oldName: node.name,
                  });
                  const reselect = selectedNode?.field
                    ? compareParserFields(node)(selectedNode.field)
                    : false;
                  node.name = v;
                  updateNode(node);
                  if (reselect && selectedNode) {
                    setSelectedNode({
                      field: node,
                      source: 'diagram',
                    });
                  }
                }}
              />
            )}
          </NodeName>
          <NodeType>
            <ActiveType type={node.type} />
          </NodeType>
          {!isLocked && (
            <TopNodeMenu
              {...sharedProps}
              onDelete={() => sharedProps.onDelete(node)}
              onDuplicate={() => sharedProps.onDuplicate?.(node)}
              onInputCreate={() => sharedProps.onInputCreate?.(node)}
              node={node}
            />
          )}
        </NodeTitle>
        <NodeFields>
          {node.directives?.map((d, i) => {
            const outputDisabled = !(
              tree.nodes.find(
                (n) => n.name === getTypeName(d.type.fieldType),
              ) ||
              libraryTree.nodes.find(
                (n) => n.name === getTypeName(d.type.fieldType),
              )
            );
            return (
              <ActiveDirective
                isLocked={isLocked}
                indexInParentNode={i}
                parentNode={node}
                parentNodeTypeName={getTypeName(node.type.fieldType)}
                key={d.name + i}
                onInputClick={() => {
                  setOpenedNode((oN) =>
                    oN?.index === i && oN.type === 'directives'
                      ? undefined
                      : { type: 'directives', index: i },
                  );
                }}
                onOutputClick={() => {
                  setOpenedNode((oN) =>
                    oN?.index === i && oN.type === 'directiveOutput'
                      ? undefined
                      : { type: 'directiveOutput', index: i },
                  );
                }}
                node={d}
                inputOpen={
                  openedNode?.type === 'directives' && openedNode?.index === i
                }
                outputDisabled={outputDisabled}
                outputOpen={
                  openedNode?.type === 'directiveOutput' &&
                  openedNode?.index === i
                }
                onDelete={() => {
                  setOpenedNode(undefined);
                  node.directives!.splice(i, 1);
                  updateNode(node);
                }}
              />
            );
          })}
          {node.args?.map((a, i) => {
            const outputDisabled = !(
              tree.nodes.find(
                (n) => n.name === getTypeName(a.type.fieldType),
              ) ||
              libraryTree.nodes.find(
                (n) => n.name === getTypeName(a.type.fieldType),
              )
            );
            const Component = isArgumentNode
              ? ActiveArgument
              : isInputNode
              ? ActiveInputValue
              : ActiveField;
            return (
              <DndContainer
                key={a.name}
                id={a.name}
                onDrop={(e) => {
                  setDragOverName('');
                  dropHandler(e, a.name);
                }}
                onDragEnd={() => setDragOverName('')}
                onDragLeave={(e) => {
                  dragLeaveHandler(e);
                }}
                onDragOver={(e) => {
                  setDragOverName(a.name);
                  dragOverHandler(e);
                }}
                className={a.name === dragOverName ? `drag-over` : ''}
              >
                <div
                  draggable={draggingAllowed && !readonly}
                  onDragStart={(e) => {
                    dragStartHandler(e, a.name);
                  }}
                >
                  <Component
                    indexInParentNode={i}
                    parentNode={node}
                    isLocked={isLocked}
                    parentNodeTypeName={getTypeName(node.type.fieldType)}
                    key={a.name}
                    onInputClick={() => {
                      setOpenedNode((oN) =>
                        oN?.index === i && oN.type === 'args'
                          ? undefined
                          : { type: 'args', index: i },
                      );
                    }}
                    onOutputClick={() => {
                      setOpenedNode((oN) =>
                        oN?.index === i && oN.type === 'output'
                          ? undefined
                          : { type: 'output', index: i },
                      );
                    }}
                    node={a}
                    inputOpen={
                      openedNode?.type === 'args' && openedNode?.index === i
                    }
                    outputDisabled={outputDisabled}
                    outputOpen={
                      openedNode?.type === 'output' && openedNode?.index === i
                    }
                    onDelete={() => {
                      node.args!.splice(i, 1);
                      updateNode(node);
                    }}
                  />
                </div>
              </DndContainer>
            );
          })}
          <div style={{ marginBottom: 400 }} />
        </NodeFields>
      </MainNodeArea>
    </NodeContainer>
  );
};
