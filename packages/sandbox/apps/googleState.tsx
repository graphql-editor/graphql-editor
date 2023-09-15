import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GraphQLEditor,
  ExternalEditorAPI,
  Colors,
  PassedSchema,
  EditorRoutes,
} from "graphql-editor";
import * as schemas from "../schema";

const buttonStyle = {
  position: "absolute",
  zIndex: 33,
  top: "65px",
  right: "15px",
  padding: "10px",
  color: "#ffffff",
  cursor: "pointer",
  borderRadius: 4,
  backgroundColor: Colors.blue,
} as const;

export const googleState = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.billabeeSchema,
    libraries: "",
    source: "outside",
  });
  const [r, setR] = useState<EditorRoutes>({ code: "on", pane: "docs" });
  const [n, setN] = useState<string>("1392b05ce2df54");

  const editorRef = useRef<ExternalEditorAPI>();

  useEffect(() => {
    editorRef.current.selectNode(n);
  }, [n]);

  useEffect(() => {
    editorRef.current.route(r);
  }, [r]);

  const memoedEditor = useMemo(() => {
    return (
      <GraphQLEditor
        path="google-directions"
        schema={currentSchema}
        ref={editorRef}
        onNodeSelect={(n) => {
          console.log(n);
          setN(n);
        }}
        onRouteChange={(routes) => {
          setR(routes);
        }}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
      />
    );
  }, [currentSchema, setCurrentSchema]);

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "stretch",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        onClick={() => setN("1dde4cbc7c784a")}
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
          right: "130px",
        }}
      >
        deselect node
      </div>
      {memoedEditor}
    </div>
  );
};

googleState.description =
  "Google Directions GraphQL Schema. Contains diffs and router.";
