import React from 'react';
import { ParserField, ValueDefinition } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_HEIGHT } from '@/Graf/constants';
import { Plus } from '@/Graf/icons';
import { ConvertValueToEditableString } from '@/GraphQL/Convert';

interface FieldProps {
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
  background: Colors.grey[7],
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
    '&:hover': {
      background: Colors.grey[6],
      $nest: {
        '.NodeFieldPort': {
          opacity: 0.5,
        },
      },
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
      backgroundColor: Colors.blue[6],
      cursor: 'pointer',
      opacity: 0.0,
      transition: 'all 0.25s ease-in-out',
      $nest: {
        '&:hover': {
          opacity: `1.0 !important`,
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
const Name = style({
  fontSize: 10,
  marginRight: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ActiveDirective: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  last,
  onTreeChanged,
  isLocked,
}) => {
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  return (
    <div className={`${Main} ${last ? LastField : ''} ${inputOpen || outputOpen ? 'Active' : ''}`}>
      {!inputDisabled && !isLocked && !isEnumValue ? (
        <div className={'NodeFieldPort'} onClick={onInputClick}>
          {inputOpen ? '-' : <Plus height={7} width={7} />}
        </div>
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <div className={Title}>
        <div className={Name}>{ConvertValueToEditableString(node)}</div>
      </div>
      {!outputDisabled && (
        <div className={'NodeFieldPort'} onClick={onOutputClick}>
          {outputOpen ? '-' : <Plus height={7} width={7} />}
        </div>
      )}
      {outputDisabled && isLocked && <div className={'NodeFieldPortPlaceholder'} />}
    </div>
  );
};
