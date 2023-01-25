import React, { useRef } from 'react';

import styled from '@emotion/styled';
import { X } from '@/shared/icons';
import { Search } from '@/icons/Search';

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  placeholder?: string;
  icon?: 'search' | 'add';
}

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem;
  gap: 0.5rem;
  display: flex;
`;

const Main = styled.input<{ searching?: boolean }>`
  background-color: ${({ theme }) => theme.background.mainFurthers};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  width: auto;
  flex: 1;
  min-width: 0;
  padding: 0.5rem 1rem 0.5rem
    ${({ searching }) => (searching ? '2rem' : '0.5rem')};
  font-size: 14px;
  outline: 0;
  position: relative;
  border: 1px solid ${({ theme }) => theme.background.mainClose};

  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
  &:focus {
    border-bottom-color: ${({ theme }) => theme.background.mainCloser};
  }
`;

const SearchIconContainer = styled.span`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  z-index: 1;
  color: ${({ theme }) => theme.disabled};
`;

const XIconContainer = styled.span`
  right: 12px;
  cursor: pointer;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  z-index: 1;
  svg {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const MenuSearch: React.FC<MenuSearchProps> = ({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search...',
  icon = 'search',
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Wrapper>
      {icon === 'search' && (
        <SearchIconContainer>
          <Search />
        </SearchIconContainer>
      )}
      {value && (
        <XIconContainer onClick={onClear}>
          <X width={10} height={10} />
        </XIconContainer>
      )}
      <Main
        autoFocus
        searching={icon === 'search'}
        ref={ref}
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
    </Wrapper>
  );
};
