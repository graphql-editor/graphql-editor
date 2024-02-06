import React, { useEffect, useMemo, useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import { ExternalEditorAPI } from "graphql-editor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import type * as monaco from "monaco-editor";
const initial = `
type Person{
  name: String!
  age: Int
  firstName: String
  lastName:String
}
`;

export const LiveSocketTest = () => {
  const [e, setE] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: initial,
    libraries: "",
    source: "outside",
  });

  const author = useMemo(() => Math.random().toString(16), []);
  const liveEditorApi: React.ForwardedRef<ExternalEditorAPI> =
    React.createRef();
  useEffect(() => {
    liveEditorApi.current.route({ code: "on" });
    if (e) {
      console.log("AIMHERE");
      const ydoc = new Y.Doc();
      const provider = new WebsocketProvider(
        "wss://localhost:3030",
        "monaco",
        ydoc
      );
      const type = ydoc.getText("monaco");

      const monacoBinding = new MonacoBinding(
        type,
        e.getModel(),
        new Set([e]),
        provider.awareness
      );
      provider.connect();

      return () => {
        monacoBinding.destroy();
        provider.destroy();
      };
    }
  }, [author, e]);
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
      <GraphQLEditor
        path="collab"
        onEditorMount={(editor) => {
          console.log("SET EDITOR");
          setE(editor);
        }}
        onContentChange={() => {
          //nope
        }}
        ref={liveEditorApi}
        schema={currentSchema}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
      />
    </div>
  );
};

LiveSocketTest.description =
  "Schema to test live collaboration in code editor and graph using socket-live-test. Run npm run socket first to use it";
