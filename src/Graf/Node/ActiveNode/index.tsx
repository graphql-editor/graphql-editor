import React, { useEffect, useState } from 'react';
import { ParserField, TypeSystemDefinition, Instances, TypeDefinition, TypeExtension } from 'graphql-zeus';
import { ActiveField } from '@/Graf/Node/Field';
import { ActiveDirective } from '@/Graf/Node/Directive';
import { ActiveInputValue } from '@/Graf/Node/InputValue';
import { style, keyframes } from 'typestyle';
import { Colors, mix } from '@/Colors';
import { GraphQLBackgrounds, GraphQLDarkBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@/Graf/DOM';
import { ActiveType } from '@/Graf/Node/Type';
import { NodeTitle } from '@/Graf/Node/SharedNode';
import { ActiveDescription, NodeInterface, EditableText } from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers/trees';
import { TopNodeMenu } from '@/Graf/Node/ActiveNode/TopNodeMenu';
import { ChangeAllRelatedNodes, isExtensionNode } from '@/GraphQL/Resolve';
import { ActiveArgument } from '@/Graf/Node/Argument';

interface NodeProps {
  node: ParserField;
  onDelete: (node: ParserField) => void;
  onDuplicate?: (node: ParserField) => void;
  readonly?: boolean;
  parentNode?: ParserField;
}

const fadeIn = keyframes({
  ['0%']: {
    opacity: 0.0,
  },
  ['100%']: {
    opacity: 1.0,
  },
});

const OpenedNode: NestedCSSProperties = {
  position: 'absolute',
  zIndex: 4,
  left: 0,
  top: 0,
  bottom: 0,
  height: '100%',
  width: `100%`,
  display: 'flex',
};

const LibraryNodeArea: NestedCSSProperties = {
  borderStyle: 'dashed',
};
const MainNodeArea = style({
  position: 'relative',
  transition: `border-color .25s ease-in-out`,
  borderColor: Colors.green[0],
  flex: 1,
  display: 'flex',
  flexFlow: 'column nowrap',
  animationName: fadeIn,
  animationDuration: '0.25s',
  overflowY: 'auto',
  $nest: {
    '.NodeTitle': NodeTitle,
    '&.LibraryNodeArea': LibraryNodeArea,
  },
});
const DescriptionPosition: NestedCSSProperties = {
  outline: 'none',
  border: `1px solid ${Colors.grey[3]}00`,
  $nest: {
    '&:focus': {
      border: `1px solid ${Colors.grey[3]}`,
    },
  },
};
const NodeContainer = style({
  position: 'relative',
  breakInside: 'avoid',
  height: '100%',
  background: Colors.grey[9],
  maxWidth: '100%',
  display: 'flex',
  flexFlow: 'column nowrap',
  $nest: {
    '.DescriptionPosition': DescriptionPosition,
    '.OpenedNode': OpenedNode,
    '&:hover': {
      $nest: {
        '> .ActionsMenu': {
          opacity: 1.0,
          pointerEvents: 'auto',
        },
      },
    },
    ...Object.keys(GraphQLDarkBackgrounds).reduce((a, b) => {
      a[`&.NodeBackground-${b}`] = {
        background: `${mix(GraphQLDarkBackgrounds[b], Colors.grey[10], 40)}`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        $nest: {
          '&:hover, &.Active': {
            background: mix(GraphQLBackgrounds[b], Colors.grey[0], 80),
          },
        },
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});

const NodeFields = style({
  flex: 1,
  overflowY: 'auto',
});

const NodeInterfaces = style({
  maxWidth: 600,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'flex-start',
  marginBottom: 5,
});

const GapBar = style({
  width: '100%',
  height: '100%',
  background: `${Colors.grey[10]}99`,
  transition: '.25s background ease-in-out',
  $nest: {
    '&:hover': {
      background: `${Colors.grey[10]}11`,
    },
  },
});

const NodeArea = style({
  minWidth: '80%',
  maxWidth: '50vw',
  left: '20%',
  position: 'absolute',
  height: '100%',
  boxShadow: `${Colors.grey[10]} 0 0 20px`,
});

const EditableTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 'bold',
};

export const ActiveNode: React.FC<NodeProps> = ({ node, parentNode, ...sharedProps }) => {
  const [openedNode, setOpenedNode] = useState<{
    type: keyof Pick<ParserField, 'args' | 'directives'> | 'output' | 'directiveOutput';
    index: number;
  }>();

  const { libraryTree, tree, setTree, setSelectedNode, selectedNode, selectedNodeRef } = useTreesState();

  const isLibrary = !!libraryTree.nodes.find((lN) => lN.name === node.name && lN.data.type === node.data.type);
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
      ? (tree.nodes.find((n) => n.name === field.type.name && !isExtensionNode(n.data.type!)) ||
          libraryTree.nodes.find((n) => n.name === field.type.name && !isExtensionNode(n.data.type!)))!
      : undefined;
  };
  useEffect(() => {
    setOpenedNode(undefined);
  }, [node]);

  const inactiveClick = () => {
    if (openedNode) {
      setOpenedNode(undefined);
    }
  };
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
    <div
      className={`${NodeContainer} NodeBackground-${node.type.name} ${DOM.classes.node} ${DOM.classes.nodeSelected}`}
      ref={selectedNodeRef}
    >
      <ActiveDescription
        onChange={(d) => {
          node.description = d;
          setTree({ ...tree });
        }}
        isLocked={isLocked}
        value={node.description || ''}
      />
      {!!node.interfaces?.length && (
        <div className={NodeInterfaces}>
          {node.interfaces.map((i) => (
            <NodeInterface
              key={i}
              isLocked={isLocked}
              onDelete={() => {
                node.interfaces = node.interfaces?.filter((oldInterface) => oldInterface !== i);
                setTree({ ...tree });
              }}
            >
              {i}
            </NodeInterface>
          ))}
        </div>
      )}
      {openedNodeNode && openedNode && (
        <div className={`OpenedNode`}>
          <div className={GapBar} onClick={inactiveClick} />
          <div className={NodeArea}>
            <ActiveNode
              {...sharedProps}
              readonly={isLocked}
              parentNode={openedNode.type === 'args' || openedNode.type === 'directives' ? node : undefined}
              node={openedNodeNode}
              onDuplicate={undefined}
              onDelete={() => {
                if (openedNode.type === 'directives') {
                  node.directives!.splice(openedNode.index, 1);
                }
                if (openedNode.type === 'args') {
                  node.args!.splice(openedNode.index, 1);
                }
                if (openedNode.type === 'output' || openedNode.type === 'directiveOutput') {
                  sharedProps.onDelete(openedNodeNode);
                  return;
                }
                DOM.panLock = false;
                setTree({ ...tree });
              }}
            />
          </div>
        </div>
      )}
      <div
        className={`${MainNodeArea}${isLibrary ? ' LibraryNodeArea' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`NodeTitle`}>
          <div className={`NodeName`}>
            {parentNode && <EditableText style={EditableTitle} value={`${parentNode.name}.`} />}
            {isLocked && <EditableText style={EditableTitle} value={node.name} />}
            {!isLocked && (
              <EditableText
                style={EditableTitle}
                value={node.name}
                onChange={(v) => {
                  //TODO: Change the node name
                  ChangeAllRelatedNodes({
                    newName: v,
                    nodes: tree.nodes,
                    oldName: node.name,
                  });
                  const reselect = node.name === selectedNode?.name;
                  node.name = v;
                  setTree({ ...tree });
                  if (reselect && selectedNode) {
                    setSelectedNode({
                      ...node,
                      name: v,
                    });
                  }
                }}
              />
            )}
          </div>
          <div className={`NodeType`}>
            <ActiveType type={node.type} />
          </div>
          {!isLocked && (
            <TopNodeMenu
              {...sharedProps}
              onDelete={() => sharedProps.onDelete(node)}
              onDuplicate={() => sharedProps.onDuplicate?.(node)}
              node={node}
            />
          )}
        </div>
        <div className={NodeFields}>
          {node.directives?.map((d, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === d.type.name) || libraryTree.nodes.find((n) => n.name === d.type.name)
            );
            return (
              <ActiveDirective
                isLocked={isLocked}
                parentNode={node}
                parentNodeTypeName={node.type.name}
                key={d.name}
                onInputClick={() => {
                  setOpenedNode((oN) =>
                    oN?.index === i && oN.type === 'directives' ? undefined : { type: 'directives', index: i },
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
                inputOpen={openedNode?.type === 'directives' && openedNode?.index === i}
                outputDisabled={outputDisabled}
                outputOpen={openedNode?.type === 'directiveOutput' && openedNode?.index === i}
                onDelete={() => {
                  setOpenedNode(undefined);
                  node.directives!.splice(i, 1);
                  DOM.panLock = false;
                  setTree({ ...tree });
                }}
              />
            );
          })}
          {node.args?.map((a, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === a.type.name) || libraryTree.nodes.find((n) => n.name === a.type.name)
            );
            const Component = isArgumentNode ? ActiveArgument : isInputNode ? ActiveInputValue : ActiveField;
            return (
              <>
                <Component
                  parentNode={node}
                  isLocked={isLocked}
                  parentNodeTypeName={node.type.name}
                  key={a.name}
                  onInputClick={() => {
                    setOpenedNode((oN) =>
                      oN?.index === i && oN.type === 'args' ? undefined : { type: 'args', index: i },
                    );
                  }}
                  onOutputClick={() => {
                    setOpenedNode((oN) =>
                      oN?.index === i && oN.type === 'output' ? undefined : { type: 'output', index: i },
                    );
                  }}
                  node={a}
                  inputOpen={openedNode?.type === 'args' && openedNode?.index === i}
                  outputDisabled={outputDisabled}
                  outputOpen={openedNode?.type === 'output' && openedNode?.index === i}
                  onDelete={() => {
                    node.args!.splice(i, 1);
                    DOM.panLock = false;
                    setTree({ ...tree });
                  }}
                />
              </>
            );
          })}
          <div style={{ marginBottom: 50 }} />
        </div>
      </div>
    </div>
  );
};
