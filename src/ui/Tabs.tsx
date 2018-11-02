import * as styles from '../style/Tabs';
import * as React from 'react';
import * as cx from 'classnames';

export const Tabs = ({
  tabs,
  active,
  onTabClick
}: {
  tabs: string[];
  active: string;
  onTabClick: (x: any) => void;
}) => (
  <div className={styles.Tabs}>
    {tabs.map((k) => (
      <div
        className={cx({
          [styles.Tab]: true,
          [styles.active]: k === active
        })}
        key={k}
        onClick={() => {
          onTabClick(k);
        }}
      >
        {k}
      </div>
    ))}
  </div>
);
