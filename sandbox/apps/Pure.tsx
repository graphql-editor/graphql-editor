import React, { useState } from 'react';
import { GraphQLEditor } from '@/index';
import { PassedSchema } from '@/Models';
import { MainTheme } from '@/gshared/theme/MainTheme';

export const Pure = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: '',
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
