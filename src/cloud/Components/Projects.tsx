import * as React from 'react';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Project } from '../ui/Project';
import { OverlayAdd } from '../ui/OverlayAdd';
import * as styles from '../style/Projects';
import { OverlayMenuProps } from './OverlayMenu';
export type ProjectsType = Pick<
  OverlayMenuProps,
  'deployFaker' | 'deployProject' | 'loadProject'
> & {
  closeOverlay: () => void;
};
export class Projects extends React.Component<ProjectsType> {
  render() {
    return (
      <Provider>
        <Subscribe to={[CloudContainer]}>
          {(cloud: typeof Cloud) => (
            <React.Fragment>
              <OverlayAdd
                placeholder="Add new project..."
                onSubmit={(e) => {
                  cloud
                    .userApi()
                    .Mutation.createProject({
                      name: e
                    })({
                      id: true,
                      name: true,
                      slug: true
                    })
                    .then((project) => {
                      console.log(project);
                      return cloud
                        .setState({
                          cloud: {
                            ...cloud.state.cloud,
                            projects: [...cloud.state.cloud.projects, project],
                            currentProject: project
                          }
                        })
                        .then(this.props.closeOverlay);
                    });
                }}
              />
              <div className={styles.Projects}>
                {cloud.state.cloud.projects &&
                  cloud.state.cloud.projects.map((p) => (
                    <Project
                      key={p.id}
                      project={p}
                      deployProject={(id) => {
                        this.props.deployProject(id);
                      }}
                      loadProject={(id) => {
                        this.props.loadProject(id);
                      }}
                      deployFaker={(id) => {
                        this.props.deployFaker(id);
                      }}
                    />
                  ))}
              </div>
            </React.Fragment>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
