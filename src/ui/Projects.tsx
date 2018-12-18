import * as React from 'react';
import * as styles from '../style/Projects';
import { ProjectSearch } from './ProjectSearch';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { ProjectTile } from './ProjectTile';
import * as cx from 'classnames';
export type ProjectsState = {
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
};
export class Projects extends React.Component {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          const { category } = cloud.state;
          const { projects, searchProjects, exampleProjects } = cloud.state.cloud;
          return (
            <div className={styles.Container}>
              <div className={styles.Left}>
                <div className={styles.Title}>
                  <div className={styles.TitleLabel}>Projects</div>
                  <img
                    onClick={() => {
                      cloud.setState((state) => ({
                        popup: 'createProject'
                      }));
                    }}
                    className={styles.AddImage}
                    src="../assets/export/addIcon.png"
                  />
                </div>
                <div
                  onClick={() => {
                    cloud.setState(state =>({
                      category: 'my'
                    }));
                  }}
                  className={cx(styles.Link, { active: category === 'my' })}
                >
                  My projects
                </div>
                <div
                  onClick={() => {
                    cloud.setState(state =>({
                      category: 'public'
                    }));
                  }}
                  className={cx(styles.Link, { active: category === 'public' })}
                >
                  Public projects
                </div>
                <div
                  onClick={() => {
                    cloud.loadExamples();
                    cloud.setState(state =>({
                      category: 'examples'
                    }));
                  }}
                  className={cx(styles.Link, { active: category === 'examples' })}
                >
                  Examples
                </div>
                <div
                  onClick={() => {
                    cloud.setState((state) => ({
                      popup: 'createProject'
                    }));
                  }}
                  className={cx(styles.Link, { active: category === 'new' })}
                >
                  Add project +
                </div>
                <div />
              </div>
              <div className={styles.Right}>
                {(category === 'my' || category === 'public') && (
                  <ProjectSearch
                    onSubmit={(e) => {
                      cloud.listPublicProjects();
                    }}
                  />
                )}
                {category === 'my' &&
                  projects && (
                    <div className={styles.ProjectsGrid}>
                      {projects.map((p) => (
                        <ProjectTile key={p.id} project={p} onLoad={() => cloud.loadProject(p)} />
                      ))}
                    </div>
                  )}
                {category === 'public' &&
                  searchProjects && (
                    <div className={styles.ProjectsGrid}>
                      {searchProjects.map((p) => (
                        <ProjectTile key={p.id} project={p} onLoad={() => cloud.loadProject(p)} />
                      ))}
                    </div>
                  )}
                {category === 'examples' &&
                  exampleProjects && (
                    <div className={styles.ProjectsGrid}>
                      {exampleProjects.map((p) => (
                        <ProjectTile key={p.id} project={p} onLoad={() => cloud.loadProject(p)} />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
