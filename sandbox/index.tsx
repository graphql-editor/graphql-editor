import React, { useState } from 'react';
import { render } from 'react-dom';
import { style } from 'typestyle';
import { Editor } from '../src/index';
import { ActivePane } from '../src/editor/Menu';
export const Full = style({
  backgroundColor: '#444444',
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingLeft: 0,
  transition: 'padding-left 0.12s linear',
});

export const UiDiagram = style({
  flex: 1,
  width: '100%',
  height: '100%',
  alignSelf: 'stretch',
  display: 'flex',
  position: 'relative',
});
export const UIDiagramFull = style({
  marginLeft: '-100vh',
});
export const Actions = style({
  width: 100,
  height: '100%',
});

export const App = () => {
  const [activePane, setActivePane] = useState<ActivePane>('code-diagram');
  const [mySchema, setMySchema] = useState({
    code: `type Person{ 
      """
        description of name
          dsdas 
            sad incorre
            dsad
            sad
      """
      name: String
     }`,
  });
  const [hide, setHide] = useState(false);
  return (
    <div className={UiDiagram}>
      <div className={Actions}>
        <button
          onClick={() => {
            setHide(!hide);
            setMySchema({
              code: `
            scalar URL
            scalar Pizza
            `,
            });
          }}
        >
          hide
        </button>
        <button
          onClick={() => {
            setActivePane('code');
          }}
        >
          code
        </button>
      </div>
      {!hide && <Editor initialSizeOfSidebar={'25vw'} activePane={activePane} schema={mySchema} />}
    </div>
  );
};

render(<App />, document.getElementById('root'));
