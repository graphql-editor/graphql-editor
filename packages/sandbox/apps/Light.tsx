import React, { useState } from 'react';
import { GraphQLEditor, LightTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';

export const Light = () => {
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
        theme={LightTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        diffSchemas={{
          newSchema: { code: schemas.versionedUsersLibraryLatest },
          oldSchema: { code: schemas.versionedUsersLibrary01 },
        }}
        schema={mySchema}
      />
    </div>
  );
};
