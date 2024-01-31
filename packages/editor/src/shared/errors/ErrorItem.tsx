import { useErrorsState } from "@/state/containers";
import { useRouter } from "@/state/containers/router";
import { Stack, Tooltip } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import { EditorError } from "graphql-editor-worker/lib/validation";
import React from "react";

type ErrorItemProps = {
  error: EditorError;
};

const Main = styled(Stack)`
  color: ${({ theme }) => theme.text.default};
  font-size: 0.75rem;
`;

const Message = styled.div`
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { setErrorRowNumber } = useErrorsState();
  const { set } = useRouter();
  const errorText =
    error.__typename === "global" ? error.text : error.error.message;
  const errorRow =
    error.__typename === "global" ? 0 : error.error.locations?.[0]?.line || 0;
  return (
    <Tooltip
      width={300}
      position="top-left"
      title={`${errorText}\nClick to go to this error.`}
    >
      <Main
        onClick={() => {
          setErrorRowNumber(errorRow + 1);
          set({ code: "on" });
        }}
        align="center"
        justify="between"
      >
        <Message>{errorText}</Message>
      </Main>
    </Tooltip>
  );
};
