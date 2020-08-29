import React from 'react';
import { GraphQLBackgrounds } from '@editor/theme';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { X } from '@Graf/icons';

interface NodeInterfaceProps {
  onDelete: () => void;
}

const NodeInterfaceBlock = style({
  padding: `3px 6px`,
  background: GraphQLBackgrounds.interface,
  color: Colors.grey[1],
  fontSize: 10,
  borderRadius: 4,
  marginLeft: 10,
  position: 'relative',
  cursor: 'pointer',
  $nest: {
    '.DeleteInterface': {
      opacity: 0.0,
      position: 'absolute',
      pointerEvents: 'none',
      cursor: 'pointer',
      top: -17,
      right: 0,
      fontSize: 8,
      width: 200,
      textAlign: 'right',
      $nest: {
        svg: {
          fill: 'red',
        },
        '&:hover': {
          opacity: 1.0,
        },
      },
    },
    svg: {
      display: 'none',
      marginLeft: 5,
      fill: Colors.red[0],
    },
    '&:hover': {
      $nest: {
        '.DeleteInterface': {
          opacity: 1.0,
        },
        svg: {
          display: 'inline',
        },
      },
    },
  },
});

export const NodeInterface: React.FC<NodeInterfaceProps> = ({ onDelete, children }) => {
  return (
    <div
      className={NodeInterfaceBlock}
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <div className={'DeleteInterface'}>Click to delete</div>
      <span>
        {children}
        <X fill={Colors.red[0]} />
      </span>
    </div>
  );
};
