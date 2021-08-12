import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';

interface MenuItemProps {
  node: ParserField;
  onClick: () => void;
}

const Main = themed(({ colors: { colors, hover } }) =>
  style({
    display: 'flex',
    padding: `8px 16px`,
    fontSize: 14,
    cursor: 'pointer',
    scrollSnapAlign: 'end',
    $nest: {
      ...Object.keys(colors).reduce((a, b) => {
        a[`.MenuItemText-${b}`] = {
          color: `${(colors as any)[b]}dd`,
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
      '.MenuItemText': {
        transition: 'color .25s ease-in-out',
        width: '100%',
        $nest: {
          '&:hover': {
            color: hover,
          },
        },
      },
    },
  }),
);

export const MenuItem: React.FC<MenuItemProps> = ({ node, onClick }) => {
  const { theme } = useTheme();
  return (
    <div
      className={Main(theme)}
      onClick={onClick}
      data-cy={
        GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
          .searchableMenu.optionToSelect
      }
    >
      <span className={`MenuItemText MenuItemText-${node.type.name}`}>
        {node.name}
      </span>
    </div>
  );
};
