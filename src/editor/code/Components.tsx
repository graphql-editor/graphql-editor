import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';

export interface TitleOfPaneProps {
  children: React.ReactNode;
}
export const DynamicResize: React.FunctionComponent<{
  width: number | string;
  resizeCallback: ResizeCallback;
  disabledClass?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
}> = ({
  children,
  width,
  resizeCallback,
  disabledClass,
  maxWidth = '94%',
  minWidth = '90',
}) => {
  if (disabledClass) {
    return <div className={disabledClass}>{children}</div>;
  }
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
    >
      {children}
    </Resizable>
  );
};
