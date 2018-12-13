import * as React from 'react';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Project } from '../ui/Project';
import { OverlayAdd } from '../ui/OverlayAdd';
import * as styles from '../style/Projects';
import { OverlayMenuProps } from './OverlayMenu';
export type ProjectsType = OverlayMenuProps & {
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
                      return cloud
                        .setState({
                          cloud: {
                            ...cloud.state.cloud,
                            projects: [
                              ...cloud.state.cloud.projects,
                              {
                                ...project,
                                owner: { namespace: { slug: cloud.state.cloud.namespace.slug } }
                              }
                            ],
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
                      current={
                        cloud.state.cloud.currentProject &&
                        cloud.state.cloud.currentProject.slug === p.slug
                      }
                      fakerEnabled={
                        cloud.state.faker.projects &&
                        !!cloud.state.faker.projects.find((pf) => pf.slug === p.slug)
                      }
                      deployProject={this.props.deployProject}
                      loadProject={this.props.loadProject}
                      deployFaker={this.props.deployFaker}
                      removeProject={this.props.removeProject}
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
