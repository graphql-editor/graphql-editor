import React, { useState, DragEvent } from 'react';
import { ArrowLeft, UpDownArrow } from '@/editor/icons';
import { useTheme } from '@/state/containers';
import { useSortState } from '@/state/containers/sort';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/Graf/Node/ActiveNode/dnd';
import { TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';
import styled from '@emotion/styled';

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListWrapper = styled.div`
  position: relative;
  margin-left: 16px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  z-index: 2;
  background-color: ${({ theme }) => theme.background.mainMiddle};
  border-radius: 10px;
`;

const TypeColor = styled.p`
  color: ${({ theme }) => theme.text};
`;

const DragContainer = styled.div<{ isDraggedOver?: boolean }>`
  padding-top: ${({ isDraggedOver }) => (isDraggedOver ? '57px' : '0')};
`;

const ListItem = styled.div<{ nodeColor: string; shouldResetMargin?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 8px;
  margin-bottom: ${({ shouldResetMargin }) =>
    shouldResetMargin ? '0' : '8px'};
  border-radius: 10px;
  color: transparent;
  border: 1px solid ${({ nodeColor }) => nodeColor};
  &:hover {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const SortAlphabeticallyButton = () => {
  const { orderTypes, setOrderTypes } = useSortState();
  const { theme } = useTheme();
  const [dragOverName, setDragOverName] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  const dropHandler = (e: DragEvent, endNodeName: string) => {
    e.stopPropagation();
    const startName = e.dataTransfer?.getData('startName');
    if (endNodeName === startName) return;

    let newOrderTypes = [...orderTypes];
    const startIdx = newOrderTypes.findIndex((a) => a.name === startName);
    const endIdx = newOrderTypes.findIndex((a) => a.name === endNodeName);
    newOrderTypes.splice(endIdx, 0, newOrderTypes.splice(startIdx, 1)[0]);
    newOrderTypes = newOrderTypes.map((nt, i) => ({
      ...nt,
      value: newOrderTypes.length - i - 1,
    }));
    setOrderTypes(newOrderTypes);
  };

  const displayTypes = (type: string) => {
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
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case TypeDefinition.ObjectTypeDefinition:
        return theme.backgrounds.type;
      case TypeDefinition.InterfaceTypeDefinition:
        return theme.backgrounds.interface;
      case TypeDefinition.UnionTypeDefinition:
        return theme.backgrounds.union;
      case TypeDefinition.EnumTypeDefinition:
        return theme.backgrounds.enum;
      case TypeDefinition.ScalarTypeDefinition:
        return theme.backgrounds.scalar;
      case TypeDefinition.InputObjectTypeDefinition:
        return theme.backgrounds.input;
      case TypeSystemDefinition.DirectiveDefinition:
        return theme.backgrounds.directive;
      default:
        return theme.backgrounds.type;
    }
  };

  return (
    <Container>
      <ListWrapper onClick={() => setIsListVisible((prev) => !prev)}>
        <ListHeader>
          <p>Nodes order</p>
          <ArrowLeft size={20} />
        </ListHeader>
        <List>
          {isListVisible &&
            orderTypes.map((type, idx) => (
              <DragContainer
                key={type.name}
                id={type.name}
                isDraggedOver={type.name === dragOverName}
                onDrop={(e) => {
                  setDragOverName('');
                  dropHandler(e, type.name);
                }}
                onDragEnd={() => setDragOverName('')}
                onDragLeave={(e) => {
                  dragLeaveHandler(e);
                }}
                onDragOver={(e) => {
                  setDragOverName(type.name);
                  dragOverHandler(e);
                }}
              >
                <ListItem
                  nodeColor={getTypeColor(type.name)}
                  shouldResetMargin={idx === orderTypes.length - 1}
                  draggable={true}
                  onDragStart={(e) => {
                    dragStartHandler(e, type.name);
                  }}
                >
                  <TypeColor>{displayTypes(type.name)}</TypeColor>
                  <UpDownArrow size={24} />
                </ListItem>
              </DragContainer>
            ))}
        </List>
      </ListWrapper>
    </Container>
  );
};
