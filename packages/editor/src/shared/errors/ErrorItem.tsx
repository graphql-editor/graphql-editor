import { useErrorsState } from "@/state/containers";
import { useRouter } from "@/state/containers/router";
import { EditorError } from "@/validation";
import {
  CircleInformation,
  Stack,
  Tooltip,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";

type ErrorItemProps = {
  error: EditorError;
};

const Main = styled(Stack)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.neutral[600]};
  border-radius: ${(p) => p.theme.radius}px;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.error};
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { setErrorRowNumber } = useErrorsState();
  const { set } = useRouter();
  return (
    <Main gap="1rem" align="center">
      <Message>{error.text}</Message>
      <Tooltip position="left-bottom" title={error.text}>
        <CircleInformation
          onClick={() => {
            setErrorRowNumber(error.row);
            set({ code: "on" });
          }}
        />
      </Tooltip>
    </Main>
  );
};
