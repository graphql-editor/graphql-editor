//@ts-nocheck
import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';
import * as schemas from '../schema';
import { MainTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';

export const googlediff = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
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
        schema={currentSchema}
        sidebarExpanded
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
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
