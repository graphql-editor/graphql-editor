import * as React from 'react';
import { render } from 'react-dom';
import { style } from 'typestyle';
import { Editor } from '../src/index';

export const Full = style({
  backgroundColor: '#444444',
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingLeft: 0,
  transition: 'padding-left 0.12s linear'
});

export const UiDiagram = style({
  flex: 1,
  width: '100%',
  height: '100%',
  alignSelf: 'stretch',
  display: 'flex'
});
export const UIDiagramFull = style({
  marginLeft: '-100vh'
});

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
      <div className={UiDiagram}>
        <Editor
          schema={`

        type Query{
          hello: String!
        }

        schema{
          query: Query
        }

        `}
          editorVisible={this.state.editorVisible}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
