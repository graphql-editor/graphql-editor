import * as React from 'react';
import * as styles from '../style/ActionButton';
import * as cx from 'classnames';
export const ActionButton = ({
  children,
  onClick,
  disabled,
  active
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => (
  <a
    className={cx({
      [styles.ActionButton]: true,
      [styles.Disabled]: disabled,
      [styles.Active]: active
    })}
    onClick={onClick}
  >
    {children}
  </a>
);
