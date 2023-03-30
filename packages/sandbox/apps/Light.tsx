import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';
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
        setSchema={(props) => {
          setMySchema(props);
        }}
        diffSchemas={{
          '1': schemas.versionedUsersLibraryLatest,
          '2': schemas.versionedUsersLibrary01,
        }}
        schema={mySchema}
      />
    </div>
  );
};

Light.description =
  'Part schema of a big delivery service Deliverer in Light theme';
