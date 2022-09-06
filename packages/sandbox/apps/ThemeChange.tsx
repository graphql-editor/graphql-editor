import React, { useEffect, useState } from 'react';
import { DarkTheme, GraphQLEditor, LightTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';

export const ThemeChange = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.food,
    libraries: '',
  });
  const [t, setT] = useState(LightTheme);
  useEffect(() => {
    setTimeout(() => setT(DarkTheme), 2000);
  }, []);
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
        theme={t}
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
