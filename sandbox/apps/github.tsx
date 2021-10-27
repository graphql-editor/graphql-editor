import React, { useState } from 'react';
import { PassedSchema } from '@/Models';
import * as schemas from '../schema';
import { GraphQLEditor, DarkTheme } from '@/index';

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
        theme={DarkTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};
