import * as React from 'react';
import * as styles from '../style/Projects';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { ProjectsList } from './ProjectsList';
import { EditProject } from './EditProject';
export const Projects = () => (
  <Subscribe to={[Cloud]}>
    {(cloud: typeof Cloud) => {
      const { category, editedProject } = cloud.state;
      return (
        <div className={styles.Container}>
          <div className={styles.Right}>
            {(category === 'my' || category === 'examples' || category === 'public') && (
              <ProjectsList />
            )}
            {category === 'new' && <EditProject />}
            {category === 'edit' && <EditProject project={editedProject} />}
          </div>
        </div>
      );
    }}
  </Subscribe>
);
