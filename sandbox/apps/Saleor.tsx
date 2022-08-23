import React, { useState } from 'react';
import { PassedSchema } from '@/Models';
import * as schemas from '../schema';
import { GraphQLEditor, FrozenTheme } from '@/index';

export const Saleor = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.saleor,
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
        theme={FrozenTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};
