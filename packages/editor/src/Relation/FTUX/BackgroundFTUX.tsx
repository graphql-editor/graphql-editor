import { NewNode } from "@/shared/components/NewNode";
import {
  ArrowNarrowBottomAlignment,
  Button,
  Stack,
  Typography,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

export const BackgroundFTUX = ({
  onImport,
  onStartCoding,
  showCode,
  schema,
}: {
  showCode?: boolean;
  onStartCoding: () => void;
  onImport: () => void;
  schema: string;
}) => {
  return (
    <Container direction="column" align="center" justify="center" gap="2rem">
      <Stack direction="column" gap="4rem">
        <Stack direction="column" gap="1rem">
          {!schema ? (
            <Typography>
              Your schema is empty! Please create your first node.
            </Typography>
          ) : (
            <Typography>
              Cannot parse the schema! Please correct it or create new one.
            </Typography>
          )}
          {!schema && (
            <Stack gap="1rem">
              {showCode && (
                <Button onClick={onStartCoding} variant="neutral" size="small">
                  Start coding
                </Button>
              )}
              <NewNode />
            </Stack>
          )}
        </Stack>
        <Stack direction="column" gap="1rem">
          <Typography>
            You can also import the schema from URL and .graphql or .json file.
          </Typography>
          <Stack gap="1rem">
            <Button
              endAdornment={<ArrowNarrowBottomAlignment />}
              onClick={onImport}
              variant="neutral"
              size="small"
            >
              Import schema
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

const Container = styled(Stack)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
