import {
  Dialog,
  Typography,
  Stack,
  DialogProps,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React from "react";
export const EditorDialog: React.FC<
  React.PropsWithChildren<Omit<DialogProps, "backdrop"> & { title: string }>
> = ({ children, title, ...props }) => {
  return (
    <Dialog backdrop="blur" {...props}>
      <DialogContent>
        <Stack direction="column" gap="0.5rem">
          <Title variant="h6">{title}</Title>
          {children}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
const Title = styled(Typography)`
  border-bottom: ${(p) => p.theme.divider.main} 1px solid;
  margin-bottom: 1rem;
`;

const DialogContent = styled.div`
  background-color: ${(p) => p.theme.neutrals.L6};
  min-width: 480px;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
