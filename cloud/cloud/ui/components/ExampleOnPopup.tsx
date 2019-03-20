import * as React from 'react';
import * as styles from './style/ExampleOnPopup';

export interface ExampleOnPopupProps {
  name: string;
  onClick: Function;
}

export const ExampleOnPopup = ({ name, onClick }: ExampleOnPopupProps) => (
  <div className={styles.Main} onClick={() => onClick()}>
    {name}
  </div>
);
