import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
import { Analytics } from '../analytics';
type CreateProjectState = {
  name: string;
  public: boolean;
};
export class CreateProject extends React.Component<{}, CreateProjectState> {
  state: CreateProjectState = {
    name: '',
    public: true
  };
  
  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'createProject'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Create project</h2>
              <h3>Stored in GraphQL Editor Cloud</h3>
              <VerticalSpacer height={50} />
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
                  variant={'PinkFull'}
                  big
                  disabled={this.state.name ? undefined : 'Please type any name'}
                  onClick={() => {
                    cloud.closePopup();
                    cloud
                      .createProject(this.state.name, this.state.public)
                  }}
                >
                  Create new project +
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
