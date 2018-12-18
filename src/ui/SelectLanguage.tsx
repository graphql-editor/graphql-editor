import * as styles from '../style/SelectLanguage';
import * as React from 'react';

export const SelectLanguage = ({
  tabs,
  onSelect,
  onCopy
}: {
  tabs: string[];
  onSelect: (x: any) => void;
  onCopy: () => void;
}) => (
  <div className={styles.Bar}>
    <div className={styles.SelectLangugage}>
      <select
        className={styles.Select}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {tabs.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
    </div>
    <img
      className={styles.CopyIcon}
      onClick={onCopy}
      src={require('../assets/export/copyIcon.png')}
    />
  </div>
);
