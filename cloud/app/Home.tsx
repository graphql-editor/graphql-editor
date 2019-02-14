import cx from 'classnames';
import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import * as styles from '../cloud/style/Home';
import { UI } from '../cloud/ui/UI';
import { Editor } from '../../src';
import { Projects } from '../cloud/ui/Projects';
import Intercom from 'react-intercom';
import { GraphController } from '../../src/Graph';

export type HomeState = {
  projectId?: string;
  code: string;
};

export class Home extends React.Component<{}, HomeState> {
  graphController: GraphController;
  state: HomeState = {
    projectId: null,
    code: ''
  };
  componentDidMount() {}
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <div className={cx(styles.Full)}>
              <UI
                code={{
                  active: cloud.state.visibleMenu === 'code',
                  click: () =>
                    cloud
                      .setState({
                        visibleMenu: cloud.state.visibleMenu === 'code' ? null : 'code'
                      })
                      .then(() => {
                        this.graphController.resizeDiagram();
                      })
                }}
                projects={{
                  active: cloud.state.visibleMenu === 'projects',
                  click: () => {
                    if (!cloud.state.token) {
                      cloud
                        .setState((state) => ({
                          category: 'examples',
                          visibleMenu: cloud.state.visibleMenu === 'projects' ? null : 'projects'
                        }))
                        .then(cloud.loadExamples)
                        .then(() => {
                          this.graphController.resizeDiagram();
                        });
                      return;
                    }
                    cloud
                      .setState((state) => ({
                        category: 'my',
                        visibleMenu: cloud.state.visibleMenu === 'projects' ? null : 'projects'
                      }))
                      .then(cloud.loadExamples)
                      .then(() => {
                        this.graphController.resizeDiagram();
                      });
                  }
                }}
                examples={{
                  active: true,
                  click: () => {
                    cloud
                      .setState({
                        visibleMenu: 'projects',
                        category: 'examples'
                      })
                      .then(cloud.loadExamples)
                      .then(() => {
                        this.graphController.resizeDiagram();
                      });
                  }
                }}
              >
                <div
                  className={cx({
                    [styles.UiDiagram]: true,
                    [styles.UIDiagramFull]: !cloud.state.visibleMenu
                  })}
                >
                  {cloud.state.visibleMenu === 'projects' && <Projects />}
                  <Editor
                    graphController={(controller) => {
                      this.graphController = controller;
                      Cloud.setController(controller);
                    }}
                    editorVisible={cloud.state.visibleMenu === 'code'}
                  />
                </div>
              </UI>
              <Intercom appID="k0lckhv8" user_id={cloud.state.user && cloud.state.user.id} />
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
