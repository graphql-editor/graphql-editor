import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';
import styled from '@emotion/styled';
import React from 'react';

const StyledSearchInput = styled.input`
  background-color: ${({ theme }) => theme.background.mainMiddle};
  color: ${({ theme }) => theme.text};
  border: 0;
  width: 100%;
  min-width: 0;
  height: ${RELATION_CONSTANTS.SEARCHBAR_HEIGHT}px;
  padding: 0px 10px;
  font-size: 12px;
  border-radius: 5px;
  margin: 0;
  outline: 0;
  position: relative;
  user-select: none;
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

type SearchInputProps = {
  handleSearch: (searchValue: string) => void;
  value: string;
};

export const NodeSearchFields: React.FC<SearchInputProps> = React.memo(
  ({ handleSearch, value }) => {
    return (
      <StyledSearchInput
        placeholder="Search..."
        type="text"
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    );
  },
);
