import * as React from 'react';
import * as styles from './style/Button';
export const Button = ({
  type,
  children,
  onClick
}: {
  type: Exclude<keyof typeof styles, 'FileButton' | 'FileButtonLayer'>;
  children: React.ReactNode;
  onClick: Function;
}) => (
  <button
    className={styles[type]}
    onClick={() => {
      onClick();
    }}
  >
    {children}
  </button>
);
export const FileButton = ({
  type,
  children,
  onClick
}: {
  type: Exclude<keyof typeof styles, 'FileButton' | 'FileButtonLayer'>;
  children: React.ReactNode;
  onClick: Function;
}) => (
  <button className={`${styles[type]} ${styles.FileButton}`}>
    {children}
    <input type="file" className={styles.FileButtonLayer} onChange={(e) => onClick(e)} />
  </button>
);
