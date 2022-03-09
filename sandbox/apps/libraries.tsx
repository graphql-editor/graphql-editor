import React, { useState } from 'react';
import { GraphQLEditor, DarkTheme } from '@/index';
import { PassedSchema } from '@/Models';
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
