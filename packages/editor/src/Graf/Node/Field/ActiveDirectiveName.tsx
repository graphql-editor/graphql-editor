import React from "react";
import { ParserField } from "graphql-js-tree";
import styled from "@emotion/styled";
import { GRAF_FIELD_NAME_SIZE } from "@/Graf/constants";

const Main = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: ${GRAF_FIELD_NAME_SIZE}px;
  gap: 0.1rem;
  color: ${({ theme }) => theme.text.default};
`;

export const ActiveDirectiveName: React.FC<Pick<ParserField, "name"> & {}> = ({
  name,
}) => {
  return <Main>@{name}</Main>;
};
