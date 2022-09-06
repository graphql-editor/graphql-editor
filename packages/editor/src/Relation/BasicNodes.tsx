import { PaintNode } from '@/Graf/Node';
import { useRelationsState } from '@/state/containers';
import { fontFamily } from '@/vars';
import styled from '@emotion/styled';
import React from 'react';

const Main = styled.div`
  width: 100%;
  position: relative;
  font-family: ${fontFamily};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  animation: show 1 0.5s ease-in-out;
  gap: 20px;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const BasicNodes: React.FC = () => {
  const { currentNodes } = useRelationsState();
  return (
    <Main>
      {currentNodes.map((cn, idx) => (
        <PaintNode node={cn} key={idx} />
      ))}
    </Main>
  );
};
