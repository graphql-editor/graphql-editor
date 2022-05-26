import { DragEvent } from 'react';

export const dragStartHandler = (e: DragEvent, startNodeName: string) => {
  e.dataTransfer.setData('startName', startNodeName);
};

export const dragOverHandler = (e: DragEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

export const dragLeaveHandler = (e: DragEvent) => {
  e.stopPropagation();
  e.preventDefault();
};
