import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Popup, Actions } from '../ui/Popup';
import { TopButton } from '../ui/TopButton';
import { Logo } from '../ui/Logo';
import { VerticalSpacer } from '../ui/VerticalSpacer';
import { HorizontalSpacer } from '../ui/HorizontalSpacer';
import { Analytics } from '../analytics';
export class OnBoarding extends React.Component {
  componentDidMount(){
    Analytics.events.ui({
      action:'open',
      label:'onboarding'
    })
  }
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <Popup onClose={() => cloud.setState({ popup: null })}>
              <Logo height={60} />
              <VerticalSpacer height={50} />
              <p>
                Create your first project with an already implemented <b>mock backend</b> from{' '}
                <b>GraphQL </b>
                code. Enter the future of the backend and frontend design now!
              </p>
              <VerticalSpacer height={50} />
              <Actions>
                <TopButton
                  variant={'GreenMidFull'}
                  big
                  onClick={() => {
                    Analytics.events.ui({
                      label:'Onboarding create new project',
                      action:'click'
                    })
                    if (!cloud.state.token) {
                      cloud.setState({
                        popup: 'loginToContinue'
                      });
                      return;
                    }
                    cloud.setState({
                      popup: 'createProject'
                    });
                  }}
                >
                  Create new project +
                </TopButton>
                <HorizontalSpacer />
                <TopButton
                  big
                  variant={'PinkFull'}
                  onClick={() => {
                    Analytics.events.ui({
                      label:'Onboarding open examples',
                      action:'click'
                    })
                    cloud
                      .setState({
                        visibleMenu: 'projects',
                        category: 'examples',
                        popup: null
                      })
                      .then(cloud.loadExamples);
                  }}
                >
                  Explore examples
                </TopButton>
              </Actions>
            </Popup>
          );
        }}
      </Subscribe>
    );
  }
}
