import React, { useState, DragEvent } from 'react';
import { SortAz, X, UpDownArrow } from '@/editor/icons';
import { useTheme } from '@/state/containers';
import { style } from 'typestyle';
import { useSortState } from '@/state/containers/sort';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/Graf/Node/ActiveNode/dnd';
import { themed } from '@/Theming/utils';
import { TypeDefinition, TypeSystemDefinition } from 'graphql-js-tree';

const IconWrapper = style({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const DragOverStyle = themed((theme) =>
  style({
    paddingTop: 22,
    color: theme.backgrounds.type,
  }),
);

const ListWrapper = style({
  position: 'relative',
  marginLeft: 16,
});

const ListHeader = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 200,
});

const TypeColor = themed((theme) =>
  style({
    color: theme.text,
  }),
);

const List = (backgroundColor: string) =>
  style({
    position: 'absolute',
    top: 50,
    right: 0,
    width: 200,
    borderRadius: 10,
    zIndex: 2,
    backgroundColor: backgroundColor,
  });

const ListItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: 16,
  paddingLeft: 16,
});

export const SortAlphabeticallyButton = () => {
  const {
    setIsSortAlphabetically,
    isSortAlphabetically,
    orderTypes,
    setOrderTypes,
  } = useSortState();
  const { theme } = useTheme();
  const [dragOverName, setDragOverName] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  const dropHandler = (e: DragEvent, endNodeName: string) => {
    e.stopPropagation();
    const startName = e.dataTransfer?.getData('startName');
    if (endNodeName === startName) return;
    setIsSortAlphabetically(true);
    let newOrderTypes = [...orderTypes];
    const startIdx = newOrderTypes.findIndex((a) => a.name === startName);
    const endIdx = newOrderTypes.findIndex((a) => a.name === endNodeName);
    const startField = newOrderTypes[startIdx];
    newOrderTypes[startIdx] = newOrderTypes[endIdx];
    newOrderTypes[endIdx] = startField;
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

  return (
    <div className={IconWrapper}>
      <div onClick={() => setIsSortAlphabetically((prev) => !prev)}>
        <SortAz
          size={28}
          fill={isSortAlphabetically ? theme.active : theme.inactive}
        />
      </div>

      <div
        onClick={() => setIsListVisible((prev) => !prev)}
        className={ListWrapper}
      >
        <div className={ListHeader}>
          <p>Nodes order</p>
          {isListVisible && <X size={20} />}
        </div>
        <div className={List(theme.background.mainMiddle)}>
          {isListVisible &&
            orderTypes.map((type) => (
              <div
                key={type.name}
                id={type.name}
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
                className={
                  type.name === dragOverName ? `${DragOverStyle(theme)}` : ''
                }
              >
                <div
                  draggable={true}
                  onDragStart={(e) => {
                    dragStartHandler(e, type.name);
                  }}
                  className={ListItem}
                >
                  <p className={TypeColor(theme)}>{displayTypes(type.name)}</p>
                  <UpDownArrow size={24} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
