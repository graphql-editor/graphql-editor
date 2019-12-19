import cx from 'classnames';
import React from 'react';
import * as styles from './style/Components';

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
