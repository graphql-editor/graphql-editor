import React, { useState } from 'react';
import { ValueDefinition } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName, PaintFieldName } from './FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { NodeTypeOptionsMenu } from '@/Graf/Node/ContextMenu';
import { useTreesState } from '@/state/containers/trees';
import { DetailMenuItem, FieldPort, Menu, MenuScrollingArea, NodeFieldContainer, Title } from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';

const Name = style({
  fontSize: FIELD_NAME_SIZE,
  marginRight: 4,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
const Type = style({ fontSize: FIELD_TYPE_SIZE, color: Colors.green[0] });
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 32,
  right: 5,
  zIndex: 2,
});

export const ActiveField: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  parentNodeTypeName,
  isLocked,
  onDelete,
}) => {
  const { tree, setTree } = useTreesState();
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [detailsMenuOpen, setDetailsMenuOpen] = useState(false);
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  return (
    <NodeFieldContainer
      className={`NodeType-${parentNodeTypeName} ${
        inputOpen || detailsMenuOpen || outputOpen || optionsMenuOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && (
        <FieldPort
          onClick={onInputClick}
          open={inputOpen}
          info={{
            message: 'Edit field arguments',
            placement: 'left',
          }}
        />
      )}
      <Title>
        <div className={Name}>
          {!isLocked && (
            <ActiveFieldName
              afterChange={(newName) => {
                node.name = newName;
                setTree({ ...tree });
              }}
              data={node.data}
              name={node.name}
              args={node.args}
            />
          )}
          {isLocked && <PaintFieldName data={node.data} name={node.name} args={node.args} />}
        </div>
        <div className={Type}>
          <ActiveType type={node.type} />
        </div>
      </Title>
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'More', open: 'More' }}
          onClick={() => {
            setDetailsMenuOpen(!detailsMenuOpen);
          }}
        >
          {detailsMenuOpen && (
            <div className={OptionsMenuContainer}>
              <Menu menuName={'Node options'} hideMenu={() => setDetailsMenuOpen(false)}>
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            </div>
          )}
        </FieldPort>
      )}
      {!isLocked && !isEnumValue && (
        <FieldPort
          icons={{ closed: 'Arrq', open: 'Arrq' }}
          onClick={() => {
            setOptionsMenuOpen(!optionsMenuOpen);
          }}
        >
          {optionsMenuOpen && (
            <div className={OptionsMenuContainer}>
              <NodeTypeOptionsMenu hideMenu={() => setOptionsMenuOpen(false)} node={node} />
            </div>
          )}
        </FieldPort>
      )}
      {!outputDisabled && (
        <FieldPort
          onClick={onOutputClick}
          open={outputOpen}
          info={{
            message: `Expand ${node.type.name} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && <div className={'NodeFieldPortPlaceholder'} />}
    </NodeFieldContainer>
  );
};
