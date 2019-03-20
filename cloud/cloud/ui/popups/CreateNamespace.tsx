import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../../Container';
import { Analytics } from '../../analytics';
import { Actions, Popup, VerticalSpacer, TopButton } from '../components';
type CreateNamespaceState = {
  name: string;
  public: boolean;
};
export class CreateNamespace extends React.Component<{}, CreateNamespaceState> {
  state: CreateNamespaceState = {
    name: '',
    public: true
  };

  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'createNamespace'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup>
              <h2>Create namespace</h2>
              <h3>You have to create your username</h3>
              <VerticalSpacer height={50} />
              <input
                type="text"
                placeholder="Namespace name..."
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
                    cloud.createUser(this.state.name);
                  }}
                >
                  Create namespace
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
