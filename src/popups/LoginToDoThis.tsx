import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { Popup, Actions } from '../ui/Popup';
// import { VerticalSpacer } from '../ui/VerticalSpacer';
import { TopButton } from '../ui/TopButton';
import { Analytics } from '../cloud/analytics';
export class LoginToDoThis extends React.Component {
  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'loginToDoThis'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <h2>Login</h2>
              <h3>to GraphQL Editor Cloud</h3>
              <p>Please login/create account to perform this action</p>
              <Actions>
                <TopButton variant={'PinkFull'} big onClick={cloud.login}>
                  Login
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
