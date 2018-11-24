import * as React from 'react';
import * as styles from '../style/Project';
export const Project = (project: Project) => (
  <div className={styles.Project}>
    <div>{project.name}</div>
  </div>
);
