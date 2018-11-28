import * as React from 'react';
import * as styles from '../style/OverlayTitle';
export const OverlayTitle = ({ children }) => (
  <div className={styles.OverlayTitle}>
    {children}
  </div>
);
