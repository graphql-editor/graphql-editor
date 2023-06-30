import { NewNode } from "@/shared/components/NewNode";
import { Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

export const BackgroundFTUX = () => {
  return (
    <Container direction="column" align="center" justify="center" gap="1rem;">
      <Typography>
        Your schema is empty! Please create your first node
      </Typography>
      <NewNode />
    </Container>
  );
};

const Container = styled(Stack)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
