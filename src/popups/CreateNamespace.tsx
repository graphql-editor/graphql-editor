import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
type CreateNamespaceState = {
  name: string;
  public: boolean;
};
export class CreateNamespace extends React.Component<{}, CreateNamespaceState> {
  state: CreateNamespaceState = {
    name: '',
    public: true
  };
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
                  variant={'GreenMidFull'}
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
