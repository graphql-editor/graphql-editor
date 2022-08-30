import React, { useState } from 'react';
import { GraphQLEditor, DarkTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';

export const libraries = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.finance,
    libraries: schemas.usersLibraryNew,
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
        sidebarExpanded
        setSchema={(props) => {
          setMySchema(props);
        }}
        diffSchemas={{
          newSchema: {
            code: schemas.finance,
            libraries: schemas.usersLibraryNew,
          },
          oldSchema: {
            code: schemas.finance,
            libraries: schemas.usersLibraryOld,
          },
        }}
        schema={mySchema}
      />
    </div>
  );
};
