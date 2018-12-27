import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Popup, Actions } from '../ui/Popup';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
import { Analytics } from '../analytics';
type LoadFromURLState = {
  name: string;
};
export class LoadFromURL extends React.Component<{}, LoadFromURLState> {
  state: LoadFromURLState = {
    name: ''
  };
  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'loadFromURL'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Load project</h2>
              <h3>Load project from existing GraphQL endpoint</h3>
              <VerticalSpacer height={50} />
              <input
                type="text"
                className="url"
                placeholder="GraphQL URL..."
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
                    cloud.loadFromURL(this.state.name);
                  }}
                >
                  Load project
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
