import { transition } from "@/vars";
import { Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";

export const DescText = styled.div`
  color: ${({ theme }) => theme.text.default};
  padding: 0.5rem;
  font-size: 0.875rem;
  p {
    font-size: 0.875rem;
    margin: 0;
  }
  h1 {
    font-size: 0.875rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

export const FieldText = styled.p`
  color: ${({ theme }) => theme.text.active};
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;

export const TypeText = styled.p<{ isScalar?: boolean }>`
  color: ${({ isScalar, theme: { colors } }) =>
    isScalar ? colors.scalar : colors.type};
  font-size: 1rem;
  padding-left: 8px;
  margin: 0;
  transition: ${transition};
  line-height: 1.6;
  &:hover {
    color: ${({ isScalar, theme }) =>
      isScalar ? theme.colors.scalar : theme.text.active};
  }
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.text.active};
  font-family: ${({ theme }) => theme.fontFamilySans};
`;

export const DescWrapper = styled.div<{
  isSvgVisible: boolean;
  readonly?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  background-color: ${(p) => p.theme.neutrals.L5};
  cursor: ${({ readonly }) => (readonly ? "auto" : "pointer")};

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
