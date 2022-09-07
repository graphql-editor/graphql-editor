import React, { useState, DragEvent, useRef } from 'react';
import { ArrowLeft, SixDots } from '@/editor/icons';
import { useSortState } from '@/state/containers/sort';
import { dragLeaveHandler, dragOverHandler } from '@/Graf/Node/ActiveNode/dnd';
import { TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';
import styled from '@emotion/styled';
import { fontFamily, fontFamilySans } from '@/vars';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { useOnClickOutside } from '../../hooks';

type NodeType = keyof EditorTheme['colors'];

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  position: relative;
  cursor: pointer;
  font-family: ${fontFamilySans};
  color: ${({ theme }) => theme.dimmed};
  border-radius: 4px;
  font-size: 14px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.background.mainFurthest};

  h4 {
    margin: 0;
    font-weight: 400;
  }
`;

const ChevronBox = styled.div<{ isListVisible: boolean }>`
  display: flex;
  svg path {
    fill: ${({ theme }) => theme.text};
    transform-origin: 50% 50%;
    transform: ${({ isListVisible }) =>
      isListVisible ? 'rotate(90deg)' : 'rotate(-90deg)'};
    transition: transform 0.25s ease;
  }
`;

const DragContainer = styled.div<{
  isDraggedOver?: boolean;
  disableDrag?: boolean;
  dragSpaceTop?: boolean;
  isDragged?: boolean;
}>`
  ${({ isDraggedOver, dragSpaceTop, disableDrag }) => {
    if (disableDrag || !isDraggedOver) return undefined;
    return dragSpaceTop ? 'padding-top:50px;' : 'padding-bottom:50px;';
  }}
  opacity: ${({ isDragged }) => (isDragged ? 0.4 : 1)};
`;

const List = styled.div<{ isListVisible: boolean }>`
  position: absolute;
  top: 26px;
  left: 0;
  width: 250px;
  opacity: ${({ isListVisible }) => (isListVisible ? 1 : 0)};
  pointer-events: ${({ isListVisible }) => (isListVisible ? 'auto' : 'none')};
  z-index: 2;
  background-color: ${({ theme }) => theme.background.mainFurthest}f5;
  border-radius: 4px;
  padding: 20px 10px 0px;
  transition: opacity 0.25s ease;
`;

const ListItem = styled.div<{ nodeType: NodeType }>`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 36px;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  font-weight: 500;
  font-family: ${fontFamily};
  cursor: grab;
  border: 1px solid ${({ nodeType, theme }) => theme.colors[nodeType]};
  transition: background-color 0.25s ease;
  &:hover {
    background-color: ${({ theme }) => theme.background.mainMiddle};
  }

  svg {
    fill: ${({ theme }) => theme.text};
    margin-right: 15px;
  }
`;

const initDragObj = {
  name: '',
  idx: 0,
};

export const SortNodes = () => {
  const orderListRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(orderListRef, () => {
    setIsOrderListVisible(false);
  });

  const { orderTypes, setOrderTypes } = useSortState();
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);

  const [dragOverObj, setDragOverObj] = useState(initDragObj);
  const [dragStartObj, setDragStartObj] = useState(initDragObj);

  const dropHandler = (e: DragEvent, endNodeName: string) => {
    e.stopPropagation();
    if (endNodeName === dragStartObj.name) return;

    let newOrderTypes = [...orderTypes];
    const startIdx = newOrderTypes.findIndex(
      (a) => a.name === dragStartObj.name,
    );
    const endIdx = newOrderTypes.findIndex((a) => a.name === endNodeName);
    newOrderTypes.splice(endIdx, 0, newOrderTypes.splice(startIdx, 1)[0]);
    newOrderTypes = newOrderTypes.map((nt, i) => ({
      ...nt,
      value: newOrderTypes.length - i - 1,
    }));
    setOrderTypes(newOrderTypes);
  };

  const displayTypes = (type: string): NodeType => {
    switch (type) {
      case TypeDefinition.ObjectTypeDefinition:
        return 'type';
      case TypeDefinition.InterfaceTypeDefinition:
        return 'interface';
      case TypeDefinition.UnionTypeDefinition:
        return 'union';
      case TypeDefinition.EnumTypeDefinition:
        return 'enum';
      case TypeDefinition.ScalarTypeDefinition:
        return 'scalar';
      case TypeDefinition.InputObjectTypeDefinition:
        return 'input';
      case TypeSystemDefinition.DirectiveDefinition:
        return 'directive';

      default:
        return 'type';
    }
  };

  return (
    <Container
      onClick={() => setIsOrderListVisible((prev) => !prev)}
      ref={orderListRef}
    >
      <h4>Nodes order</h4>
      <ChevronBox isListVisible={isOrderListVisible}>
        <ArrowLeft size={11} />
      </ChevronBox>
      <List isListVisible={isOrderListVisible}>
        {orderTypes.map((type, idx) => (
          <DragContainer
            key={type.name}
            id={type.name}
            isDragged={type.name === dragStartObj.name}
            isDraggedOver={type.name === dragOverObj.name}
            dragSpaceTop={dragStartObj.idx > dragOverObj.idx}
            disableDrag={dragOverObj.name === dragStartObj.name}
            onDrop={(e) => {
              setDragOverObj(initDragObj);
              setDragStartObj(initDragObj);
              dropHandler(e, type.name);
            }}
            onDragEnd={() => setDragOverObj(initDragObj)}
            onDragLeave={(e) => {
              dragLeaveHandler(e);
            }}
            onDragOver={(e) => {
              setDragOverObj({ name: type.name, idx });
              dragOverHandler(e);
            }}
          >
            <ListItem
              nodeType={displayTypes(type.name)}
              draggable={true}
              onDragStart={() => {
                setDragStartObj({ name: type.name, idx });
              }}
            >
              <SixDots size={18} />
              <p>{displayTypes(type.name)}</p>
            </ListItem>
          </DragContainer>
        ))}
      </List>
    </Container>
  );
};
