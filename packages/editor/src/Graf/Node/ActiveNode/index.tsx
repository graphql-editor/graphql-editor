import React, { useEffect, useState, DragEvent } from 'react';
import {
  ParserField,
  TypeSystemDefinition,
  TypeDefinition,
  getTypeName,
  compareParserFields,
} from 'graphql-js-tree';
import { ActiveField } from '@/Graf/Node/Field';
import {
  ActiveDescription,
  CreateNodeInterface,
  NodeInterface,
} from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers/trees';
import { TopNodeMenu } from '@/Graf/Node/ActiveNode/TopNodeMenu';
import { ChangeAllRelatedNodes, isExtensionNode } from '@/GraphQL/Resolve';

import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/shared/dnd';
import styled from '@emotion/styled';
import { EditableText } from '@/Graf/Node/Field/EditableText';
import { ActiveGrafType } from '@/Graf/Node/Field/ActiveGrafType';
import {
  CreateNodeDirective,
  DirectivePlacement,
} from '@/Graf/Node/components/DirectivePlacement';
import { DraggableProvider, useDraggable } from '@/Graf/state/draggable';

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
  pointer-events: none;
`;

const MainNodeArea = styled.div`
  position: relative;
  transition: border-color 0.25s ease-in-out;
  border-color: ${({ theme }) => theme.active};
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  animation-name: fadeIn;
  animation-duration: 0.25s;
  overflow-y: hidden;

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
  /* position: relative; */
  break-inside: avoid;
  min-width: 24rem;
  max-height: 100%;
  background-color: ${({ theme }) => theme.background.mainFurther};
  display: flex;
  flex-flow: column nowrap;
  border-radius: 0.75rem;
  pointer-events: all;
  border: 1px solid ${({ theme }) => theme.active};
`;

const NodeFieldsContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const NodeFields = styled.div``;

const DirectivePlacements = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-x: scroll;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.background.mainClose};
`;
const NodeInterfaces = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-x: auto;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
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
  pointer-events: all;
  background-color: ${({ theme }) => theme.background.mainFurthest}99;
  transition: 0.25s background-color ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.mainFurthest}11;
  }
`;

const NodeArea = styled.div`
  min-width: 80%;
  max-width: 50vw;
  left: 30%;
  position: absolute;
  padding: 2rem;
  height: 100%;
`;
export const NodeName = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.text};
  user-select: none;
`;

export const NodeType = styled.div`
  margin-right: auto;
`;

const EditableTitle: React.CSSProperties = {
  fontWeight: 500,
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
  const { draggable } = useDraggable();

  const {
    allNodes,
    tree,
    setSelectedNode,
    selectedNode,
    parentTypes,
    readonly,
    updateNode,
    isLibrary,
  } = useTreesState();

  const libraryNode = isLibrary(node.id);
  const isLocked =
    !!sharedProps.readonly || libraryNode || readonly || !!node.fromInterface;
  const findNodeByField = (field?: ParserField) => {
    return field
      ? allNodes.nodes.find(
          (n) =>
            n.name === getTypeName(field.type.fieldType) &&
            !isExtensionNode(n.data.type!),
        )
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
  console.log(node);
  return (
    <NodeContainer
      className={`NodeBackground-${getTypeName(node.type.fieldType)}`}
    >
      <ActiveDescription
        onChange={(d) => {
          node.description = d;
          updateNode(node, parentNode);
        }}
        isLocked={isLocked}
        value={node.description || ''}
      />
      {node.data.type === TypeSystemDefinition.DirectiveDefinition && (
        <DirectivePlacements>
          <CreateNodeDirective node={node} isLocked={isLocked} />
          {node.type.directiveOptions?.map((d, i) => (
            <DirectivePlacement
              key={d}
              isLocked={isLocked}
              onDelete={() => {
                node.type.directiveOptions = node.type.directiveOptions?.filter(
                  (oldDirective) => oldDirective !== d,
                );
                updateNode(node, parentNode);
              }}
            >
              {d}
            </DirectivePlacement>
          ))}
        </DirectivePlacements>
      )}
      {(node.data.type === TypeDefinition.ObjectTypeDefinition ||
        node.data.type === TypeDefinition.InterfaceTypeDefinition) && (
        <NodeInterfaces>
          <CreateNodeInterface node={node} isLocked={isLocked} />
          {node.interfaces.map((i) => (
            <NodeInterface
              key={i}
              isLocked={isLocked}
              onDelete={() => {
                node.interfaces = node.interfaces?.filter(
                  (oldInterface) => oldInterface !== i,
                );
                node.args = node.args.filter(
                  (arg) => !arg.fromInterface?.includes(i),
                );
                updateNode(node, parentNode);
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
            <DraggableProvider>
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
                  updateNode(node, parentNode);
                }}
              />
            </DraggableProvider>
          </NodeArea>
        </OpenedNode>
      )}
      <MainNodeArea
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
                  const isError = allNodes.nodes.map((n) => n.name).includes(v);
                  if (isError) {
                    return;
                  }

                  if (
                    node.data.type === TypeDefinition.InterfaceTypeDefinition
                  ) {
                    const nodesWithThisInterface = allNodes.nodes.filter((el) =>
                      el.interfaces.includes(node.name),
                    );

                    nodesWithThisInterface.forEach((el) => {
                      el.args.forEach((arg) => {
                        if (arg.fromInterface?.includes(node.name)) {
                          arg.fromInterface = arg.fromInterface.filter(
                            (i) => i !== node.name,
                          );
                          arg.fromInterface.push(v);
                        }
                      });
                      el.interfaces = el.interfaces.filter(
                        (i) => i !== node.name,
                      );
                      el.interfaces.push(v);
                      updateNode(el);
                    });
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
                  updateNode(node, parentNode);
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
            <ActiveGrafType type={node.type} />
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
        <NodeFieldsContainer>
          <NodeFields>
            {node.directives?.map((d, i) => {
              const outputDisabled = !allNodes.nodes.find(
                (n) => n.name === getTypeName(d.type.fieldType),
              );
              return (
                <ActiveField
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
              const outputDisabled = !allNodes.nodes.find(
                (n) => n.name === getTypeName(a.type.fieldType),
              );
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
                    draggable={!isLocked && draggable}
                    onDragStart={(e) => {
                      dragStartHandler(e, a.name);
                    }}
                  >
                    <ActiveField
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
                        if (
                          node.data.type ===
                          TypeDefinition.InterfaceTypeDefinition
                        ) {
                          const nodesWithThisInterface = allNodes.nodes.filter(
                            (el) => el.interfaces.includes(node.name),
                          );
                          const changedNodes = nodesWithThisInterface.map(
                            (n) => {
                              const foundArgIdx = n.args.findIndex(
                                (arg) => arg.name === a.name,
                              );
                              n.args.splice(foundArgIdx, 1);
                              return n;
                            },
                          );
                          changedNodes.forEach((changedNode) =>
                            updateNode(changedNode),
                          );
                        }

                        node.args!.splice(i, 1);
                        updateNode(node);
                      }}
                    />
                  </div>
                </DndContainer>
              );
            })}
          </NodeFields>
        </NodeFieldsContainer>
      </MainNodeArea>
      <div style={{ marginBottom: '1rem' }} />
    </NodeContainer>
  );
};

const NodeTitle = styled.div`
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  user-select: none;
`;
