import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';
import React from 'react';

const StyledHeading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
`;

interface HeadingProps {
  heading: string;
}

export const Heading: React.FC<HeadingProps> = ({ heading }) => {
  return <StyledHeading>{heading}</StyledHeading>;
};
