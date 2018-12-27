import * as React from 'react';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Editor } from '../../src';
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
            <div
              style={{
                backgroundColor: '#444444',
                position: 'relative',
                width: '100%',
                height: '100%',
                paddingLeft: 0,
                transition: 'padding-left 0.12s linear'
              }}
            >
              <Editor
                code={cloud.state.code}
                editorVisible={true}
                nodes={cloud.state.nodes}
                links={cloud.state.links}
                loaded={cloud.state.loaded}
                tabs={cloud.state.tabs}
                result={cloud.setNodes}
                copiedToClipboard={() => {}}
                schemaChanged={(schema) => {}}
                languageChanged={(label) => {}}
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
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
