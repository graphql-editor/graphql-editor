import cx from 'classnames';
import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../cloud/Container';
import * as styles from '../cloud/style/Home';
import { UI } from '../cloud/ui/UI';
import { Editor } from '../../src';
import { Projects } from '../cloud/ui/Projects';
import { Analytics } from '../cloud/analytics';
export type HomeState = {
  projectId?: string;
  code: string;
};

export class Home extends React.Component<{}, HomeState> {
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
                    cloud.setState({
                      visibleMenu: cloud.state.visibleMenu === 'code' ? null : 'code'
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
                        .then(cloud.loadExamples);
                      return;
                    }
                    cloud
                      .setState((state) => ({
                        category: 'my',
                        visibleMenu: cloud.state.visibleMenu === 'projects' ? null : 'projects'
                      }))
                      .then(cloud.loadExamples);
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
                      .then(cloud.loadExamples);
                  }
                }}
              >
                {cloud.state.visibleMenu === 'projects' && <Projects />}

                <Editor
                  code={cloud.state.code}
                  editorVisible={cloud.state.visibleMenu === 'code'}
                  nodes={cloud.state.nodes}
                  links={cloud.state.links}
                  loaded={cloud.state.loaded}
                  tabs={cloud.state.tabs}
                  result={cloud.setNodes}
                  copiedToClipboard={() => {
                    Analytics.events.code({
                      action: 'copyToClipboard'
                    });
                  }}
                  schemaChanged={(schema) => {
                    Analytics.events.code({
                      action: 'edit'
                    });
                  }}
                  languageChanged={(label)=>{
                    Analytics.events.code({
                      action: 'select',
                      label
                    });}}
                  remakeNodes={(nodes, links, code) => {
                    cloud
                      .setNodes({
                        nodes,
                        links,
                        code
                      })
                      .then(() =>
                        cloud.setState({
                          loaded: {
                            nodes,
                            links
                          }
                        })
                      );
                  }}
                />
              </UI>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
