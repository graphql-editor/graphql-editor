import styled from '@emotion/styled';

export const DescText = styled.p`
  margin-top: 8px;
  margin-right: 8px;
  color: ${({ theme }) => theme.disabled};
`;

export const FieldText = styled.p`
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;

export const TypeText = styled.p<{ isScalar?: boolean }>`
  color: ${({ isScalar, theme: { colors } }) =>
    isScalar ? colors.String : colors.type};
  font-size: 14px;
  padding-left: 8px;
  margin: 0;
  line-height: 1.6;
`;

export const Title = styled.div<{ subTitle: boolean }>`
  color: ${({ theme, subTitle }) =>
    subTitle ? theme.disabled : theme.backgroundedText};
  font-size: 18px;
  margin: ${({ subTitle }) => (subTitle ? '18px 0px' : '0px 0px 4px 0px')};
  font-weight: bold;

  h3 {
    font-size: inherit;
  }
`;

export const DescWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  svg {
    margin-bottom: 10px;
  }
`;
