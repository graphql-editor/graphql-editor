import * as React from 'react';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Project } from '../ui/Project';
import { OverlayAdd } from '../ui/OverlayAdd';
import * as styles from '../style/Projects';
export class Projects extends React.Component {
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
                    .then(({ name, id, slug }) =>
                      cloud.setState({
                        projects: [...cloud.state.projects, { name, id, slug }]
                      })
                    );
                }}
              />
              <div className={styles.Projects}>
                {cloud.state.projects && cloud.state.projects.map((p) => <Project {...p} />)}
              </div>
            </React.Fragment>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
