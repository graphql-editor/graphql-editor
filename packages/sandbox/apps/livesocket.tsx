import React, { useEffect, useMemo, useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import { ExternalEditorAPI } from "graphql-editor";
import { io } from "socket.io-client";
import type * as monaco from "monaco-editor";
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

type SocketEvent = {
  author: string;
  hash: number;
  changes: monaco.editor.IModelContentChangedEvent;
};

const initial = `
type Person{
  name: String!
  age: Int
  firstName: String
  lastName:String
}
`;
const s = io("localhost:3030");

export const LiveSocketTest = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: initial,
    libraries: "",
    source: "outside",
  });

  const author = useMemo(() => Math.random().toString(16), []);
  const liveEditorApi: React.ForwardedRef<ExternalEditorAPI> =
    React.createRef();
  useEffect(() => {
    const codeListener = s.on("code", (e) => {
      const received = e as SocketEvent;
      if (received.author !== author) {
        liveEditorApi.current?.receive(received.changes);
        return;
      }
    });
    return () => {
      codeListener.off();
    };
  }, [author, liveEditorApi]);
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
        onContentChange={(e) => {
          s.emit("code", {
            changes: e,
            author,
            hash: cyrb53(currentSchema.code),
          } as SocketEvent);
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
