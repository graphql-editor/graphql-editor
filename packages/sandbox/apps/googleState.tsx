import React, { useEffect, useState, useRef } from 'react';
import { GraphQLEditor, Colors } from 'graphql-editor';
import * as schemas from '../schema';
import { EditorRoutes } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import { useRouter } from 'helpers/FakeRouter';

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
  const firstRoute = useRef(true);
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
    libraries: '',
  });

  const [editorRoutes, setEditorRoutes] = useState<EditorRoutes>();
  const {
    changeRoute,
    path: { pane, n, code },
  } = useRouter();

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
          setEditorRoutes({
            pane: 'relation',
            n: '13bfdf3bad4d8d',
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
          setEditorRoutes({
            pane: 'relation',
            n: '',
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
        sidebarExpanded
        onRouteChange={(routes) => {
          if (!routes) return;
          if (firstRoute.current) {
            firstRoute.current = false;
            if (pane || n || code)
              setEditorRoutes({ pane, n, code } as EditorRoutes);
            return;
          }
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
