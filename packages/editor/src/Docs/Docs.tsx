import { DocsElement } from '@/Docs/DocsElement';
import { useIO, KeyboardActions } from '@/shared/hooks/io';
import { useTreesState } from '@/state/containers';
import styled from '@emotion/styled';

import React, { useEffect, useRef } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.background.mainFurther};
  flex-direction: row;
  align-items: stretch;
`;

const SelectedNodeWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background.mainFurther};
  overflow-x: hidden;
  height: 100%;
`;
export const Docs = () => {
  const { selectedNode } = useTreesState();
  const searchRef = useRef<HTMLInputElement>(null);
  const { mount } = useIO();
  useEffect(() => {
    const mounted = mount({
      [KeyboardActions.FindRelation]: () => {
        searchRef.current?.focus();
      },
    });
    return mounted.dispose;
  }, []);

  return (
    <Wrapper>
      <SelectedNodeWrapper>
        {selectedNode?.field && <DocsElement node={selectedNode.field} />}
      </SelectedNodeWrapper>
    </Wrapper>
  );
};
