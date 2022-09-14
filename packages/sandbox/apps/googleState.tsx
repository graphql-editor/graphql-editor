//@ts-nocheck
import React, { useCallback, useState } from 'react';
import { GraphQLEditor, Colors, EditorRef } from 'graphql-editor';
import * as schemas from '../schema';
import { MainTheme, EditorRoutes } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';

export const googleState = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
    libraries: '',
  });

  const [s, setS] = useState<EditorRoutes>();

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
      <div
        onClick={() =>
          setS({
            pane: 'docs',
          })
        }
        style={{
          position: 'absolute',
          zIndex: 33,
          top: '10px',
          right: '10px',
          padding: '10px 24px',
          color: '#ffffff',
          cursor: 'pointer',
          background: Colors.blue,
        }}
      >
        Move to docs
      </div>
      <GraphQLEditor
        routeState={s}
        schema={currentSchema}
        sidebarExpanded
        onRouteChange={(r) => console.log(r)}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
        diffSchemas={{
          '1': schemas.googleDirectionsNew,
          '2': schemas.googleDirectionsOld,
        }}
      />
    </div>
  );
};
