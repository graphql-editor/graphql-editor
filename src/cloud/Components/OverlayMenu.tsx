import * as React from 'react';
import { OverlayButton } from '../ui/OverlayButton';
import { Overlay } from '../ui/Overlay';
import { Subscribe, Provider } from 'unstated';
import { CloudContainer, Cloud } from '../Container';
import { Projects } from './Projects';
import { OverlaySubmit } from '../ui/OverlaySubmit';
import { OverlayAdd } from '../ui/OverlayAdd';
import { Project, State } from '../types/project';
import { Welcome } from '../ui/Welcome';
import { DisplayCurrent } from '../ui/DisplayCurrent';
import { Loading } from '../ui/Loading';

type ProjectFunction = (project: State<Project>) => void;

export type OverlayMenuProps = {
  deployProject: ProjectFunction;
  loadProject: ProjectFunction;
  deployFaker: ProjectFunction;
  removeProject: ProjectFunction;
};
type OverlayMenuState = {
  visible: boolean;
};

export class OverlayMenu extends React.Component<OverlayMenuProps, OverlayMenuState> {
  state: OverlayMenuState = {
    visible: true
  };
  componentDidMount() {}
  render() {
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
                {cloud.state.cloud.currentProject && (
                  <React.Fragment>
                    <OverlayButton
                      onClick={() => {
                        this.props.deployProject(cloud.state.cloud.currentProject);
                      }}
                    >{`save`}</OverlayButton>
                    <DisplayCurrent>{`${cloud.state.cloud.namespace.slug}/${
                      cloud.state.cloud.currentProject.name
                    }`}</DisplayCurrent>
                  </React.Fragment>
                )}
                <OverlayButton
                  onClick={() => {
                    this.setState({ visible: !this.state.visible });
                  }}
                >{`projects`}</OverlayButton>
              </div>
              {cloud.state.loadingStack.length > 0 && (
                <Loading text={cloud.state.loadingStack} errors={cloud.state.errorStack} />
              )}
              {this.state.visible && (
                <Overlay
                  onClose={() => {
                    this.setState({
                      visible: false
                    });
                  }}
                >
                  {!cloud.state.token && (
                    <React.Fragment>
                      <OverlaySubmit onSubmit={cloud.login} visible={true}>
                        Login/Sign up
                      </OverlaySubmit>
                    </React.Fragment>
                  )}
                  {cloud.state.token && (
                    <React.Fragment>
                      {!cloud.state.cloud.namespace && (
                        <OverlayAdd
                          placeholder="Name your namespace!"
                          onSubmit={(e) => {
                            cloud
                              .userApi()
                              .Mutation.createUser({
                                namespace: e
                              })({
                                namespace: {
                                  slug: true
                                }
                              })
                              .then((response) => {
                                cloud.setState({
                                  cloud: { ...cloud.state.cloud, namespace: response.namespace }
                                });
                              });
                          }}
                        />
                      )}
                      {cloud.state.cloud.namespace && (
                        <React.Fragment>
                          <Welcome>
                            {`Welcome, `}
                            <b>{`${cloud.state.cloud.namespace.slug}`}</b>
                            <i
                              onClick={cloud.logout}
                              style={{ cursor: 'pointer' }}
                            >{` - click here to logout`}</i>
                          </Welcome>
                          <Projects
                            closeOverlay={() => {
                              this.setState({
                                visible: false
                              });
                            }}
                            deployProject={this.props.deployProject}
                            loadProject={(project) => {
                              this.props.loadProject(project);
                              this.setState({ visible: false });
                            }}
                            deployFaker={this.props.deployFaker}
                            removeProject={this.props.removeProject}
                          />
                        </React.Fragment>
                      )}
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
