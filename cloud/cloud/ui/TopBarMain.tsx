import * as React from 'react';
import { TopButton } from './TopButton';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { TopBarIcon } from './components/Icon';
import { TopBarCustom } from './TopBarCustom';
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
                    name="burger"
                    hint="projects"
                    active={this.props.projects.active}
                    onClick={this.props.projects.click}
                  />
                  <TopBarIcon
                    name="terminal"
                    hint="code"
                    active={this.props.code.active}
                    onClick={this.props.code.click}
                  />
                  <TopBarIcon name="examples" hint="examples" onClick={this.props.examples.click} />
                  <TopBarIcon
                    blank
                    name="docs"
                    hint="docs"
                    href={'https://docs.graphqleditor.com'}
                  />
                </>
              }
              center={cloud.getCurrentProjectName()}
              right={
                <>
                  {cloud.state.token ? (
                    <>
                      <TopBarIcon name="logout" hint="logout" right onClick={cloud.logout} />
                      <TopBarIcon
                        name="user"
                        right
                        hint="soon"
                        onClick={() => {
                          'A';
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <TopButton top variant={'Pink'} onClick={cloud.login}>
                        Login
                      </TopButton>
                    </>
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
