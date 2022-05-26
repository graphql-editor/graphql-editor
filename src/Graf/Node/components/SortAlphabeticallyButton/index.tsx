import React, { useState, DragEvent } from 'react';
import { SortAz, X } from '@/editor/icons';
import { useTheme } from '@/state/containers';
import { style } from 'typestyle';
import { useSortState } from '@/state/containers/sort';
import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from '@/Graf/Node/ActiveNode/dnd';

const IconWrapper = style({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const DragOverStyle = style({
  paddingTop: 22,
});

const ListWrapper = style({
  position: 'relative',
  marginLeft: 16,
});

const TypeColor = style({
  marginLeft: 16,
});

const List = (backgroundColor: string) =>
  style({
    position: 'absolute',
    top: 40,
    left: 0,
    width: 200,
    borderRadius: 10,
    zIndex: 2,
    backgroundColor: backgroundColor,
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
  console.log(isListVisible);

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
        <p>Nodes order</p>
        <X size={24} />
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
                className={type.name === dragOverName ? `${DragOverStyle}` : ''}
              >
                <div
                  draggable={true}
                  onDragStart={(e) => {
                    dragStartHandler(e, type.name);
                  }}
                >
                  <p className={TypeColor}>{type.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
