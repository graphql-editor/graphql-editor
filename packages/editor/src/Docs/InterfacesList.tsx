import React from 'react';
import { fontFamilySans, transition } from '@/vars';
import styled from '@emotion/styled';

const Interface = styled.p`
  color: ${({ theme }) => theme.colors.interface};
  font-family: ${fontFamilySans};
  font-size: 14px;
  padding: 4px 12px;
  margin: 0;
  margin-right: 4px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 4px;
  transition: ${transition};

  &:hover {
    color: ${({ theme }) => theme.text.default};
  }
`;

const InterfacesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 18px;
  margin-left: 14px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${fontFamilySans};
  font-size: 18px;
`;

interface InterfacesListI {
  interfacesList: string[];
  setNode: (nodeName: string) => void;
}

export const InterfacesList: React.FC<InterfacesListI> = ({
  interfacesList,
  setNode,
}) => {
  return (
    <>
      <Title>Interfaces</Title>
      <InterfacesWrapper>
        {interfacesList.map((name) => (
          <Interface key={name} onClick={() => setNode(name)}>
            {name}
          </Interface>
        ))}
      </InterfacesWrapper>
    </>
  );
};
