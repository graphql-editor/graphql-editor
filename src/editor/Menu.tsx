import React from 'react';
import * as Icons from './icons';
import * as styles from './style/Menu';
import cx from 'classnames';
export type ActivePane = 'code' | 'explorer-diagram' | 'diagram' | 'code-diagram';
export interface MenuProps {
  activePane: ActivePane;
  setActivePane: (pane: ActivePane) => void;
}

export const Menu = ({ setActivePane, activePane }: MenuProps) => {
  return (
    <div className={styles.HiderPanel}>
      {activePane === 'code' && (
        <div className={styles.Hider} onClick={() => setActivePane('code-diagram')}>
          <Icons.X size={16} />
        </div>
      )}
      {activePane === 'diagram' && (
        <div className={styles.Hider} onClick={() => setActivePane('code-diagram')}>
          <Icons.Show size={16} />
        </div>
      )}
      {(activePane === 'code-diagram' || activePane === 'explorer-diagram') && (
        <>
          <div className={styles.Hider} onClick={() => setActivePane('diagram')}>
            <Icons.Hide size={16} />
          </div>
          <div className={cx(styles.Hider)} onClick={() => setActivePane('code')}>
            <Icons.FullScreen size={16} />
          </div>
        </>
      )}
      <div
        className={cx(styles.Hider, { active: activePane === 'explorer-diagram' })}
        onClick={() => setActivePane('explorer-diagram')}
      >
        <Icons.Layers size={16} />
      </div>
    </div>
  );
};
