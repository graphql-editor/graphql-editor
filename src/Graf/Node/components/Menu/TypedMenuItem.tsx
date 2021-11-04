import React, { useEffect, useRef } from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';

interface TypedMenuItemProps {
  onClick: () => void;
  name?: string;
  type: string;
  dataType: string;
  selected?: boolean;
}

const Main = themed(({ colors, hover, background }) =>
  style({
    display: 'flex',
    padding: `8px 16px`,
    fontSize: 14,
    cursor: 'pointer',
    scrollSnapAlign: 'end',
    $nest: {
      '&.isSelected, &:hover': {
        background: background.mainClose,
      },
      ...Object.keys(colors).reduce((a, b) => {
        a[`.MenuItemType-${b}`] = {
          color: `${(colors as any)[b]}dd`,
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
      '.MenuItemName': {
        transition: 'color .25s ease-in-out',
        $nest: {
          '&:hover': {
            color: hover,
          },
        },
      },
      '.MenuItemType': {
        fontSize: 14,
        display: 'flex',
        alignItems: 'flex-start',
        marginLeft: 4,
      },
    },
  }),
);

export const TypedMenuItem: React.FC<TypedMenuItemProps> = ({
  type,
  dataType,
  onClick,
  name,
  selected,
}) => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selected]);

  return (
    <div
      ref={ref}
      className={`${Main(theme)} ${selected ? 'isSelected' : ''}`}
      onClick={onClick}
      data-cy={
        GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
          .searchableMenu.optionToSelect
      }
    >
      {name && <span className={`MenuItemName`}>{name}</span>}
      <span className={`MenuItemType MenuItemType-${dataType}`}>{type}</span>
    </div>
  );
};
