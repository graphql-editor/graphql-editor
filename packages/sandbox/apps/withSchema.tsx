import React, { useState } from 'react';
import { MainTheme, PassedSchema, GraphQLEditor } from 'graphql-editor';
import * as schemas from '../schema';

export const withSchema = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.food,
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
        theme={MainTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

withSchema.description = 'Part schema of a big delivery service Deliverer.';
