import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import { MainTheme } from 'graphql-editor';

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
          setMySchema({
            code: props.code,
            libraries: props.libraries,
          });
        }}
        schema={mySchema}
      />
    </div>
  );
};
