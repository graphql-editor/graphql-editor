import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { style } from 'typestyle';
import { GraphQLEditor } from '../src/index';
import { PassedSchema } from '../src/Models';
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
export const Actions = style({
  width: 100,
  height: '100%',
});

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: '',
    libraries: '',
  });
  useEffect(() => {
    setTimeout(() => {
      setMySchema({
        code: schemas.errorSchema,
        libraries: '',
      });
    }, 1000);
  }, []);
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
        <button
          onClick={() => {
            // I should be able to create and center node from this button
          }}
        >
          Open menu
        </button>
        <button
          onClick={() => {
            // I should be able to create and center node from this button
          }}
        >
          New node
        </button>
      </div>
      {!hide && (
        <GraphQLEditor
          onSchemaChange={(props) => {
            setMySchema(props);
          }}
          initialSizeOfSidebar={'25vw'}
          schema={mySchema}
        />
      )}
    </div>
  );
};

render(<App />, document.getElementById('root'));
