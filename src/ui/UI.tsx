import * as React from 'react';
import { TopButton } from './TopButton';
import * as styles from '../style/UI';
import { HorizontalSpacer } from './HorizontalSpacer';
import { VerticalSpacer } from './VerticalSpacer';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import { Popup, Actions } from './Popup';
import { Logo } from './Logo';
import { State, Project } from '../cloud/types/project';
import { Loading } from '../cloud/ui/Loading';

type MenuCategory = {
  active: boolean;
  click: () => void;
};

export type UIProps = {
  code: MenuCategory;
  projects: MenuCategory;
  examples: MenuCategory;
};
export type UIState = {
  project?: State<Project>;
};
export class UI extends React.Component<UIProps, UIState> {
  state: UIState = {
    project: {
      name: '',
      public: true
    }
  };
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          const { currentProject } = cloud.state.cloud;
          return (
            <React.Fragment>
              {cloud.state.loadingStack.length > 0 && (
                <Loading text={cloud.state.loadingStack} errors={cloud.state.errorStack} />
              )}
              {cloud.state.popup === 'onBoarding' && (
                <Popup onClose={() => cloud.setState({ popup: null })}>
                  <Logo height={60} />
                  <VerticalSpacer height={50} />
                  <p>
                    Start designing unified systems and enter the future of backend/frontend
                    definition design and <b>deploy mock backends</b> from <b>GraphQL</b> code in
                    minutes.
                  </p>
                  <VerticalSpacer height={50} />
                  <Actions>
                    <TopButton
                      variant={'GreenMidFull'}
                      big
                      onClick={() => {
                        if (!cloud.state.token) {
                          cloud.login();
                        }
                        cloud.setState({
                          popup: 'createProject'
                        });
                      }}
                    >
                      Create new project
                    </TopButton>
                    <HorizontalSpacer />
                    <TopButton
                      big
                      variant={'PinkFull'}
                      onClick={() => {
                        cloud
                          .setState((state) => ({
                            popup: null
                          }))
                          .then(this.props.examples.click);
                      }}
                    >
                      Explore examples
                    </TopButton>
                  </Actions>
                </Popup>
              )}
              {cloud.state.popup === 'createProject' && (
                <Popup onClose={() => cloud.setState({ popup: null })}>
                  <h2>Create project</h2>
                  <h3>Stored in GraphQL Editor Cloud</h3>
                  <VerticalSpacer height={50} />
                  <input
                    type="text"
                    placeholder="Project name..."
                    value={this.state.project.name}
                    onChange={(e) =>
                      this.setState({
                        project: {
                          ...this.state.project,
                          name: e.target.value
                        }
                      })
                    }
                  />
                  <VerticalSpacer height={50} />
                  <Actions>
                    <TopButton
                      variant={'GreenMidFull'}
                      big
                      onClick={() => {
                        if (!cloud.state.token) {
                          cloud.login();
                          return;
                        }
                      }}
                    >
                      Create new project
                    </TopButton>
                  </Actions>
                </Popup>
              )}
              <div className={styles.UI}>
                <div className={styles.TopBar}>
                  <div className={styles.Left}>
                    <TopButton
                      active={this.props.code.active}
                      variant={'Pink'}
                      onClick={this.props.code.click}
                    >
                      code
                    </TopButton>
                    <HorizontalSpacer />
                    <TopButton
                      active={this.props.projects.active}
                      variant={'Pink'}
                      onClick={this.props.projects.click}
                    >
                      projects
                    </TopButton>
                    <HorizontalSpacer />
                    <TopButton
                      variant={'Pink'}
                      onClick={() => {
                        this.props.examples.click();
                      }}
                    >
                      examples
                    </TopButton>
                  </div>
                  {currentProject && (
                    <div className={styles.Center}>{currentProject.endpoint.uri}</div>
                  )}
                  <div className={styles.Right}>
                    {cloud.state.cloud.currentProject && (
                      <TopButton variant={'Yellow'} onClick={cloud.saveProject}>
                        Save
                      </TopButton>
                    )}
                    <HorizontalSpacer />
                    <TopButton variant={'Deploy'} onClick={() => {}}>
                      Mock Backend
                      <img
                        style={{
                          height: 16,
                          marginLeft: 6
                        }}
                        src={require('../assets/export/rocketIcon.png')}
                      />
                    </TopButton>
                  </div>
                </div>
                {this.props.children}
              </div>
            </React.Fragment>
          );
        }}
      </Subscribe>
    );
  }
}
