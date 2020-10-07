import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { GraphQLColors } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Colors } from '@/Colors';

interface MenuItemProps {
  node: ParserField;
  onClick: () => void;
}

const Main = style({
  display: 'flex',
  padding: `6px 12px`,
  fontSize: 12,
  cursor: 'pointer',
  scrollSnapAlign: 'end',
  $nest: {
    ...Object.keys(GraphQLColors).reduce((a, b) => {
      a[`.MenuItemText-${b}`] = {
        color: `${GraphQLColors[b]}dd`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
    '.MenuItemText': {
      transition: 'color .25s ease-in-out',
      width: '100%',
      $nest: {
        '&:hover': {
          color: Colors.grey[0],
        },
      },
    },
  },
});

export const MenuItem: React.FC<MenuItemProps> = ({ node, onClick }) => {
  return (
    <div className={Main} onClick={onClick}>
      <span className={`MenuItemText MenuItemText-${node.type.name}`}>{node.name}</span>
    </div>
  );
};
