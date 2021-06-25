import React from 'react';
import { GraphQLEditor } from '@/index';
import { DarkTheme } from '@/Theming/DarkTheme';
import * as schemas from '../schema';

export const diff = () => {
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
        schema={{ code: schemas.versionedUsersLibraryLatest }}
        setSchema={() => {}}
        diffSchemas={{
          newSchema: {
            code: schemas.versionedUsersLibraryLatest,
          },
          oldSchema: {
            code: schemas.versionedUsersLibrary01,
          },
        }}
      />
    </div>
  );
};
