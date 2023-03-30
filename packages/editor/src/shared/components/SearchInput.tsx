import React from 'react';
import styled from '@emotion/styled';
import * as vars from '@/vars';
import { Plus, Search } from '@aexol-studio/styling-system';

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
`;

const Main = styled.input`
  background-color: ${({ theme }) => theme.neutral[700]};
  border-radius: ${(p) => p.theme.radius}px;
  color: ${({ theme }) => theme.text.default};
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 12px 0 44px;
  font-size: 14px;
  outline: 0;
  position: relative;
  border-color: ${(p) => p.theme.neutral[200]};
  border-width: 1px;
  border-style: solid;
  transition: ${vars.transition};
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
  :focus {
    border-color: ${({ theme }) => theme.accents[200]};
  }
`;

const IconContainerStyle = styled.span`
  position: absolute;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SearchIconContainer = styled(IconContainerStyle)`
  margin-left: 15px;
  color: ${({ theme }) => theme.text.disabled};
`;

export const SearchInput = React.forwardRef<HTMLInputElement, MenuSearchProps>(
  (
    {
      value,
      onChange,
      onClear,
      onSubmit,
      placeholder = 'Search...',
      icon = 'search',
    },
    ref,
  ) => {
    return (
      <Wrapper>
        <SearchIconContainer>
          {icon === 'search' && <Search />}
          {icon === 'add' && <Plus />}
        </SearchIconContainer>
        <Main
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
  },
);
