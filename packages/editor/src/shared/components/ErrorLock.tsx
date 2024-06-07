import React from "react";
import styled from "@emotion/styled";

const Main = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.neutrals.L6};
  cursor: pointer;
`;

const Message = styled.textarea`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  padding: 30px;
  color: ${({ theme }) => theme.alert.error.L2};
  background-color: ${({ theme }) => theme.neutrals.L6};
  border: 0;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ErrorLock: React.FC<{ onClick: () => void; value: string }> = ({
  onClick,
  value,
}) => {
  return (
    <Main onClick={onClick}>
      <Message disabled value={JSON.stringify(value)} />
    </Main>
  );
};
