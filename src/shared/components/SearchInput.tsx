import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import {
  KeyboardActions,
  useIOState,
  useLayoutState,
  useNavigationState,
  useTreesState,
} from '@/state/containers';
import { Search } from '@/Graf/icons';

const SearchContainer = styled.div`
  width: '100%';
  height: 50px;
  position: relative;

  svg {
    position: absolute;
    top: 9px;
    left: 9px;
    z-index: 200;
  }
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
    const { setActions } = useIOState();
    const { menuState } = useNavigationState();
    const { setSelectedNode } = useTreesState();
    const { searchVisible, setSearchVisible } = useLayoutState();

    useEffect(() => {
      setActions((acts) => ({
        ...acts,
        [KeyboardActions.FindRelation]: () => {
          if (menuState === 'relation') {
            setSearchVisible(!searchVisible);
          }
        },
      }));

      return () => {
        setActions((acts) => ({
          ...acts,
          [KeyboardActions.FindRelation]: () => {},
        }));
      };
    }, [searchVisible]);

    return (
      <SearchContainer>
        <Search width={18} height={18} />
        <StyledSearchInput
          placeholder="Search..."
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={() => handleSearch('')}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchVisible(false);
              setSelectedNode(undefined);
            }
          }}
        />
      </SearchContainer>
    );
  },
);
