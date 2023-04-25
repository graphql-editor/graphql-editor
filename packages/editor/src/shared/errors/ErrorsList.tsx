import React from 'react';
import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';

export const ErrorWrapper = styled.div`
  font-family: ${fontFamilySans};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  font-size: 14px;
  left: 0;
  background-color: ${({ theme }) => theme.neutral[700]}99;
  cursor: default;
  color: ${({ theme }) => theme.error};
  z-index: 2;
`;
export const ErrorInside = styled.div`
  width: 300px;
  height: 100%;
  overflow-y: auto;
  margin-left: auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.neutral[700]};
`;

export const ErrorLabel = styled.p`
  width: 90%;
`;

export const ErrorsList: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <ErrorWrapper onClick={(e) => e.stopPropagation()}>
      <ErrorInside>
        <ErrorLabel>{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema. Message:`}</ErrorLabel>
        {children}
      </ErrorInside>
    </ErrorWrapper>
  );
};
