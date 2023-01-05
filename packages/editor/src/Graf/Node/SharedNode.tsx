import styled from '@emotion/styled';

export const NodeName = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.text};
  padding: 5px 0 5px 10px;
  user-select: none;
`;

export const NodeType = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  margin-right: auto;
  padding: 5px 30px 5px 0;
`;

export const NodeTitle = styled.div`
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text};
  padding: 5px 10px 5px 10px;
  user-select: none;
`;

export const NodeFieldPortPlaceholder = styled.div`
  width: 24px;
  height: 16px;
`;
