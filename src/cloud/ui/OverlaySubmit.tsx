import * as React from 'react';
import * as styles from '../style/OverlaySubmit';
import * as cx from 'classnames';
export const OverlaySubmit = ({
  children,
  onSubmit,
  visible
}: {
  children: React.ReactNode;
  onSubmit: () => void;
  visible: boolean;
}) => (
  <div
    className={cx({
      [styles.Submit]: true,
      [styles.SubmitVisible]: visible
    })}
    onClick={() => {
      onSubmit();
    }}
  >
    {children}
  </div>
);
