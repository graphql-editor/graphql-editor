import * as React from 'react';
import * as styles from './style/UI';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Loading } from './Loading';
import {
  DeleteProject,
  FakerDeployed,
  LoginToDoThis,
  CreateNamespace,
  OnBoarding,
  Tutorial
} from './popups';
import { TopBarMain } from './TopBarMain';
import { TopBarNewProject } from './TopBarNewProject';
type MenuCategory = {
  active: boolean;
  click: () => void;
};

export type UIProps = {
  code: MenuCategory;
  projects: MenuCategory;
  examples: MenuCategory;
};
export class UI extends React.Component<UIProps> {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <React.Fragment>
              {cloud.state.popup === 'onBoarding' && <OnBoarding />}
              {cloud.state.popup === 'createUser' && <CreateNamespace />}
              {cloud.state.popup === 'deleteProject' && <DeleteProject />}
              {cloud.state.popup === 'fakerDeployed' && <FakerDeployed />}
              {cloud.state.popup === 'loginToContinue' && <LoginToDoThis />}
              {cloud.state.popup === 'tutorial' && <Tutorial />}
              <div className={styles.UI}>
                {cloud.state.visibleMenu === 'projects' &&
                (cloud.state.category === 'new' || cloud.state.category === 'edit') ? (
                  <TopBarNewProject />
                ) : (
                  <TopBarMain
                    code={this.props.code}
                    projects={this.props.projects}
                    examples={this.props.examples}
                  />
                )}
                {cloud.state.loadingStack.length > 0 && (
                  <Loading
                    onDismiss={cloud.unStackAll}
                    text={cloud.state.loadingStack}
                    errors={cloud.state.errorStack}
                  />
                )}
                {this.props.children}
              </div>
            </React.Fragment>
          );
        }}
      </Subscribe>
    );
  }
}
