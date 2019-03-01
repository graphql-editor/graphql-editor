import * as React from 'react';
import * as styles from '../style/ProjectTile';

interface NewProjectTileProps {
    onClick:()=>void
}

export const NewProjectTile = ({onClick}: NewProjectTileProps) => (
  <div className={styles.NewTile} onClick={onClick}>
    <a className={styles.NewProject}>new project +</a>
  </div>
);
