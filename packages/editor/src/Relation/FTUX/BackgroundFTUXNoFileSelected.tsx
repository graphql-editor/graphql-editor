import { Button, Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

export const BackgroundFTUXNoFileSelected = ({
  onStartCoding,
}: {
  onStartCoding: () => void;
}) => {
  return (
    <Container direction="column" align="center" justify="center" gap="2rem">
      <Stack direction="column" gap="4rem">
        <Stack direction="column" gap="1rem">
          <Message>
            No schema selected. Please select schema from file explorer or
            create a new one.
          </Message>
          <Stack gap="1rem" justify="center">
            <Button onClick={onStartCoding} variant="secondary" size="small">
              Create a new schema
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
const Message = styled(Typography)`
  width: 24rem;
`;

const Container = styled(Stack)`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.neutrals.L6};
  font-family: ${({ theme }) => theme.fontFamilySans};
  border-left: 1px solid ${(p) => p.theme.accent.L5};
`;
