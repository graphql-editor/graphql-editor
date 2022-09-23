import styled from '@emotion/styled';

import React from 'react';
import { useErrorsState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components';
import { SearchInput } from '@/shared/components';
import { useSortState } from '@/state/containers/sort';
import { SortNodes } from '@/Graf/Node/components/SortNodes';

const TopBarComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 25px 8px;
  height: 60px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.background.mainFar};
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
`;
const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const TopBar: React.FC<{ heading: string }> = ({
  children,
  heading,
}) => {
  const { lockGraf } = useErrorsState();
  const { setFilterNodes, filterNodes } = useSortState();
  return (
    <TopBarComponent>
      <Heading heading={heading} />
      {children}
      {!lockGraf && !children && (
        <SortWrapper>
          <SearchInput
            cypressName={
              GraphQLEditorDomStructure.tree.elements.Graf.searchInput
            }
            autoFocus={false}
            onClear={() => {
              setFilterNodes('');
            }}
            onSubmit={() => {}}
            value={filterNodes}
            onChange={setFilterNodes}
          />
          <SortNodes />
        </SortWrapper>
      )}
    </TopBarComponent>
  );
};
