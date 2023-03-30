import React, { useEffect, useState } from 'react';
import {
  GraphQLEditor,
  Colors,
  PassedSchema,
  EditorRoutes,
} from 'graphql-editor';
import * as schemas from '../schema';
import { useRouter } from 'helpers/FakeRouter';
import { ActivePane } from 'graphql-editor/lib/editor/menu/Menu';

const buttonStyle = {
  position: 'absolute',
  zIndex: 33,
  top: '65px',
  right: '15px',
  padding: '10px',
  color: '#ffffff',
  cursor: 'pointer',
  borderRadius: 4,
  backgroundColor: Colors.blue,
} as const;

export const googleState = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
    libraries: '',
  });

  const [editorRoutes, setEditorRoutes] = useState<EditorRoutes>();
  const {
    changeRoute,
    path: { code, pane, n },
  } = useRouter();

  useEffect(() => {
    setEditorRoutes({
      code: code as 'on' | 'off' | undefined,
      pane: pane as ActivePane | undefined,
      n,
    });
  }, [code, pane, n]);

  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const u = new URL(window.location.href);
      u.searchParams.toString();
    };
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
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
      <div
        onClick={() =>
          changeRoute({
            pane: 'relation',
            n: '7f6954ab88b8c',
            code: 'on',
          })
        }
        style={{
          ...buttonStyle,
        }}
      >
        select node
      </div>
      <div
        onClick={() =>
          changeRoute({
            pane: 'relation',
            n: undefined,
            code: 'on',
          })
        }
        style={{
          ...buttonStyle,
          backgroundColor: Colors.orange,
          right: '130px',
        }}
      >
        deselect node
      </div>
      <GraphQLEditor
        routeState={editorRoutes}
        schema={currentSchema}
        onRouteChange={(routes) => {
          changeRoute({ a: 'googleState', ...routes });
        }}
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

googleState.description =
  'Google Directions GraphQL Schema. Contains diffs and router.';
