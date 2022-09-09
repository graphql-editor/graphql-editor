import { FieldsList } from '@/Docs/FieldsList';
import { InterfacesList } from '@/Docs/InterfacesList';
import { useTreesState } from '@/state/containers';
import { fontFamilySans } from '@/vars';
import { ParserField, getTypeName } from 'graphql-js-tree';
import React, { useMemo, useState } from 'react';
// @ts-ignore
import { Remarkable } from 'remarkable';
import styled from '@emotion/styled';
import { DescText, DescWrapper, Title } from '@/Docs/DocsStyles';
import { AddDescriptionInput } from './AddDescriptionInput';
import { Edit } from '@/editor/icons';
import { useTheme } from '@emotion/react';
import { compareNodesWithData } from '@/compare/compareNodes';

const Wrapper = styled.div`
  font-family: ${fontFamilySans};
  font-size: 14px;
  height: 100%;
  padding: 40px 50px;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Type = styled.div`
  color: ${({ theme }) => theme.colors.type};
  margin-left: 4px;
  font-size: 10px;
`;

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  width: 100%;
`;

interface DocsElementI {
  node: ParserField;
}

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree, setTree } = useTreesState();
  const { backgroundedText } = useTheme();

  const [isEdit, setIsEdit] = useState(false);

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0)
      setSelectedNode({
        field: newSelectedNode[0],
        source: 'docs',
      });
  };

  const description = useMemo(() => {
    return node.description ? new Remarkable().render(node.description) : '';
  }, [node.description]);

  const onSubmit = (description: string) => {
    const n = tree.nodes.find((n) => compareNodesWithData(n, node));
    if (n) {
      n.description = description;
    }
    setTree({ ...tree });
  };

  return (
    <Wrapper>
      <Top>
        <Title subTitle={false}>{node.name}</Title>
        <Type>{getTypeName(node.type.fieldType)}</Type>
      </Top>
      {isEdit ? (
        <AddDescriptionInput
          onSubmit={(description: string) => {
            onSubmit(description);
            setIsEdit(false);
          }}
          defaultValue={node.description || ''}
        />
      ) : (
        <DescWrapper onClick={() => setIsEdit(true)}>
          <DescText
            dangerouslySetInnerHTML={{
              __html: description || 'No description',
            }}
          />
          <Edit size={14} fill={backgroundedText} />
        </DescWrapper>
      )}
      <Line />
      {node.interfaces && node.interfaces.length > 0 && (
        <InterfacesList setNode={setNode} interfacesList={node.interfaces} />
      )}
      <Line />
      {node.args && node.args.length > 0 && (
        <FieldsList node={node} setNode={setNode} />
      )}
    </Wrapper>
  );
};
