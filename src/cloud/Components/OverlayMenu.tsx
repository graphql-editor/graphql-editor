import * as React from 'react';
import { OverlayButton } from '../ui/OverlayButton';
import { Overlay } from '../ui/Overlay';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Projects } from './Projects';
import { OverlaySubmit } from '../ui/OverlaySubmit';
import { OverlayAdd } from '../ui/OverlayAdd';

const ROUTES = {
  projects: Projects
};
type OverlayMenuState = {
  visible: boolean;
  route: keyof typeof ROUTES;
};

export class OverlayMenu extends React.Component<{}, OverlayMenuState> {
  state: OverlayMenuState = {
    visible: false,
    route: 'projects'
  };
  render() {
    const CurrentComponent = ROUTES[this.state.route];
    return (
      <Provider inject={[Cloud]}>
        <Subscribe to={[CloudContainer]}>
          {(cloud: typeof Cloud) => (
            <React.Fragment>
              <div
                style={{
                  display: this.state.visible ? 'none' : 'block',
                  position: 'absolute',
                  right: 10,
                  bottom: 10
                }}
              >
                <OverlayButton
                  onClick={() => {
                    this.setState({ visible: !this.state.visible });
                  }}
                >{`projects`}</OverlayButton>
              </div>
              {!this.state.visible && (
                <Overlay>
                  {!cloud.state.token && (
                    <React.Fragment>
                      <OverlaySubmit onSubmit={cloud.login} visible={true}>
                        Login/Sign up
                      </OverlaySubmit>
                    </React.Fragment>
                  )}
                  {cloud.state.token && (
                    <React.Fragment>
                      {!cloud.state.namespace && (
                        <OverlayAdd
                          placeholder="Add your namespace( your base username )..."
                          onSubmit={(e) => {
                            cloud.userApi.Mutation.createUser({
                              namespace: e
                            })({
                              namespace: {
                                slug: true
                              }
                            }).then((response) => {
                              cloud.setState({ namespace: response.namespace });
                            });
                          }}
                        />
                      )}
                      {cloud.state.namespace && <CurrentComponent />}
                    </React.Fragment>
                  )}
                </Overlay>
              )}
            </React.Fragment>
          )}
        </Subscribe>
      </Provider>
    );
  }
}
