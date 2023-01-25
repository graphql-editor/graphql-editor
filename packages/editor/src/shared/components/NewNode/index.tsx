import { Plus } from '@/icons/Plus';
import { ContextMenu } from '@/shared/components/ContextMenu';
import { NewNodeMenu } from '@/shared/components/NewNode/NewNodeMenu';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export const NewNode: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <MainContent onClick={() => setOpen(true)}>
      <ContextMenu
        isOpen={open}
        close={() => setOpen(false)}
        Trigger={({ triggerProps }) => (
          <Main {...triggerProps}>
            <span>New node</span> <Plus />
          </Main>
        )}
      >
        {({ layerProps }) => (
          <NewNodeMenu {...layerProps} hideMenu={() => setOpen(false)} />
        )}
      </ContextMenu>
    </MainContent>
  );
};

const MainContent = styled.div`
  position: relative;
`;

const Main = styled.button`
  border: 0;
  outline: 0;
  background-color: ${({ theme }) => theme.active};
  color: ${({ theme }) => theme.text};
  position: relative;
  display: flex;
  gap: 2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
`;
