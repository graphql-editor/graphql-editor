import React, { useRef } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { Search, X } from '@/Graf/icons';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}

const Main = style({
  background: Colors.pink[9],
  color: Colors.grey[0],
  border: 0,
  width: '100%',
  minWidth: 0,
  height: 24,
  padding: `0 12px`,
  paddingLeft: 24,
  borderRadius: 4,
  outline: 0,
  position: 'relative',
  $nest: {
    '&::placeholder': {
      color: Colors.grey[4],
    },
  },
});

const SearchIconContainer = style({
  position: 'absolute',
  height: 24,
  width: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});
const XIconContainer = style({
  position: 'absolute',
  height: 24,
  width: 24,
  right: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
});
const Wrapper = style({
  position: 'relative',
  maxWidth: '100%',
  padding: 12,
});

export const MenuSearch: React.FC<MenuSearchProps> = ({ value, onChange, onClear }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={Wrapper}>
      <span className={SearchIconContainer}>
        <Search />
      </span>
      {value && (
        <span onClick={onClear} className={XIconContainer}>
          <X />
        </span>
      )}
      <input
        ref={ref}
        autoFocus
        className={Main}
        placeholder="Search..."
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
