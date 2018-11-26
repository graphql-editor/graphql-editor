import * as React from 'react';
import * as styles from '../style/Project';
import { Project as ProjectType } from '../types';
export const Project = (project: ProjectType) => (
  <div className={styles.Project}>
    <div>{project.name}</div>
  </div>
);
