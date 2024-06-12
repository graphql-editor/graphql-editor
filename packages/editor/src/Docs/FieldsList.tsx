import { ArgumentsList } from "@/Docs/ArgumentsList";
import { BuiltInScalars } from "@/GraphQL/Resolve";
import {
  ParserField,
  getTypeName,
  compileType,
  compareParserFields,
} from "graphql-js-tree";
import React, { useCallback, useState } from "react";
import { Remarkable } from "remarkable";
import {
  DescText,
  DescWrapper,
  FieldText,
  Title,
  TypeText,
} from "@/Docs/DocsStyles";
import styled from "@emotion/styled";
import { useTreesState } from "@/state/containers";
import { Description } from "@/Docs/Description";
import { PenLine, Stack } from "@aexol-studio/styling-system";
import { transition } from "@/vars";

const md = new Remarkable();

const ListWrapper = styled(Stack)`
  margin-left: 10px;
  flex: 1 1 auto;
  min-height: 0;
  word-wrap: normal;
`;

const FieldsWrapper = styled(Stack)`
  border: 1px solid ${(p) => p.theme.neutrals.L5};
  position: relative;
  padding: 1rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;

const TitleWrapper = styled.div<{ isType: boolean }>`
  display: flex;
  cursor: ${({ isType }) => (isType ? "pointer" : "default")};
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  transition: ${transition};
  color: ${(p) => p.theme.text.disabled};
  &:hover {
    color: ${(p) => p.theme.text.active};
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;

interface FieldsListI {
  node: ParserField;
  setNode: (nodeName: string) => void;
}

export const FieldsList: React.FC<FieldsListI> = ({ node, setNode }) => {
  const { setTree, tree, readonly, isLibrary } = useTreesState();

  const [isEdit, setIsEdit] = useState(false);
  const [editedIdx, setEditedIdx] = useState(-1);

  const isReadonly = readonly || isLibrary(node);

  const onSubmit = useCallback(
    (description: string, idx: number) => {
      if (node.args) {
        node.args[idx].description = description;
        const changedIdx = tree.nodes.findIndex(compareParserFields(node));
        tree.nodes[changedIdx] = node;
        setTree(tree);
      }
    },
    [node, tree]
  );

  return (
    <>
      <Title variant="H3 SB">Fields</Title>
      <ListWrapper direction="column" gap="1rem">
        {node.args?.map((arg, i) => (
          <FieldsWrapper key={i} direction="column" gap="0.5rem">
            <TitleWrapper
              isType={
                !BuiltInScalars.some(
                  (scalar) => scalar.name === getTypeName(arg.type.fieldType)
                )
              }
            >
              <FieldText>{arg.name}</FieldText>
              {arg.args && arg.args?.length > 0 ? (
                <ArgumentsList argument={arg} setNode={setNode} />
              ) : (
                <TypeText
                  isScalar={BuiltInScalars.some(
                    (scalar) => scalar.name === getTypeName(arg.type.fieldType)
                  )}
                  onClick={() => setNode(getTypeName(arg.type.fieldType))}
                >
                  {compileType(arg.type.fieldType)}
                </TypeText>
              )}
            </TitleWrapper>
            {isEdit && editedIdx === i && (
              <Description
                onChange={(description: string) => {
                  onSubmit(description, i);
                  setIsEdit(false);
                }}
                value={arg.description || ""}
              />
            )}
            {(!isEdit || editedIdx !== i) && !!arg.description && (
              <DescWrapper
                isSvgVisible={!arg.description}
                readonly={isReadonly}
                onClick={() => {
                  if (isReadonly) return;
                  setEditedIdx(i);
                  setIsEdit(true);
                }}
              >
                <DescText
                  dangerouslySetInnerHTML={{
                    __html: md.render(arg.description || "No description"),
                  }}
                />
              </DescWrapper>
            )}
            {!isReadonly && (
              <IconWrapper
                onClick={() => {
                  if (isReadonly) return;
                  setEditedIdx(i);
                  setIsEdit(true);
                }}
              >
                <PenLine />
              </IconWrapper>
            )}
          </FieldsWrapper>
        ))}
      </ListWrapper>
    </>
  );
};
