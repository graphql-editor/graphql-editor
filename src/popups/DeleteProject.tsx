import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
export type DeleteProjectState = {
  name: string;
};
export class DeleteProject extends React.Component<{}, DeleteProjectState> {
  state: DeleteProjectState = { name: '' };
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Delete project</h2>
              <VerticalSpacer height={50} />
              <p>
                Are you sure? you want to delete project <b>{cloud.state.removedProject.name}</b>?
                If yes please rewrite its name below.
              </p>
              <input
                type="text"
                placeholder="Project name..."
                value={this.state.name}
                onChange={(e) =>
                  this.setState({
                    name: e.target.value
                  })
                }
              />
              <VerticalSpacer height={50} />
              <Actions>
                <TopButton
                  variant={'RedFull'}
                  big
                  disabled={
                    this.state.name === cloud.state.removedProject.name
                      ? undefined
                      : 'Please type any name'
                  }
                  onClick={() => {
                    cloud.closePopup();
                    cloud.removeProject(cloud.state.removedProject);
                  }}
                >
                  Delete project
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
