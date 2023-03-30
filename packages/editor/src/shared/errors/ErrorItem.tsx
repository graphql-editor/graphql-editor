import { useErrorsState } from '@/state/containers';
import styled from '@emotion/styled';
import React from 'react';

type ErrorItemProps = {
  error: string;
};

const ButtonStyles = styled.button`
  border: 0;
  background-color: ${({ theme }) => theme.neutral[600]};
  color: ${({ theme }) => theme.text.default};
  padding: 10px 50px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 4px;
`;

const Main = styled.div``;

const Message = styled.div`
  color: ${({ theme }) => theme.error};
  background-color: transparent;
  white-space: pre-line;
  width: 100%;
`;

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { setErrorRowNumber } = useErrorsState();

  const getRowNumber = () => parseInt(error.split(',')[1].split(':')[1]) + 1;
  const cleanError = error.replaceAll('\\', '') + '}';
  return (
    <Main>
      <Message>{cleanError}</Message>
      <ButtonStyles onClick={() => setErrorRowNumber(getRowNumber())}>
        Resolve error
      </ButtonStyles>
    </Main>
  );
};
