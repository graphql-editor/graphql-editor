import * as React from 'react';
import * as styles from './style/Button';
export const Button = ({
  type,
  children,
  onClick
}: {
  type: Exclude<keyof typeof styles, 'FileButton' | 'FileButtonLayer'>;
  children: React.ReactNode;
  onClick: () => void;
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
