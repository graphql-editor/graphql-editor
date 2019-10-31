import React from 'react';
import * as styles from './style/Components';
export interface TitleOfPaneProps {
  children: React.ReactNode;
}

export const TitleOfPane = ({ children }: TitleOfPaneProps) => (
  <div className={styles.TitleOfPane}>{children}</div>
);
