import { ArgumentsList } from '@/Docs/ArgumentsList';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { ParserField, getTypeName, compileType } from 'graphql-js-tree';
import React, { useCallback, useState } from 'react';
import { Remarkable } from 'remarkable';
import {
  DescText,
  DescWrapper,
  FieldText,
  Title,
  TypeText,
} from '@/Docs/DocsStyles';
import styled from '@emotion/styled';
import { AddDescriptionInput } from './AddDescriptionInput';
import { Edit } from '@/editor/icons';
import { useTheme } from '@emotion/react';
import { useTreesState } from '@/state/containers';

const md = new Remarkable();

const ListWrapper = styled.div`
  margin-bottom: 12px;
  flex: 1 1 auto;
  min-height: 0;
  word-wrap: normal;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
`;

const TitleWrapper = styled.div<{ isType: boolean }>`
  display: flex;
  cursor: ${({ isType }) => (isType ? 'pointer' : 'default')};
`;

interface FieldsListI {
  node: ParserField;
  setNode: (nodeName: string) => void;
}

export const FieldsList: React.FC<FieldsListI> = ({ node, setNode }) => {
  const { backgroundedText } = useTheme();
  const { setTree, tree } = useTreesState();

  const [isEdit, setIsEdit] = useState(false);
  const [editedIdx, setEditedIdx] = useState(-1);

  const onSubmit = useCallback((description: string, idx: number) => {
    if (node.args) {
      node.args[idx].description = description;
      const changedIdx = tree.nodes.findIndex((n) => n.name === node.name);
      tree.nodes[changedIdx] = node;
      setTree(tree);
    }
  }, []);

  return (
    <>
      <Title subTitle>Fields</Title>
      <ListWrapper>
        {node.args?.map((arg, i) => (
          <FieldsWrapper key={i}>
            <TitleWrapper
              isType={
                !BuiltInScalars.some(
                  (scalar) => scalar.name === getTypeName(arg.type.fieldType),
                )
              }
            >
              <FieldText>{arg.name}</FieldText>
              {arg.args && arg.args?.length > 0 ? (
                <ArgumentsList argument={arg} setNode={setNode} />
              ) : (
                <TypeText
                  isScalar={BuiltInScalars.some(
                    (scalar) => scalar.name === getTypeName(arg.type.fieldType),
                  )}
                  onClick={() => setNode(getTypeName(arg.type.fieldType))}
                >
                  {compileType(arg.type.fieldType)}
                </TypeText>
              )}
            </TitleWrapper>
            {isEdit && editedIdx === i ? (
              <AddDescriptionInput
                onSubmit={(description: string) => {
                  onSubmit(description, i);
                  setIsEdit(false);
                }}
                defaultValue={arg.description || ''}
              />
            ) : (
              <DescWrapper
                onClick={() => {
                  setEditedIdx(i);
                  setIsEdit(true);
                }}
              >
                <DescText
                  dangerouslySetInnerHTML={{
                    __html: md.render(arg.description || 'No description'),
                  }}
                />
                <Edit size={14} fill={backgroundedText} />
              </DescWrapper>
            )}
          </FieldsWrapper>
        ))}
      </ListWrapper>
    </>
  );
};
