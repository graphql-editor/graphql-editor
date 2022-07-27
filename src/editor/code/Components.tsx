import React from 'react';
import { Enable, Resizable, ResizeCallback } from 're-resizable';

export interface TitleOfPaneProps {
  children: React.ReactNode;
}
export const DynamicResize: React.FunctionComponent<{
  width: number | string;
  resizeCallback: ResizeCallback;
  disabledClass?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  enable?: Enable;
}> = ({
  children,
  width,
  resizeCallback,
  disabledClass,
  maxWidth = '94%',
  minWidth = '90',
  enable,
}) => {
  if (disabledClass) {
    return <div className={disabledClass}>{children}</div>;
  }

  const enableObj = {
    left: enable?.left ? enable.left : false,
    right: enable?.right ? enable.right : false,
  };

  return (
    <Resizable
      defaultSize={{
        width,
        height: '100%',
      }}
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        zIndex: 3,
      }}
      onResize={resizeCallback}
      maxWidth={maxWidth}
      minWidth={minWidth}
      enable={enableObj}
    >
      {children}
    </Resizable>
  );
};
