import { useTreesState } from '@/state/containers';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import { EditorTheme } from '@/gshared/theme/MainTheme';
import { ChevronDown } from '@aexol-studio/styling-system';
import { SingleNodeInList } from '@/shared/NodeNavigation/SingleNodeInList';

const Title = styled.div<{
  open?: boolean;
  nodeInsideSelected?: boolean;
  empty?: boolean;
  color: keyof EditorTheme['colors'];
}>`
  font-family: ${fontFamilySans};
  font-weight: 600;
  font-size: 14px;
  cursor: ${({ empty }) => (empty ? 'auto' : 'pointer')};
  color: ${({ theme, nodeInsideSelected, empty, color }) =>
    empty
      ? theme.text.disabled
      : nodeInsideSelected
      ? theme.colors[color]
      : theme.text.active};
  margin: 0;
  padding-bottom: 5px;
  margin-right: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${transition};
  svg {
    color: ${({ theme, open }) =>
      open ? theme.text.active : theme.button.standalone.disabled};
    transition: ${transition};
    transform-origin: 50%;
    transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(-90deg)')};
  }
`;

type ToggleableParserField = ParserField & { isHidden?: boolean };

interface NodeListI {
  listTitle: string;
  nodeList?: ToggleableParserField[];
  expanded: Array<string>;
  setExpanded: (e: string) => void;
  colorKey: keyof EditorTheme['colors'];
  visibleInRelationView?: true;
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
  colorKey,
  visibleInRelationView,
}) => {
  const { selectedNodeId } = useTreesState();
  const nodeInsideSelected =
    !!selectedNodeId?.value?.name &&
    nodeList?.map((n) => n.name).includes(selectedNodeId?.value?.name);
  const open = expanded.includes(listTitle);
  const empty = !nodeList?.length;

  return (
    <>
      <Title
        color={colorKey}
        empty={empty}
        nodeInsideSelected={nodeInsideSelected}
        onClick={() => setExpanded(listTitle)}
        open={open}
      >
        <div>{listTitle}</div>
        {!empty && <ChevronDown />}
      </Title>
      {open &&
        nodeList &&
        nodeList.map((node, i) => (
          <SingleNodeInList
            key={node.id}
            colorKey={colorKey}
            visibleInRelationView={visibleInRelationView}
            node={node}
          />
        ))}
    </>
  );
};
