import * as React from 'react';
import * as styles from '../style/AreYouSure';
import { ActionButton } from './ActionButton';
export const AreYouSure = ({
  message = 'Are you sure?',
  onYes,
  onNo
}: {
  message?: string;
  onYes: () => void;
  onNo: () => void;
}) => (
  <React.Fragment>
    <div className={styles.Message}>{message}</div>
    <div className={styles.Actions}>
      <ActionButton onClick={onYes}>Yes</ActionButton>
      <ActionButton onClick={onNo}>Cancel</ActionButton>
    </div>
  </React.Fragment>
);
