import cx from 'classnames';
import React from 'react';
import * as styles from './style/Components';
import { Resizable, ResizeCallback } from 're-resizable';
import { useTheme } from '@/state/containers';

export interface TitleOfPaneProps {
  children: React.ReactNode;
}

export const TitleOfPane = ({ children }: TitleOfPaneProps) => {
  const { theme } = useTheme();
  return <div className={styles.TitleOfPane(theme)}>{children}</div>;
};
export const StatusDot = ({ status }: { status: styles.StatusDotProps }) => {
  const { theme } = useTheme();
  return (
    <div
      className={cx(styles.StatusDot(theme), {
        [status]: true,
      })}
    />
  );
};

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
