import React, { useRef, useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { X } from '@Graf/icons/X';
import { Search } from '@Graf/icons/Search';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}

const Main = style({
  background: Colors.grey[8],
  color: Colors.grey[0],
  border: 0,
  width: '100%',
  minWidth: 0,
  height: 30,
  padding: `0 12px`,
  borderRadius: 4,
  outline: 0,
});

const SearchIconContainer = style({
  position: 'absolute',
  height: 30,
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const XIconContainer = style({
  position: 'absolute',
  height: 30,
  width: 30,
  right: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
const Wrapper = style({
  maxWidth: '100%',
  padding: 12,
  paddingBottom: 0,
});

export const MenuSearch: React.FC<MenuSearchProps> = ({ value, onChange, onClear }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  return (
    <div className={Wrapper}>
      {!focus && !value && (
        <span className={SearchIconContainer}>
          <Search />
        </span>
      )}
      {value && (
        <span onClick={onClear} className={XIconContainer}>
          <X />
        </span>
      )}
      <input
        ref={ref}
        autoFocus
        className={Main}
        type="text"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
