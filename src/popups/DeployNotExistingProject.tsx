import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
import { Analytics } from '../cloud/analytics';
type DeployNotExistingProjectState = {
  name: string;
  public: boolean;
};
export class DeployNotExistingProject extends React.Component<{}, DeployNotExistingProjectState> {
  state: DeployNotExistingProjectState = {
    name: '',
    public: true
  };

  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'deployNotExistingProject'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Save new project</h2>
              <h3>Stored in GraphQL Editor Cloud</h3>
              <VerticalSpacer height={20} />
              <p>Create and save project before you deploy to faker cloud </p>
              <VerticalSpacer height={20} />
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
                  variant={'GreenMidFull'}
                  big
                  disabled={this.state.name ? undefined : 'Please type any name'}
                  onClick={() => {
                    cloud.closePopup();
                    cloud
                      .createProject(this.state.name, this.state.public)
                      .then(cloud.saveProject)
                      .then(cloud.fakerDeployProject)
                      .then(() => {
                        cloud.setState({
                          popup: 'fakerDeployed'
                        });
                      });
                  }}
                >
                  Create and save
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
