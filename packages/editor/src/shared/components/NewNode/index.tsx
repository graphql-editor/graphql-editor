import { NewNodeMenu } from '@/shared/components/NewNode/NewNodeMenu';
import { Plus } from '@/shared/icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export const NewNode: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <MainContent onClick={() => setOpen(true)}>
      <Main>
        <span>New node</span> <Plus />
      </Main>
      {open && <NewNodeMenu hideMenu={() => setOpen(false)} />}
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
