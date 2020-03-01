import cx from 'classnames';
import React from 'react';
import * as styles from './style/Explorer';

interface FilterBlockProps {
  name: string;
  onClick: () => void;
  color: string;
  active?: boolean;
}

export const FilterBlock = ({ name, onClick, active, color }: FilterBlockProps) => (
  <div onClick={onClick} style={{ color }} className={cx(styles.FilterBlock, { active })}>
    {name}
  </div>
);
