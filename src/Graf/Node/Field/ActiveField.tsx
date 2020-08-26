import React, { useState } from 'react';
import { ParserField, ValueDefinition } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { FIELD_HEIGHT } from '@Graf/constants';
import { ActiveFieldName } from './FieldName/ActiveFieldName';
import { ActiveFieldType } from './FieldType/ActiveFieldType';
import { PaintFieldName } from './FieldName/PaintFieldName';
import { NodeTypeOptionsMenu } from '../NodeTypeOptionsMenu';
import { BuiltInScalars } from '@Graf/Resolve/BuiltInNodes';
import { ActiveInputValueName } from './FieldName/ActiveInputValueName';
export interface FieldProps {
  node: ParserField;
  inputOpen: boolean;
  outputOpen: boolean;
  onInputClick: () => void;
  onOutputClick: () => void;
  inputDisabled?: boolean;
  outputDisabled?: boolean;
  last?: boolean;
  isLocked?: boolean;
  parentNodeTypeName: string;
  onTreeChanged: () => void;
}

const Main = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  height: FIELD_HEIGHT,
  margin: `0 0`,
  transition: 'background 0.25s ease-in-out',
  $nest: {
    '&.Active': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          opacity: 1,
        },
      },
    },
    '.NodeFieldPortPlaceholder': {
      width: 24,
      height: 16,
    },
    '.NodeFieldPort': {
      position: 'relative',
      width: 16,
      height: 16,
      borderRadius: 8,
      fontSize: 7,
      margin: `0 4px`,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      background: 'transparent',
      color: 'transparent',
      cursor: 'pointer',
      userSelect: 'none',
      '-moz-user-select': 'none',
      transition: 'all 0.25s ease-in-out',
      $nest: {
        '&:hover': {
          backgroundColor: Colors.blue[6],
        },
      },
    },
    '&:hover': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          background: '#11303d',
          color: Colors.grey[0],
        },
      },
    },
  },
});
const LastField = style({
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
});
const Title = style({
  fontSize: 10,
  display: 'flex',
  flex: 1,
  alignItems: 'baseline',
  overflow: 'hidden',
});
const Name = style({ fontSize: 10, marginRight: 4, overflow: 'hidden' });
const Type = style({ fontSize: 8, color: Colors.green[0] });
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 20,
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
  last,
  parentNodeTypeName,
  onTreeChanged,
  isLocked,
}) => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  const isInputValue = node.data.type === ValueDefinition.InputValueDefinition;
  const isInputScalarValue = isInputValue && BuiltInScalars.find((s) => s.name === node.type.name);
  return (
    <div
      className={`NodeType-${parentNodeTypeName} ${Main} ${last ? LastField : ''} ${
        inputOpen || outputOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && !isLocked && !isEnumValue && !isInputScalarValue ? (
        <div className={'NodeFieldPort'} onClick={onInputClick}>
          {inputOpen ? '-' : '+'}
        </div>
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <div className={Title}>
        <div className={Name}>
          {!isLocked && !isInputValue && (
            <ActiveFieldName
              afterChange={(newName) => {
                node.name = newName;
                onTreeChanged();
              }}
              data={node.data}
              name={node.name}
              args={node.args}
            />
          )}
          {isLocked && <PaintFieldName data={node.data} name={node.name} args={node.args} />}
          {!isLocked && isInputValue && (
            <ActiveInputValueName
              afterChange={(newName) => {
                node.name = newName;
                onTreeChanged();
              }}
              changeValue={(i, v) => {
                node.args![i].name = v;
                onTreeChanged();
              }}
              node={node}
            />
          )}
        </div>
        <div className={Type}>
          <ActiveFieldType type={node.type} />
        </div>
      </div>
      {!isLocked && !isEnumValue && (
        <>
          <div
            className={'NodeFieldPort'}
            onClick={() => {
              setOptionsMenuOpen(!optionsMenuOpen);
            }}
          >
            <span>{'[!]'}</span>
            {optionsMenuOpen && (
              <div className={OptionsMenuContainer}>
                <NodeTypeOptionsMenu
                  hideMenu={() => setOptionsMenuOpen(false)}
                  node={node}
                  onTreeChanged={onTreeChanged}
                />
              </div>
            )}
          </div>
        </>
      )}
      {!outputDisabled && (
        <div className={'NodeFieldPort'} onClick={onOutputClick}>
          {outputOpen ? '-' : '+'}
        </div>
      )}
      {outputDisabled && isLocked && <div className={'NodeFieldPortPlaceholder'} />}
    </div>
  );
};
