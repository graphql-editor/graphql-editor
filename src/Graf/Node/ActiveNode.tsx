import React, { useState, useRef } from 'react';
import { ParserField, TypeDefinition, ValueDefinition } from 'graphql-zeus';
import { ActiveField } from './Field/ActiveField';
import { style } from 'typestyle';
import { Colors, mix } from '@Colors';
import { FIELD_HEIGHT } from '@Graf/constants';
import { GraphQLBackgrounds } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@Graf/DOM';
import { ActiveFieldType } from './Field/FieldType/ActiveFieldType';
import { More } from '@Graf/icons/More';
import { Plus } from '@Graf/icons/Plus';
import { NodeFields, NodeTitle } from './SharedNode';
import { EditableText } from '@Graf/Node/Field/FieldName/EditableText';
import { ActiveDescription } from './Description/ActiveDescription';
import { ChangeAllRelatedNodes } from '@Graf/Resolve/Related';
import { useTreesState } from '@state/containers/trees';
import { DetailMenuItem } from './Menu/DetailMenuItem';
import { Menu } from './Menu/Menu';
import { MenuScrollingArea } from './Menu/MenuScrollingArea';
import { NodeAddFieldMenu } from './NodeAddFieldMenu';
import { NodeImplementInterfacesMenu } from './NodeImplementInterfaceMenu';
import { NodeInterface } from './NodeInterface';
export interface NodeProps {
  node: ParserField;
  onTreeChanged: () => void;
  onDelete: () => void;
}
const LowerButton: NestedCSSProperties = {
  background: '#11303D',
  borderRadius: 4,
  color: Colors.grey[0],
  padding: `5px 10px`,
  transition: `background .25s ease-in-out`,
  $nest: {
    '&:hover': {
      background: Colors.blue[3],
    },
  },
};
const ActionsMenu: NestedCSSProperties = {
  marginTop: 4,
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  fontSize: 10,
  gridGap: 4,
  opacity: 0,
  transition: `opacity .25s ease-in-out`,
  pointerEvents: 'none',
  $nest: {
    '.LowerButton': LowerButton,
  },
};
const LeftNodeArea: NestedCSSProperties = {
  position: 'absolute',
  left: -300,
  width: 300,
  zIndex: 4,
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
};
const LeftNodeAreaNode: NestedCSSProperties = { position: 'relative' };
const RightNodeArea: NestedCSSProperties = { position: 'absolute', right: -300, width: 300, zIndex: 4 };
const RightNodeAreaNode: NestedCSSProperties = { position: 'absolute' };

const LibraryNodeArea: NestedCSSProperties = {
  borderStyle: 'dashed',
};
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  transition: `border-color .25s ease-in-out`,
  borderColor: Colors.green[0],
  $nest: {
    '.NodeTitle': NodeTitle,
    '.NodeFields': NodeFields,
    '&.LibraryNodeArea': LibraryNodeArea,
  },
};
const DescriptionPosition: NestedCSSProperties = {
  position: 'absolute',
  transformOrigin: 'center bottom',
  transform: 'translate(0px, calc(-100% - 10px))',
  width: '100%',
};
const NodeContainer = style({
  position: 'relative',
  breakInside: 'avoid',
  maxWidth: '100%',
  margin: 10,
  $nest: {
    '.DescriptionPosition': DescriptionPosition,
    '.LeftNodeArea': LeftNodeArea,
    '.RightNodeArea': RightNodeArea,
    '.MainNodeArea': MainNodeArea,
    '.RightNodeAreaNode': RightNodeAreaNode,
    '.LeftNodeAreaNode': LeftNodeAreaNode,
    '.ActionsMenu': ActionsMenu,
    '&:hover': {
      $nest: {
        '> .ActionsMenu': {
          opacity: 1.0,
          pointerEvents: 'auto',
        },
      },
    },
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeBackground-${b}`] = {
        background: GraphQLBackgrounds[b],
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        background: GraphQLBackgrounds[b],
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

const NodeInterfaces = style({
  position: 'absolute',
  maxWidth: 200,
  display: 'flex',
  flexFlow: 'row wrap',
  transform: 'translate(calc(-100% - 10px))',
  alignItems: 'flex-start',
});

const NodeMenuContainer = style({
  position: 'absolute',
  top: 35,
  zIndex: 2,
});

type PossibleMenus = 'field' | 'interface' | 'directive' | 'options';

export const ActiveNode: React.FC<NodeProps> = ({ node, ...sharedProps }) => {
  const { onTreeChanged, onDelete } = sharedProps;

  const [openedInputs, setOpenedInputs] = useState<number[]>([]);
  const [openedOutputs, setOpenedOutputs] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState<PossibleMenus>();
  const thisNode = useRef<HTMLDivElement>(null);
  const { libraryTree, tree, setSelectedNode, selectedNode } = useTreesState();

  const isLibrary = !!libraryTree.nodes.find((lN) => lN.name === node.name);
  console.log(node);
  const hideMenu = () => {
    setMenuOpen(undefined);
  };

  return (
    <div className={`${NodeContainer} ${DOM.classes.node} ${DOM.classes.nodeSelected}`} ref={thisNode}>
      <ActiveDescription
        className={'DescriptionPosition'}
        onChange={(d) => {
          node.description = d;
          onTreeChanged();
        }}
        isLocked={isLibrary}
        value={node.description || ''}
      />
      {!!node.interfaces?.length && (
        <div className={NodeInterfaces}>
          {node.interfaces.map((i) => (
            <NodeInterface
              onDelete={() => {
                node.interfaces = node.interfaces?.filter((oldInterface) => oldInterface !== i);
                onTreeChanged();
              }}
            >
              {i}
            </NodeInterface>
          ))}
        </div>
      )}
      <div className={`LeftNodeArea`}>
        {openedInputs.sort().map((o) => (
          <div key={o} className={`LeftNodeAreaNode`} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <ActiveNode
              {...sharedProps}
              node={node.args![o]}
              onDelete={() => {
                setOpenedInputs([]);
                setOpenedOutputs([]);
                node.args!.splice(o, 1);
                DOM.panLock = false;
                onTreeChanged();
              }}
            />
          </div>
        ))}
      </div>
      <div className={`RightNodeArea`}>
        {openedOutputs.sort().map((o) => (
          <div key={o} className={`RightNodeAreaNode`} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <ActiveNode
              {...sharedProps}
              node={
                (tree.nodes.find((n) => n.name === node.args![o].type.name) ||
                  libraryTree.nodes.find((n) => n.name === node.args![o].type.name))!
              }
            />
          </div>
        ))}
      </div>
      <div
        className={`MainNodeArea${isLibrary ? ' LibraryNodeArea' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`NodeTitle`}>
          <div className={`NodeName`}>
            {isLibrary && <EditableText value={node.name} />}
            {!isLibrary && (
              <EditableText
                value={node.name}
                onChange={(v) => {
                  //TODO: Change the node name
                  ChangeAllRelatedNodes({
                    newName: v,
                    nodes: tree.nodes,
                    oldName: node.name,
                  });
                  const reselect = node.name === selectedNode;
                  node.name = v;
                  onTreeChanged();
                  if (reselect && selectedNode) {
                    setSelectedNode(v);
                  }
                }}
              />
            )}
          </div>
          <div className={`NodeType`}>
            <ActiveFieldType type={node.type} />
          </div>
          {!isLibrary && (
            <>
              {node.data.type !== TypeDefinition.ScalarTypeDefinition &&
                node.data.type !== TypeDefinition.EnumTypeDefinition && (
                  <div
                    className={'NodeIconArea'}
                    onClick={() => {
                      setMenuOpen('field');
                    }}
                  >
                    <Plus />
                    {menuOpen === 'field' && (
                      <div className={NodeMenuContainer}>
                        <NodeAddFieldMenu node={node} onTreeChanged={onTreeChanged} hideMenu={hideMenu} />
                      </div>
                    )}
                  </div>
                )}
              {node.data.type === TypeDefinition.EnumTypeDefinition && (
                <div
                  className={'NodeIconArea'}
                  onClick={() => {
                    node.args = [
                      ...(node.args || []),
                      {
                        data: {
                          type: ValueDefinition.EnumValueDefinition,
                        },
                        name: 'enumValue' + ((node.args?.length || 0) + 1),
                        type: {
                          name: ValueDefinition.EnumValueDefinition,
                        },
                      },
                    ];
                    onTreeChanged();
                  }}
                >
                  <Plus />
                </div>
              )}

              {node.data.type === TypeDefinition.ObjectTypeDefinition && (
                <div
                  className={'NodeIconArea'}
                  onClick={() => {
                    setMenuOpen('interface');
                  }}
                >
                  I
                  {menuOpen === 'interface' && (
                    <div className={NodeMenuContainer}>
                      <NodeImplementInterfacesMenu node={node} onTreeChanged={onTreeChanged} hideMenu={hideMenu} />
                    </div>
                  )}
                </div>
              )}
              <div
                className={'NodeIconArea'}
                onClick={() => {
                  setMenuOpen('directive');
                }}
              >
                @
              </div>
              <div
                className={'NodeIconArea'}
                onClick={() => {
                  setMenuOpen('options');
                }}
              >
                <More />
                {menuOpen === 'options' && (
                  <div className={NodeMenuContainer}>
                    <Menu hideMenu={hideMenu}>
                      <MenuScrollingArea>
                        <DetailMenuItem onClick={onDelete}>Delete node</DetailMenuItem>
                        {node.data.type === TypeDefinition.ObjectTypeDefinition && (
                          <DetailMenuItem onClick={() => {}}>implement interface</DetailMenuItem>
                        )}
                        <DetailMenuItem onClick={() => {}}>add directive</DetailMenuItem>
                      </MenuScrollingArea>
                    </Menu>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className={`NodeFields NodeBackground-${node.type.name}`}>
          {node.args?.map((a, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === a.type.name) || libraryTree.nodes.find((n) => n.name === a.type.name)
            );
            return (
              <ActiveField
                isLocked={isLibrary}
                onTreeChanged={onTreeChanged}
                parentNodeTypeName={node.type.name}
                last={i === node.args!.length - 1}
                key={a.name}
                onInputClick={() => {
                  setOpenedInputs((oI) => (oI.includes(i) ? oI.filter((o) => o !== i) : [...oI, i]));
                }}
                onOutputClick={() => {
                  setOpenedOutputs((oO) => (oO.includes(i) ? oO.filter((o) => o !== i) : [...oO, i]));
                }}
                node={a}
                inputOpen={openedInputs.includes(i)}
                outputDisabled={outputDisabled}
                outputOpen={openedOutputs.includes(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
