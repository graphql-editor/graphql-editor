import React, { useState } from 'react';
import { render } from 'react-dom';
import { GraphQLEditor } from '../src/index';
import { PassedSchema } from '../src/Models';
import * as schemas from './schema';

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary,
  });
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        setSchema={(props) => {
          console.log(props);
          console.log('SCHEMA CHANGED');
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
