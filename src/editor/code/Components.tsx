import cx from 'classnames';
import React from 'react';
import * as styles from './style/Components';
import { Resizable, ResizeCallback } from 're-resizable';

export interface TitleOfPaneProps {
  children: React.ReactNode;
}

export const TitleOfPane = ({ children }: TitleOfPaneProps) => <div className={styles.TitleOfPane}>{children}</div>;
export const StatusDot = ({ status }: { status: styles.StatusDotProps }) => (
  <div
    className={cx(styles.StatusDot, {
      [status]: true,
    })}
  />
);

export const DynamicResize: React.FunctionComponent<{
  width: number | string;
  resizeCallback: ResizeCallback;
  disabledClass?: string;
}> = ({ children, width, resizeCallback, disabledClass }) => {
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
      maxWidth="100%"
      minWidth="1"
    >
      {children}
    </Resizable>
  );
};
