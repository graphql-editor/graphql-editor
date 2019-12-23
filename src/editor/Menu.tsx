import React from 'react';
import * as Icons from './icons';
import * as styles from './style/Menu';
import cx from 'classnames';

export interface MenuProps {
  leftPaneHidden?: boolean;
  activePane: 'code' | 'explorer';
  toggleExplorer: () => void;
  toggleCode: () => void;
  toggleShow: () => void;
}

export const Menu = ({ leftPaneHidden, activePane, toggleCode, toggleExplorer, toggleShow }: MenuProps) => {
  return (
    <div className={styles.HiderPanel}>
      <div className={styles.Hider} onClick={toggleShow}>
        {leftPaneHidden ? <Icons.Show size={16} /> : <Icons.Hide size={16} />}
      </div>
      <div
        className={cx(styles.Hider, {
          active: activePane === 'code' && !leftPaneHidden,
        })}
        onClick={toggleCode}
      >
        <Icons.Code size={16} />
      </div>
      <div
        className={cx(styles.Hider, {
          active: activePane === 'explorer' && !leftPaneHidden,
        })}
        onClick={toggleExplorer}
      >
        <Icons.Layers size={16} />
      </div>
    </div>
  );
};
