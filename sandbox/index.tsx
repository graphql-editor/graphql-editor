import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { style } from 'typestyle';
import { Editor } from '../src/index';
import * as schemas from './schema';
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

export const App = () => {
  const [editorVisible] = useState(true);
  const [mySchema, setMySchema] = useState('');
  const [libraries, setLibraries] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setLibraries('scalar URLI');
      setMySchema(schemas.nullInput);
    }, 1000);
  }, []);
  return (
    <div className={UiDiagram}>
      <Editor
        schema={{
          code: mySchema,
          libraries,
        }}
        editorVisible={editorVisible}
        graphController={(g) => {
          g.setOnSerialise((schema) => {
            console.log('Serialising');
            setMySchema(schema);
          });
        }}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
