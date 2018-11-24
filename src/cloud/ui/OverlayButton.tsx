import * as React from 'react';
import * as styles from '../style/OverlayButton';
export const OverlayButton = ({ children, onClick }) => (
  <div className={styles.OverlayButton} onClick={onClick}>
    {children}
  </div>
);
