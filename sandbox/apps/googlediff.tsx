import React from 'react';
import { GraphQLEditor } from '@/index';
import { DarkTheme } from '@/Theming/DarkTheme';
import * as schemas from '../schema';

export const googlediff = () => {
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
        schema={{ code: schemas.googleDirectionsNew }}
        setSchema={() => {}}
        diffSchemas={{
          newSchema: {
            code: schemas.googleDirectionsNew,
          },
          oldSchema: {
            code: schemas.googleDirectionsOld,
          },
        }}
      />
    </div>
  );
};
