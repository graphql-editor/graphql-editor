import { useErrorsState } from '@/state/containers';
import { fontFamily } from '@/vars';
import styled from '@emotion/styled';
import React from 'react';

type ErrorItemProps = {
  error: string;
};

const ButtonStyles = styled.button`
  background-color: ${({ theme }) => theme.background.mainFurthest};
  border: 2px solid ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.error};
  padding: 8px 16px;
  cursor: pointer;
`;

const Main = styled.div`
  margin: 0 16px;
`;

const Message = styled.textarea`
  font-family: ${fontFamily};
  height: 180px;
  font-size: 14px;
  color: ${({ theme }) => theme.error};
  background-color: ${({ theme }) => theme.background.mainFurthest};
  border: 0;
  width: 100%;
`;

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { setErrorRowNumber } = useErrorsState();

  const getRowNumber = () => parseInt(error.split(',')[1].split(':')[1]) + 1;

  return (
    <Main>
      <Message disabled value={error.replaceAll('\\', '') + '}'} />
      <ButtonStyles onClick={() => setErrorRowNumber(getRowNumber())}>
        Resolve error
      </ButtonStyles>
    </Main>
  );
};
