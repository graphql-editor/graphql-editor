import * as React from 'react';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud, api } from '../Container';
import { Project } from '../ui/Project';
import { OverlayAdd } from '../ui/OverlayAdd';

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
                  api.Mutation.createProject();
                }}
              />
              {cloud.state.projects && cloud.state.projects.projects.map((p) => <Project {...p} />)}
            </React.Fragment>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
