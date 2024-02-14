import { FieldsList } from "@/Docs/FieldsList";
import { InterfacesList } from "@/Docs/InterfacesList";
import { useTreesState } from "@/state/containers";
import { ParserField, getTypeName, compareParserFields } from "graphql-js-tree";
import React, { useMemo, useState } from "react";
import { Remarkable } from "remarkable";
import styled from "@emotion/styled";
import { DescText, DescWrapper, Title } from "@/Docs/DocsStyles";
import { Description } from "@/Docs/Description";
import { PenLine, Stack } from "@aexol-studio/styling-system";
import { isExtensionNode } from "@/GraphQL/Resolve";

const Wrapper = styled(Stack)`
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  padding: 5rem;
  max-width: 960px;
`;

const Top = styled(Stack)`
  display: flex;
  align-items: flex-start;
`;

const Type = styled.div`
  color: ${({ theme }) => theme.colors.type};
  margin-left: 4px;
  font-size: 1.25rem;
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
  const isExtension = isExtensionNode(node.data.type);

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
    <Wrapper direction="column" gap="1rem">
      <Top gap="0.5rem">
        <Title variant="H2 SB" color="active">
          {node.name}
        </Title>
        <Type>{getTypeName(node.type.fieldType)}</Type>
      </Top>
      {!isExtension && (
        <DescWrapper
          readonly={isReadonly}
          isSvgVisible={!description}
          onClick={() => !isReadonly && setIsEdit(true)}
        >
          {isEdit ? (
            <Description
              onChange={(description: string) => {
                onSubmit(description);
                setIsEdit(false);
              }}
              value={node.description || ""}
            />
          ) : (
            <>
              <DescText
                dangerouslySetInnerHTML={{
                  __html: description || "No description",
                }}
              />
              {!isReadonly && <PenLine />}
            </>
          )}
        </DescWrapper>
      )}
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
