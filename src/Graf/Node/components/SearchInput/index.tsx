import React, { useRef } from 'react';
import { Plus, Search, X } from '@/Graf/icons';
import styled from '@emotion/styled';

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

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  padding: 0 16px;
`;

const Main = styled.input`
  background-color: ${({ theme }) => theme.background.mainFurther};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  border: 0;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 12px 0 28px;
  font-size: 14px;
  outline: 0;
  position: relative;
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
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
  width: 30px;
`;

const XIconContainer = styled(IconContainerStyle)`
  width: 36px;
  right: 12px;
  cursor: pointer;
`;

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
  return (
    <Wrapper data-cy={cypressName}>
      <SearchIconContainer>
        {icon === 'search' && <Search width={14} height={14} />}
        {icon === 'add' && <Plus width={14} height={14} />}
      </SearchIconContainer>
      {value && (
        <XIconContainer onClick={onClear}>
          <X width={10} height={10} />
        </XIconContainer>
      )}
      <Main
        ref={ref}
        autoFocus={autoFocus}
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
