import * as React from 'react';
import * as styles from '../style/Overlay';
export const Overlay = ({ children, onClose }) => (
  <div className={styles.Overlay}>
    <div className={styles.CloseButton} onClick={onClose}>
      X
    </div>
    {children}
  </div>
);
