import React, { useState } from 'react';
import { GraphQLEditor } from '@/index';
import { PassedSchema } from '@/Models';
import { DarkTheme } from '@/Theming/DarkTheme';
import * as schemas from '../schema';

export const libraries = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.finance,
    libraries: schemas.usersLibrary,
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
