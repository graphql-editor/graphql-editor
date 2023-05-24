import { useErrorsState } from "@/state/containers";
import { useRouter } from "@/state/containers/router";
import { Button, Stack } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

type ErrorItemProps = {
  error: string;
};

const Main = styled(Stack)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.neutral[700]};
  border-radius: ${(p) => p.theme.radius}px;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.error};
  background-color: transparent;
  white-space: pre-wrap;
  width: 100%;
`;

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { setErrorRowNumber } = useErrorsState();
  const { set } = useRouter();
  const getRowNumber = () => parseInt(error.split(",")[1].split(":")[1]) + 1;
  const cleanError = error.replaceAll("\\", "") + "}";
  return (
    <Main gap="1rem" align="end" direction="column">
      <Message>{cleanError}</Message>
      <Button
        variant="secondary"
        onClick={() => {
          setErrorRowNumber(getRowNumber());
          set({
            code: "on",
          });
        }}
      >
        Resolve error
      </Button>
    </Main>
  );
};
