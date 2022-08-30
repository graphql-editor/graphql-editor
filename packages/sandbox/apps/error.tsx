import React, { useState } from 'react';
import { GraphQLEditor, DarkTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';

export const error = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.errorSchema,
    libraries: '',
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
        theme={DarkTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};
