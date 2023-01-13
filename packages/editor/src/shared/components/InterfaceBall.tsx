import styled from '@emotion/styled';
import React from 'react';

interface Props {
  name: string;
  onClick: () => void;
}

export const InterfaceBall: React.FC<Props> = ({ name, onClick }) => {
  return (
    <Container title={name} onClick={onClick}>
      <BallDiv>.</BallDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
  font-size: 40px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.interface};
  cursor: help;
`;

const BallDiv = styled.div`
  translate: 0 -10px;
`;
