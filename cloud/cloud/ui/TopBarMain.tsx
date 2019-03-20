import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { TopBarIcon } from './components';
import { TopBarCustom } from './TopBarCustom';
import { TopMenu } from './TopMenu';
type MenuCategory = {
  active: boolean;
  click: () => void;
};

export type TopBarMainProps = {
  code: MenuCategory;
  projects: MenuCategory;
  examples: MenuCategory;
};
export class TopBarMain extends React.Component<TopBarMainProps> {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          const { currentProject } = cloud.state;
          return (
            <TopBarCustom
              left={
                <>
                  <TopBarIcon
                    name="examples"
                    hint="projects"
                    active={this.props.projects.active}
                    onClick={this.props.projects.click}
                  />
                  <TopBarIcon
                    name="lC"
                    hint="code"
                    active={this.props.code.active}
                    onClick={this.props.code.click}
                  />
                  <TopBarIcon
                    blank
                    name="docs"
                    hint="docs"
                    href={'https://docs.graphqleditor.com'}
                  />
                </>
              }
              center={
                <>
                  <span>{cloud.getCurrentProjectName()}</span>
                  <TopMenu />
                </>
              }
              right={
                <>
                  {cloud.state.token ? (
                    <TopBarIcon name="logout" hint="logout" right onClick={cloud.logout} />
                  ) : (
                    <TopBarIcon right name="login" hint="Login" onClick={cloud.login} />
                  )}
                  {currentProject && currentProject.faker && (
                    <>
                      <TopBarIcon
                        right
                        name="cloud"
                        hint="GraphiQL Faker"
                        blank
                        onClick={() => {
                          Analytics.events.faker({
                            action: 'openMyProjectURL'
                          });
                        }}
                        href={cloud.getFakerURL()}
                      />
                    </>
                  )}

                  {currentProject && currentProject.cloud && cloud.canIEditCurrentProject() && (
                    <TopBarIcon
                      name="thunder"
                      hint="deploy"
                      right
                      onClick={() => {
                        if (!cloud.state.token) {
                          cloud.setState({
                            popup: 'loginToContinue'
                          });
                          return;
                        }
                        cloud.fakerDeployProject().then(() =>
                          cloud.setState({
                            popup: 'fakerDeployed'
                          })
                        );
                        return;
                      }}
                    />
                  )}
                </>
              }
            />
          );
        }}
      </Subscribe>
    );
  }
}
