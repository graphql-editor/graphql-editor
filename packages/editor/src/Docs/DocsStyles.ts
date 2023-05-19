import { transition } from '@/vars';
import styled from '@emotion/styled';

export const DescText = styled.p`
  color: ${({ theme }) => theme.text.default};
  margin: 0;
  font-size: 14px;
  p {
    margin: 0;
  }
`;

export const FieldText = styled.p`
  color: ${({ theme }) => theme.text.active};
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;

export const TypeText = styled.p<{ isScalar?: boolean }>`
  color: ${({ isScalar, theme: { colors } }) =>
    isScalar ? colors.scalar : colors.type};
  font-size: 14px;
  padding-left: 8px;
  margin: 0;
  transition: ${transition};
  line-height: 1.6;
  &:hover {
    color: ${({ isScalar, theme }) =>
      isScalar ? theme.colors.scalar : theme.text.active};
  }
`;

export const Title = styled.div<{ subTitle: boolean }>`
  color: ${({ theme, subTitle }) =>
    subTitle ? theme.text.default : theme.text.active};
  font-size: 18px;
  margin: ${({ subTitle }) => (subTitle ? '18px 0px' : '0px 0px 4px 0px')};
  font-weight: bold;

  h3 {
    font-size: inherit;
  }
`;

export const DescWrapper = styled.div<{
  isSvgVisible: boolean;
  readonly?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: ${({ readonly }) => (readonly ? 'auto' : 'pointer')};

  svg {
    color: ${({ theme }) => theme.text.default};
    opacity: ${({ isSvgVisible }) => (isSvgVisible ? 1 : 0)};
    transition: opacity 0.5s;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;
