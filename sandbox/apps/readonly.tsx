import React, { useState } from 'react';
import { GraphQLEditor, DarkTheme } from '@/index';
import { PassedSchema } from '@/Models';
import * as schemas from '../schema';

export const readonly = () => {
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
        theme={DarkTheme}
        readonly
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};
