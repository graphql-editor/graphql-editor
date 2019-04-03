import * as React from 'react';
import * as styles from './style/Projects';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { ProjectsList } from './ProjectsList';
import { EditProject } from './EditProject';
import * as cx from 'classnames';
import { EditTeam } from './EditTeam';
import { CreateTeam } from './CreateTeam';
export const Projects = () => (
  <Subscribe to={[Cloud]}>
    {(cloud: typeof Cloud) => {
      const { category, editedProject } = cloud.state;
      return (
        <div className={styles.Container}>
          <div className={styles.Left}>
            <label className={styles.ProjectLabel}>Projects</label>
            <a
              onClick={() => {
                if (!cloud.state.token) {
                  cloud.setState((state) => ({
                    popup: 'loginToContinue'
                  }));
                  return;
                }
                cloud.setState((state) => ({
                  category: 'my'
                }));
              }}
              className={cx(styles.ProjectsLink, { active: category === 'my' })}
            >
              My projects
            </a>
            <a
              onClick={() => {
                cloud.setState((state) => ({
                  category: 'public'
                }));
              }}
              className={cx(styles.ProjectsLink, { active: category === 'public' })}
            >
              All projects
            </a>
            <a
              onClick={async () => {
                await cloud.projects.loadExamples();
                cloud.setState((state) => ({
                  category: 'examples'
                }));
              }}
              className={cx(styles.ProjectsLink, { active: category === 'examples' })}
            >
              Examples
            </a>
            <label className={styles.TeamLabel}>Teams</label>
            <a
              onClick={async () => {
                await cloud.projects.loadExamples();
                cloud.setState((state) => ({
                  category: 'newTeam'
                }));
              }}
              className={cx(styles.TeamLink, { active: category === 'newTeam' })}
            >
              Create Team
            </a>
            {cloud.state.teams && cloud.state.teams.map((t) => (
              <label
                onClick={() => {
                  cloud.setState({
                    team: t,
                    category: 'editTeam'
                  });
                }}
                key={t.id}
                className={styles.TeamLabel}
              >
                {t.name}
              </label>
            ))}
          </div>
          <div className={styles.Right}>
            <div className={styles.RightContainer}>
              {(category === 'my' || category === 'examples' || category === 'public') && (
                <ProjectsList />
              )}
              {category === 'new' && <EditProject />}
              {category === 'edit' && <EditProject project={editedProject} />}
              {category === 'newTeam' && <CreateTeam />}
              {category === 'editTeam' && <EditTeam team={cloud.state.team} />}
            </div>
          </div>
        </div>
      );
    }}
  </Subscribe>
);
