import { EditorTheme } from "@/gshared/theme/MainTheme";
import { SetOperationMenu } from "@/shared/NodeNavigation/SetOperationMenu";
import { ContextMenu } from "@/shared/components/ContextMenu";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { useTreesState, useRelationNodesState } from "@/state/containers";
import { transition } from "@/vars";
import {
  Link,
  EyeSlash,
  Eye,
  Stack,
  DotsHorizontal,
  Typography,
  Tooltip,
  Xmark,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import { OperationType, ParserField } from "graphql-js-tree";
import React, { createRef, useState } from "react";

type ToggleableParserField = ParserField & { isHidden?: boolean };

export const SingleNodeInList: React.FC<{
  node: ToggleableParserField;
  colorKey: keyof EditorTheme["colors"];
  schemaProps?: {
    name: string;
  };
}> = ({ node, colorKey, schemaProps }) => {
  const { setSelectedNodeId, isLibrary } = useTreesState();
  const { toggleNodeVisibility } = useRelationNodesState();
  const ref = createRef<HTMLAnchorElement>();

  return (
    <NavSingleBox
      color={colorKey}
      ref={ref}
      className={DOMClassNames.navigationTitle}
      data-id={node.id}
      onClick={() => {
        if (node.isHidden) {
          toggleNodeVisibility(node);
        }
        setSelectedNodeId({
          value: {
            id: node.id,
            name: node.name,
          },
          source: "navigation",
        });
      }}
    >
      <NodeName
        isHidden={node.isHidden}
        color={colorKey}
        className={DOMClassNames.navigationTitleSpan}
        data-id={node.id}
      >
        {schemaProps && <span>{schemaProps.name}</span>}
        <span>{node.name}</span>
        {isLibrary(node) && (
          <Tooltip title="From external library" position="top">
            <ExternalLibrary>
              <Link />
            </ExternalLibrary>
          </Tooltip>
        )}
      </NodeName>
      <Actions align="center" gap="0.25rem">
        <IconContainer
          isHidden={node.isHidden}
          onClick={(e) => {
            e.stopPropagation();
            toggleNodeVisibility(node);
          }}
        >
          {node.isHidden ? <EyeSlash height={16} /> : <Eye height={16} />}
        </IconContainer>
      </Actions>
    </NavSingleBox>
  );
};
export const SingleSchemaNodeInList: React.FC<{
  node?: ToggleableParserField;
  schemaProps: {
    name: string;
    operationType: OperationType;
  };
}> = ({ node, schemaProps }) => {
  const {
    setSelectedNodeId,
    isLibrary,
    removeSchemaNodeField,
    setOperationNode,
  } = useTreesState();
  const { toggleNodeVisibility } = useRelationNodesState();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = createRef<HTMLAnchorElement>();

  return (
    <NavSingleBox
      color={"type"}
      ref={ref}
      className={DOMClassNames.navigationTitle}
      data-id={node?.id}
      onClick={() => {
        if (!node) return;
        if (node.isHidden) {
          toggleNodeVisibility(node);
        }
        setSelectedNodeId({
          value: {
            id: node.id,
            name: node.name,
          },
          source: "navigation",
        });
      }}
    >
      <NodeName
        isHidden={node?.isHidden}
        color={"type"}
        className={DOMClassNames.navigationTitleSpan}
        data-id={node?.id}
      >
        {schemaProps && (
          <Typography variant="caption" color="active">
            {schemaProps.name}
          </Typography>
        )}
        {node && (
          <>
            <span>{node.name}</span>
            {isLibrary(node) && (
              <Tooltip title="From external library" position="top">
                <ExternalLibrary>
                  <Link />
                </ExternalLibrary>
              </Tooltip>
            )}
          </>
        )}
      </NodeName>
      <Actions align="center" gap="0.25rem">
        <Stack align="center" gap="0.25rem">
          {node && (
            <>
              <SelectedActions
                className={DOMClassNames.navigationSelectedActions}
              >
                <IconContainer
                  isHidden={node.isHidden}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSchemaNodeField(schemaProps.operationType);
                  }}
                >
                  <Xmark height={16} />
                </IconContainer>
              </SelectedActions>
            </>
          )}
        </Stack>
        {node ? (
          <IconContainer
            isHidden={node.isHidden}
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeVisibility(node);
            }}
          >
            {node.isHidden ? <EyeSlash height={16} /> : <Eye height={16} />}
          </IconContainer>
        ) : (
          <ContextMenu
            isOpen={menuOpen}
            close={() => setMenuOpen(false)}
            Trigger={({ triggerProps }) => (
              <IconContainer
                {...triggerProps}
                onClick={() => {
                  setMenuOpen(true);
                }}
              >
                <DotsHorizontal height={16} />
              </IconContainer>
            )}
          >
            {({ layerProps }) => (
              <SetOperationMenu
                operationType={schemaProps.operationType}
                {...layerProps}
                onSelectType={(n) => {
                  setOperationNode(schemaProps.operationType, n);
                }}
                hideMenu={() => {
                  setMenuOpen(false);
                }}
              />
            )}
          </ContextMenu>
        )}
      </Actions>
    </NavSingleBox>
  );
};

const ExternalLibrary = styled.span`
  color: ${({ theme }) => theme.text.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const Actions = styled(Stack)`
  margin-left: auto;
`;

const SelectedActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  pointer-events: none;
`;

const NavSingleBox = styled.a<{
  color: keyof EditorTheme["colors"];
}>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: ${({ theme, color }) => theme.colors[color]} 1px solid;
  padding: 0.5rem 0 0.5rem 1rem;
  margin-left: 1rem;
  transition: ${transition};
  background-color: ${(p) => p.theme.neutrals.L6};
  &.${DOMClassNames.active} {
    .${DOMClassNames.navigationSelectedActions} {
      pointer-events: auto;
      opacity: 1;
    }
    .${DOMClassNames.navigationTitleSpan} {
      color: ${(p) => p.theme.accent.L2};
    }
  }
  :hover {
    background-color: ${(p) => p.theme.neutrals.L5};
    svg {
      opacity: 1;
    }
  }
`;

const NodeName = styled.div<{
  color: keyof EditorTheme["colors"];
  isHidden?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.default};
  transition: ${transition};
  opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1)};
  min-width: 0;
  width: 28ch;
  white-space: nowrap;
  &:hover {
    color: ${({ theme, color }) => theme.colors[color]};
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const IconContainer = styled.div<{
  isHidden?: boolean;
}>`
  display: flex;
  transition: ${transition};
  color: ${({ theme }) => theme.button.standalone.disabled};
  :hover {
    color: ${({ theme }) => theme.text.active};
  }
  svg {
    opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1.0)};
    transition: ${transition};
  }
`;
