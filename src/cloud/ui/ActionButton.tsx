import * as React from 'react';
import * as styles from '../style/ActionButton';
export const ActionButton = ({ children, onClick }) => (
  <a className={styles.ActionButton} onClick={onClick}>
    {children}
  </a>
);
