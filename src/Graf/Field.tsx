import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '../Colors';
export interface FieldProps {
  node: ParserField;
  inputOpen: boolean;
  outputOpen: boolean;
  onInputClick: () => void;
  onOutputClick: () => void;
  last?: boolean;
}

const Main = style({
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  padding: `5px 5px`,
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
const Title = style({ fontSize: 10, display: 'flex', marginRight: 'auto', marginLeft: 5, alignItems: 'baseline' });
const Name = style({ fontSize: 10, marginRight: 4 });
const Type = style({ fontSize: 8, color: Colors.green[0] });
export const Field: React.FC<FieldProps> = ({ node, inputOpen, outputOpen, onInputClick, onOutputClick, last }) => {
  return (
    <div className={`${Main} ${last ? LastField : ''} ${inputOpen || outputOpen ? 'Active' : ''}`}>
      <div className={'NodeFieldPort'} onClick={onInputClick}>
        {inputOpen ? '-' : '+'}
      </div>
      <div className={Title}>
        <div className={Name}>{node.name}</div>
        <div className={Type}>{node.type.name}</div>
      </div>
      <div className={'NodeFieldPort'} onClick={onOutputClick}>
        {outputOpen ? '-' : '+'}
      </div>
    </div>
  );
};
