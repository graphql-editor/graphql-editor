import { FieldsList } from '@/Docs/FieldsList';
import { InterfacesList } from '@/Docs/InterfacesList';
import { useTreesState } from '@/state/containers';
import { fontFamilySans } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React, { useCallback, useMemo, useState } from 'react';
// @ts-ignore
import { Remarkable } from 'remarkable';
import styled from '@emotion/styled';
import { DescText, DescWrapper, Title } from '@/Docs/DocsStyles';
import { AddDescriptionInput } from './AddDescriptionInput';
import { Edit } from '@/editor/icons';
import { useTheme } from '@emotion/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${fontFamilySans};
  font-size: 14px;
  height: 100%;
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

interface DocsElementI {
  node: ParserField;
}

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree } = useTreesState();
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

  const onSubmit = useCallback(
    (description: string) => (node.description = description),
    [],
  );

  return (
    <Wrapper>
      <Top>
        <Title>{node.name}</Title>
        <Type>{node.type.name}</Type>
      </Top>
      {node.interfaces && node.interfaces.length > 0 && (
        <InterfacesList setNode={setNode} interfacesList={node.interfaces} />
      )}
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
          <Edit size={16} fill={backgroundedText} />
        </DescWrapper>
      )}
      {node.args && node.args.length > 0 && (
        <FieldsList node={node} setNode={setNode} />
      )}
    </Wrapper>
  );
};
