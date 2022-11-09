import React, { useState } from 'react';
import { MainTheme, PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';
import { GraphQLEditor } from 'graphql-editor';

export const github = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.github,
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

github.description = 'Github GraphQL API v4 full schema.';
