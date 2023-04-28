import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  GraphQLEditor,
  ExternalEditorAPI,
  Colors,
  PassedSchema,
  EditorRoutes,
} from 'graphql-editor';
import * as schemas from '../schema';

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
    code: schemas.billabeeSchema,
    libraries: '',
  });
  const [, setR] = useState<EditorRoutes>({ code: 'on', pane: 'relation' });
  const [n, setN] = useState<string>();

  const editorRef = useRef<ExternalEditorAPI>();

  useEffect(() => {
    editorRef.current.selectNode(n);
  }, [n]);

  const memoedEditor = useMemo(() => {
    return (
      <GraphQLEditor
        schema={currentSchema}
        ref={editorRef}
        onNodeSelect={(n) => {
          console.log('EDITOR SELECT NODE');
          setN(n);
        }}
        onRouteChange={(routes) => {
          console.log('EDITOR ROUTE CHANGE');
          setR(routes);
        }}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
        diffSchemas={{
          '1': schemas.googleDirectionsNew,
          '2': schemas.googleDirectionsOld,
        }}
      />
    );
  }, [currentSchema, setCurrentSchema]);

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
        onClick={() => setN('1dde4cbc7c784a')}
        style={{
          ...buttonStyle,
        }}
      >
        select node
      </div>
      <div
        onClick={() => setN(undefined)}
        style={{
          ...buttonStyle,
          backgroundColor: Colors.orange,
          right: '130px',
        }}
      >
        deselect node
      </div>
      {memoedEditor}
    </div>
  );
};

googleState.description =
  'Google Directions GraphQL Schema. Contains diffs and router.';
