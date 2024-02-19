import { dataIt } from "@/Models/dataIds";
import { ContextMenu } from "@/shared/components/ContextMenu";
import { NewNodeMenu } from "@/shared/components/NewNode/NewNodeMenu";
import { Button, Plus } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useState } from "react";

export const NewNode: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <MainContent {...dataIt("newNode")} onClick={() => setOpen(true)}>
      <ContextMenu
        isOpen={open}
        close={() => setOpen(false)}
        Trigger={({ triggerProps }) => (
          <Main {...triggerProps}>
            <Button size="small" variant="secondary" endAdornment={<Plus />}>
              node
            </Button>
          </Main>
        )}
      >
        {({ layerProps }) => (
          <NewNodeMenu {...layerProps} hideMenu={() => setOpen(false)} />
        )}
      </ContextMenu>
    </MainContent>
  );
};

const MainContent = styled.div`
  position: relative;
`;

const Main = styled.div``;
