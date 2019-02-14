import * as React from 'react';
import { render } from 'react-dom';
import { Editor } from '../src/index';

class App extends React.Component<
  {},
  {
    editorVisible: boolean;
  }
> {
  state = {
    editorVisible: true
  };
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: this.state.editorVisible ? `auto 1fr` : '1fr',
          gridTemplateRows: '1fr'
        }}
      >
        <Editor editorVisible={this.state.editorVisible} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
