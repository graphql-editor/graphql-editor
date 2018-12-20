import * as React from 'react';
import * as styles from '../style/Loading';
import { TopButton } from '../../ui/TopButton';
export const Loading = ({
  text,
  errors,
  onDismiss
}: {
  text: string[];
  errors: string[];
  onDismiss: () => void;
}) => (
  <div className={styles.Main}>
    {text.map((t) => (
      <div className={styles.Text} key={t}>
        {t}
      </div>
    ))}
    {errors.map((t) => (
      <div className={styles.Err} key={t}>
        {t}
      </div>
    ))}
    {errors.length > 0 && (
      <TopButton onClick={onDismiss} variant={'Pink'} big>
        Dismiss
      </TopButton>
    )}
  </div>
);
