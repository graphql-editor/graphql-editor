import { EditorTheme } from "@/gshared/theme/MainTheme";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import {
  useTreesState,
  useRelationNodesState,
  useRelationsState,
} from "@/state/containers";
import { fontFamilySans, transition } from "@/vars";
import {
  Link,
  EagleEye,
  EyeSlash,
  Eye,
  Pen,
  Stack,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import { ParserField } from "graphql-js-tree";
import React, { createRef } from "react";

type ToggleableParserField = ParserField & { isHidden?: boolean };

export const SingleNodeInList: React.FC<{
  node: ToggleableParserField;
  colorKey: keyof EditorTheme["colors"];
  visibleInRelationView?: true;
}> = ({ node, colorKey, visibleInRelationView }) => {
  const { setSelectedNodeId, isLibrary, focusNode } = useTreesState();
  const { toggleNodeVisibility } = useRelationNodesState();
  const { setEditMode } = useRelationsState();
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
        if (!visibleInRelationView) {
          setEditMode(node.id);
        }
      }}
    >
      <NodeName
        isHidden={node.isHidden}
        color={colorKey}
        className={DOMClassNames.navigationTitleSpan}
      >
        <span>{node.name}</span>
        {isLibrary(node.id) && (
          <ExternalLibrary title="From external library">
            <Link />
          </ExternalLibrary>
        )}
      </NodeName>
      {visibleInRelationView && (
        <Actions align="center" gap="0.25rem">
          <Stack align="center" gap="0.25rem">
            <SelectedActions
              className={DOMClassNames.navigationSelectedActions}
            >
              <IconContainer
                isHidden={node.isHidden}
                onClick={(e) => {
                  e.stopPropagation();
                  focusNode(node);
                }}
              >
                <EagleEye height={20} />
              </IconContainer>
              <IconContainer
                isHidden={node.isHidden}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeId({
                    source: "navigation",
                    value: {
                      id: node.id,
                      name: node.name,
                    },
                  });
                  setEditMode(node.id);
                }}
              >
                <Pen height={20} />
              </IconContainer>
            </SelectedActions>
          </Stack>
          <IconContainer
            isHidden={node.isHidden}
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeVisibility(node);
            }}
          >
            {node.isHidden ? <EyeSlash height={20} /> : <Eye height={20} />}
          </IconContainer>
        </Actions>
      )}
    </NavSingleBox>
  );
};

const ExternalLibrary = styled.span`
  color: ${({ theme }) => theme.text.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: ${(p) => p.theme.neutral[600]};
  &.${DOMClassNames.active} {
    .${DOMClassNames.navigationSelectedActions} {
      pointer-events: auto;
      opacity: 1;
    }
    .${DOMClassNames.navigationTitleSpan} {
      color: ${(p) => p.theme.accents[200]};
    }
  }
  :hover {
    background-color: ${(p) => p.theme.neutral[500]};
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
  font-family: ${fontFamilySans};
  font-size: 14px;
  color: ${({ theme }) => theme.text.default};
  transition: ${transition};
  opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1)};
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 28ch;
  white-space: nowrap;
  &:hover {
    color: ${({ theme, color }) => theme.colors[color]};
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
