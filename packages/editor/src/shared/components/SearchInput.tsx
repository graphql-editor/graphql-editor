import styled from '@emotion/styled';
import React from 'react';

const SearchContainer = styled.div`
  width: '100%';
  height: 50px;
  position: relative;
`;

const StyledSearchInput = styled.input`
  background-color: ${({ theme }) => theme.background.mainClose};
  color: ${({ theme }) => theme.text};
  border: 0;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 12px 0 32px;
  font-size: 14px;
  outline: 0;
  position: relative;
  user-select: none;
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

type SearchInputProps = {
  handleSearch: (searchValue: string) => void;
};

export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ handleSearch }) => {
    return (
      <SearchContainer>
        <StyledSearchInput
          placeholder="Search..."
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={() => handleSearch('')}
        />
      </SearchContainer>
    );
  },
);
