import * as React from 'react';
import { Editor } from '../../src';
import { LoadedFile, NodeType, LinkType } from '@slothking-online/diagram';
export type HomeState = {
  code: string;
  codeVisible: boolean;
  loaded: LoadedFile;
  nodes: Array<NodeType>;
  links: Array<LinkType>;
  tabs?: Array<string>;
};

export class Home extends React.Component<{}, HomeState> {
  state: HomeState = {
    code: '',
    nodes: [],
    links: [],
    loaded: {
      nodes: [],
      links: []
    },
    codeVisible: true
  };
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          backgroundColor: '#444444',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Editor
          code={this.state.code}
          editorVisible={this.state.codeVisible}
          nodes={this.state.nodes}
          links={this.state.links}
          loaded={this.state.loaded}
          tabs={this.state.tabs}
          result={(props) => {
            this.setState({
              ...props
            });
          }}
          remakeNodes={(nodes, links, code) => {
            this.setState({ nodes, links, code });
          }}
        />
      </div>
    );
  }
}
