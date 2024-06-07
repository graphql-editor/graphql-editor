import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  ChevronDownDouble,
  ChevronUpDouble,
  Stack,
  Typography,
} from "@aexol-studio/styling-system";

export const ErrorWrapper = styled(Stack)`
  font-family: ${({ theme }) => theme.fontFamilySans};
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 24rem;
  pointer-events: none;
  padding: 1rem;
`;
export const ErrorLabel = styled.p`
  color: ${(p) => p.theme.text.default};
`;
const Errors = styled(Stack)`
  pointer-events: all;
  background-color: ${(p) => p.theme.neutrals.L4};
  padding: 0.5rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;

const List = styled(Stack)`
  background-color: ${(p) => p.theme.neutrals.L4};
  padding: 0.5rem;
`;
const SmallLabel = styled(Typography)``;
const IconBox = styled(Stack)`
  cursor: pointer;
  color: ${(p) => p.theme.text.default};
`;

export const ErrorsList: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [shrink, setShrink] = useState(false);
  return (
    <ErrorWrapper
      direction="column"
      gap="1rem"
      justify="end"
      onClick={(e) => e.stopPropagation()}
    >
      <Errors gap="0.5rem" direction="column">
        <Stack justify="between">
          <SmallLabel
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
          >
            problems
          </SmallLabel>
          <IconBox align="center" onClick={() => setShrink(!shrink)}>
            {!shrink && <ChevronDownDouble />}
            {shrink && <ChevronUpDouble />}
          </IconBox>
        </Stack>
        {!shrink && (
          <List gap="0.25rem" direction="column">
            {children}
          </List>
        )}
      </Errors>
    </ErrorWrapper>
  );
};
