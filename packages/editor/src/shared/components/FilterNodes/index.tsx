import { dataIt } from "@/Models/dataIds";
import { ContextMenu } from "@/shared/components/ContextMenu";
import { FilterNodesMenu } from "@/shared/components/FilterNodes/FilterNodesMenu";
import { Button, FilterList, Tooltip } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useState } from "react";

export const FilterNodes: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <MainContent {...dataIt("filter")} onClick={() => setOpen(true)}>
      <ContextMenu
        isOpen={open}
        close={() => setOpen(false)}
        Trigger={({ triggerProps }) => (
          <Main {...triggerProps}>
            <Tooltip title="Filter by root type" position="left-bottom">
              <Button
                size="small"
                variant="secondary"
                endAdornment={<FilterList />}
              ></Button>
            </Tooltip>
          </Main>
        )}
      >
        {({ layerProps }) => (
          <FilterNodesMenu {...layerProps} hideMenu={() => setOpen(false)} />
        )}
      </ContextMenu>
    </MainContent>
  );
};

const MainContent = styled.div`
  position: relative;
`;

const Main = styled.div``;
