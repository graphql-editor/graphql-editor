import React, { useEffect, useState } from 'react';
import { GraphQLEditor } from '@/index';
import { PassedSchema } from '@/Models';
import { DarkTheme } from '@/Theming/DarkTheme';
import * as schemas from '../schema';

export const SetSchema = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: '',
    libraries: '',
  });
  const [magicNumber, setMagicNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setMagicNumber(100);
    }, 2000);
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
        theme={DarkTheme}
        setSchema={(props) => {
          console.log(magicNumber);
          setMySchema({
            code: props.code,
            libraries: props.libraries,
          });
        }}
        diffSchemas={{
          newSchema: { code: schemas.versionedUsersLibraryLatest },
          oldSchema: { code: schemas.versionedUsersLibrary01 },
        }}
        schema={mySchema}
      />
    </div>
  );
};
