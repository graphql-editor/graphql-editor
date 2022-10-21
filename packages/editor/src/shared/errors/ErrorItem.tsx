import { useErrorsState } from '@/state/containers';
import styled from '@emotion/styled';
import React from 'react';

type ErrorItemProps = {
  error: string;
};

const ButtonStyles = styled.button`
  border: 0;
  background-color: ${({ theme }) => theme.background.mainMiddle};
  color: ${({ theme }) => theme.text};
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

  return (
    <Main>
      <Message>{error.replaceAll('\\', '') + '}'}</Message>
      <ButtonStyles onClick={() => setErrorRowNumber(getRowNumber())}>
        Resolve error
      </ButtonStyles>
    </Main>
  );
};
