import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '../Colors';
import { FieldType } from './FieldType';
import { FieldName } from './FieldName';
import { FIELD_HEIGHT } from './constants';
export interface FieldProps {
  node: ParserField;
  inputOpen: boolean;
  outputOpen: boolean;
  onInputClick: () => void;
  onOutputClick: () => void;
  inputDisabled?: boolean;
  outputDisabled?: boolean;
  last?: boolean;
  parentNodeTypeName: string;
}

const Main = style({
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  height: FIELD_HEIGHT,
  background: Colors.main[6],
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
      width: 16,
      height: 16,
    },
    '.NodeFieldPort': {
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      background: '#11303d',
      opacity: 0,
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
          opacity: 1,
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
  marginLeft: 5,
  alignItems: 'baseline',
  overflow: 'hidden',
});
const Name = style({ fontSize: 10, marginRight: 4, overflow: 'hidden' });
const Type = style({ fontSize: 8, color: Colors.green[0] });
export const Field: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  last,
  parentNodeTypeName,
}) => {
  return (
    <div
      className={`NodeType-${parentNodeTypeName} ${Main} ${last ? LastField : ''} ${
        inputOpen || outputOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled ? (
        <div className={'NodeFieldPort'} onClick={onInputClick}>
          {inputOpen ? '-' : '+'}
        </div>
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <div className={Title}>
        <div className={Name}>
          <FieldName data={node.data} name={node.name} args={node.args} />
        </div>
        <div className={Type}>
          <FieldType type={node.type} />
        </div>
      </div>
      {!outputDisabled && (
        <div className={'NodeFieldPort'} onClick={onOutputClick}>
          {outputOpen ? '-' : '+'}
        </div>
      )}
    </div>
  );
};
