import * as React from 'react';
import * as styles from '../style/Loading';
export const Loading = ({ text, errors }: { text: string[]; errors: string[] }) => (
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
  </div>
);
