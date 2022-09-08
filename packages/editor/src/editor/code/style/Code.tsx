import styled from '@emotion/styled';
import { fontFamily } from '@/vars';

export const CodeContainer = styled.div`
  flex: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  border-right: 2px solid ${({ theme }) => theme.contra};

  &.monaco-scrollable-element {
    padding: 8px;
  }

  &.vs-dark .monaco-scrollable-element > .scrollbar {
    background: ${({ theme }) => theme.background.mainFurthest};
    &.invisible {
      opacity: 0.5;
    }
  }

  &.vs-dark .monaco-scrollable-element > .scrollbar > .slider {
    background: ${({ theme }) => theme.background.mainFar};
  }
`;

export const ErrorLock = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.background.mainFurthest};
  cursor: pointer;
  color: ${({ theme }) => theme.error};
  font-family: ${fontFamily};
  font-size: 14px;
  padding: 30px;
`;
