import { FieldsList } from '@/Docs/FieldsList';
import { InterfacesList } from '@/Docs/InterfacesList';
import { useTreesState } from '@/state/containers';
import { fontFamilySans } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React, { useMemo } from 'react';
// @ts-ignore
import { Remarkable } from 'remarkable';
import styled from '@emotion/styled';
import { DescText, Title } from '@/Docs/DocsStyles';

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

  return (
    <Wrapper>
      <Top>
        <Title>{node.name}</Title>
        <Type>{node.type.name}</Type>
      </Top>
      {node.interfaces && node.interfaces.length > 0 && (
        <InterfacesList setNode={setNode} interfacesList={node.interfaces} />
      )}
      <DescText
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {node.args && node.args.length > 0 && (
        <FieldsList node={node} setNode={setNode} />
      )}
    </Wrapper>
  );
};
