import styled from '@emotion/styled';

import React, { useEffect, useRef } from 'react';
import { useErrorsState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { Heading } from '@/shared/components';
import { SearchInput } from '@/shared/components';
import { useSortState } from '@/state/containers/sort';
import { SortNodes } from '@/Graf/Node/components/SortNodes';
import { KeyboardActions, useIO } from '@/shared/hooks/io';

const TopBarComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 25px 8px;
  height: 60px;
  background-color: ${({ theme }) => theme.background.mainFar};
  position: relative;
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
  const { mount } = useIO();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const mounted = mount({
      [KeyboardActions.FindRelation]: () => {
        ref.current?.focus();
      },
    });
    return mounted.dispose;
  }, []);
  return (
    <TopBarComponent>
      <Heading heading={heading} />
      {children}
      {!lockGraf && !children && (
        <SortWrapper>
          <SearchInput
            ref={ref}
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
