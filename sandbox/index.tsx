import React, { useState } from 'react';
import { render } from 'react-dom';
import { style } from 'typestyle';
import { Editor } from '../src/index';
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
  const [mySchema] = useState({
    code: `type Person{ 
      """
        description of name
          dsdas 
            sad incorre
            dsad
            sad
      """
      name: String
     }
     
     extend type User{
       password: String!
     }
     `,
    libraries: `
     type User{
       name: String
     }
     `,
  });
  const [hide, setHide] = useState(false);
  return (
    <div className={UiDiagram}>
      <div className={Actions}>
        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          hide
        </button>
        <button onClick={() => {}}>code</button>
      </div>
      {!hide && <Editor readonly initialSizeOfSidebar={'25vw'} schema={mySchema} />}
    </div>
  );
};

render(<App />, document.getElementById('root'));
