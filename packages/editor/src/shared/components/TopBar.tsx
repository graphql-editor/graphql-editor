import styled from '@emotion/styled';

import React, { useEffect, useRef } from 'react';
import { useErrorsState } from '@/state/containers';
import { useTheme } from '@emotion/react';

import { Heading } from '@/shared/components';
import { useSortState } from '@/state/containers/sort';
import { SortNodes } from '@/Graf/Node/components/SortNodes';
import { KeyboardActions, useIO } from '@/shared/hooks/io';
import { Abc } from '@/editor/icons';

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

const AZContainer = styled.div`
  display: flex;
  padding-left: 16px;
  border-left: 1px solid ${({ theme }) => theme.disabled}36;
  align-items: center;
  cursor: pointer;
  :hover {
    svg > path {
      fill: ${({ theme }) => theme.active};
    }
    svg > g > path {
      stroke: ${({ theme }) => theme.active};
    }
    svg > rect {
      stroke: ${({ theme }) => theme.active};
    }
  }
`;

export const TopBar: React.FC<{ heading: string }> = ({
  children,
  heading,
}) => {
  const { lockGraf } = useErrorsState();
  const { setIsSortAlphabetically, setIsUserOrder } = useSortState();
  const { mount } = useIO();
  const { inactive } = useTheme();

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
          <AZContainer
            onClick={() => {
              setIsUserOrder(false);
              setIsSortAlphabetically((prev) => !prev);
            }}
          >
            <Abc size={28} fill={inactive} />
          </AZContainer>
          <SortNodes />
        </SortWrapper>
      )}
    </TopBarComponent>
  );
};
