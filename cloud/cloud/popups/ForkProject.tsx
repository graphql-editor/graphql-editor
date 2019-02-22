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
export type ForkProjectProps = {
  name: string;
};
export class ForkProject extends React.Component<
  ForkProjectProps,
  CreateProjectState
> {
  state: CreateProjectState = {
    name: null,
    public: true
  };
  static getDerivedStateFromProps(props: ForkProjectProps, state: CreateProjectState) {
    if (props.name && state.name === null) {
      return { name: props.name };
    }
    return null;
  }
  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'ForkProject'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Save project</h2>
              <h3>Stored in GraphQL Editor Cloud</h3>
              <VerticalSpacer height={30} />
              <p>
                This project does not belong to you. Do you want to create a copy and save it to
                your account?
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
                  variant={'PinkFull'}
                  big
                  disabled={this.state.name ? undefined : 'Please type any name'}
                  onClick={() => {
                    cloud.closePopup();
                    cloud.createProject(this.state.name, this.state.public).then(cloud.saveProject);
                  }}
                >
                  Save project
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
