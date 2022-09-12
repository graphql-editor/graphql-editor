import { fontFamily } from '@/vars';
import styled from '@emotion/styled';

export const ErrorWrapper = styled.div`
  font-family: ${fontFamily};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 55px;
  left: 0;
  background-color: ${({ theme }) => theme.background.mainFurthest};
  cursor: pointer;
  color: ${({ theme }) => theme.error};
  padding-left: 16px;
`;

export const ErrorLabel = styled.p`
  width: 90%;
`;
