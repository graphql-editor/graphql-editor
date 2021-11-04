import React, { useRef } from 'react';
import { style } from 'typestyle';
import { Plus, Search, X } from '@/Graf/icons';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  autoFocus?: boolean;
  cypressName: string;
  placeholder?: string;
  icon?: 'search' | 'add';
}

const Main = themed(({ text, disabled, background: { mainFurther } }) =>
  style({
    background: mainFurther,
    borderRadius: 5,
    color: text,
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
        color: disabled,
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

export const SearchInput: React.FC<MenuSearchProps> = ({
  cypressName,
  value,
  onChange,
  onClear,
  onSubmit,
  autoFocus = true,
  placeholder = 'Search...',
  icon = 'search',
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  return (
    <div className={Wrapper} data-cy={cypressName}>
      <span className={SearchIconContainer}>
        {icon === 'search' && <Search width={14} height={14} />}
        {icon === 'add' && <Plus width={14} height={14} />}
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
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
