import React, { useRef } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { Search, X } from '@/Graf/icons';
import { darken, toHex } from 'color2k';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  autoFocus?: boolean;
}

const Main = themed(
  ({
    colors: {
      graf: {
        root: {
          search: { background },
        },
      },
    },
  }) =>
    style({
      background,
      borderRadius: 5,
      color: Colors.grey,
      border: 0,
      width: '100%',
      minWidth: 0,
      height: 36,
      padding: `0 12px`,
      paddingLeft: 28,
      fontSize: 14,
      outline: 0,
      position: 'relative',
      $nest: {
        '&::placeholder': {
          color: toHex(darken(Colors.grey, 0.4)),
        },
      },
    }),
);

const SearchIconContainer = style({
  position: 'absolute',
  height: 36,
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});
const XIconContainer = style({
  position: 'absolute',
  height: 36,
  width: 36,
  right: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
});
const Wrapper = style({
  position: 'relative',
  maxWidth: '100%',
  padding: 16,
  paddingTop: 0,
  paddingBottom: 0,
});

export const MenuSearch: React.FC<MenuSearchProps> = ({
  value,
  onChange,
  onClear,
  onSubmit,
  autoFocus = true,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  return (
    <div
      className={Wrapper}
      data-cy={
        GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu
          .searchableMenu.searchInput
      }
    >
      <span className={SearchIconContainer}>
        <Search width={14} height={14} />
      </span>
      {value && (
        <span onClick={onClear} className={XIconContainer}>
          <X width={10} height={10} />
        </span>
      )}
      <input
        ref={ref}
        autoFocus={autoFocus}
        className={Main(theme)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
        placeholder="Search..."
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
