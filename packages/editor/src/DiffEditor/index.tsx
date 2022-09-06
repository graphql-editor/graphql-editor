import { DiffEditorPane } from '@/editor/code';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Parser, TreeToGraphQL } from 'graphql-js-tree';
import { useSortState } from '@/state/containers/sort';
import { fontFamilySans } from '@/vars';
import { Abc, Arrow } from '@/editor/icons';
import { useTheme } from '@emotion/react';

interface DiffEditorProps {
  schemas: Record<string, string>;
}

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.mainFurthest};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 20px 0px;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
`;

const LineSpacer = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabled}36;
  margin: 20px 0;
`;

const SelectVersionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;

const Option = styled.div<{ idx?: number }>`
  padding: 15px 15px 15px 20px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-family: ${fontFamilySans};
  background-color: ${({ theme }) => theme.background.mainMiddle};
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: ${({ idx }) => typeof idx === 'number' && (idx + 1) * 36}px;
  left: 0;
  width: 160px;
  height: 36px;
  cursor: pointer;
  z-index: 100;
  &:hover {
    background-color: ${({ theme }) => theme.background.mainMiddle};
  }
`;

const OptionsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-left: 16px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 7.5px;
  right: 20px;
  z-index: 100;
`;

export const DiffEditor = ({ schemas }: DiffEditorProps) => {
  const { sortAlphabetically } = useSortState();
  const { inactive, active, text } = useTheme();

  const [isSortActive, setIsSortActive] = useState(false);
  const [choosenLeftVersion, setChoosenLeftVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length - 2],
  );
  const [choosenRightVersion, setChoosenRightVersion] = useState(
    Object.keys(schemas)[Object.keys(schemas).length - 1],
  );
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const sortSchema = (schema: string) => {
    if (!schema) return '';
    const tree = Parser.parse(schema);
    tree.nodes.sort(sortAlphabetically);
    tree.nodes = tree.nodes.filter(
      (n) => n.args?.sort(sortAlphabetically) && n,
    );
    return TreeToGraphQL.parse(tree);
  };

  return (
    <Main>
      <TopBar>
        <Heading>DIFF VIEW</Heading>
        <div onClick={() => setIsSortActive((s) => !s)}>
          <Abc size={28} fill={isSortActive ? active : inactive} />
        </div>
      </TopBar>
      <TopBar>
        <SelectVersionWrapper>
          <Heading>SELECT VERSION</Heading>
          <OptionsWrapper>
            <Option onClick={() => setIsLeftOpen((lo) => !lo)}>
              {choosenLeftVersion || 'Select version'}
              <IconWrapper>
                <Arrow size={12} fill={text} />
              </IconWrapper>
            </Option>
            {isLeftOpen &&
              Object.keys(schemas).map((s, i) => (
                <Option
                  idx={i}
                  onClick={() => {
                    setIsLeftOpen(false);
                    setChoosenLeftVersion(s);
                  }}
                  key={i}
                >
                  {s}
                </Option>
              ))}
          </OptionsWrapper>
        </SelectVersionWrapper>
        <SelectVersionWrapper>
          <Heading>SELECT VERSION</Heading>
          <OptionsWrapper>
            <Option onClick={() => setIsRightOpen((ro) => !ro)}>
              {choosenRightVersion || 'Select version'}
              <IconWrapper>
                <Arrow size={12} fill={text} />
              </IconWrapper>
            </Option>
            {isRightOpen &&
              Object.keys(schemas).map((s, i) => (
                <Option
                  idx={i}
                  onClick={() => {
                    setIsRightOpen(false);
                    setChoosenRightVersion(s);
                  }}
                  key={i}
                >
                  {s}
                </Option>
              ))}
          </OptionsWrapper>
        </SelectVersionWrapper>
      </TopBar>
      <LineSpacer />
      <DiffEditorPane
        schema={
          isSortActive
            ? sortSchema(schemas[choosenLeftVersion])
            : schemas[choosenLeftVersion]
        }
        newSchema={
          isSortActive
            ? sortSchema(schemas[choosenRightVersion])
            : schemas[choosenRightVersion]
        }
        size={`100vw-50px`}
      />
    </Main>
  );
};
