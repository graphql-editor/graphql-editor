import { FieldsList } from "@/Docs/FieldsList";
import { InterfacesList } from "@/Docs/InterfacesList";
import { useTreesState } from "@/state/containers";
import { fontFamilySans } from "@/vars";
import { ParserField, getTypeName, compareParserFields } from "graphql-js-tree";
import React, { useMemo, useState } from "react";
import { Remarkable } from "remarkable";
import styled from "@emotion/styled";
import { DescText, DescWrapper, Title } from "@/Docs/DocsStyles";
import { Description } from "@/Docs/Description";
import { PenLine } from "@aexol-studio/styling-system";

const Wrapper = styled.div`
  font-family: ${fontFamilySans};
  font-size: 14px;
  padding: 40px 50px;
  max-width: 960px;
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
  border-bottom: 1px solid ${({ theme }) => theme.text.disabled}36;
  width: 100%;
`;

interface DocsElementI {
  node: ParserField;
}

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNodeId, tree, setTree, readonly, isLibrary } =
    useTreesState();

  const [isEdit, setIsEdit] = useState(false);

  const isReadonly = readonly || isLibrary(node);

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0)
      setSelectedNodeId({
        value: {
          id: newSelectedNode[0].id,
          name: newSelectedNode[0].name,
        },
        source: "docs",
      });
  };

  const description = useMemo(() => {
    return node.description ? new Remarkable().render(node.description) : "";
  }, [node.description]);

  const onSubmit = (description: string) => {
    const n = tree.nodes.find(compareParserFields(node));
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
        <Description
          onChange={(description: string) => {
            onSubmit(description);
            setIsEdit(false);
          }}
          value={node.description || ""}
        />
      ) : (
        <DescWrapper
          readonly={isReadonly}
          isSvgVisible={!description}
          onClick={() => !isReadonly && setIsEdit(true)}
        >
          <DescText
            dangerouslySetInnerHTML={{
              __html: description || "No description",
            }}
          />
          {!isReadonly && <PenLine />}
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
