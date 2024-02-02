import React, { useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";

export const Pure = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: "",
    libraries: "",
    source: "outside",
  });
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
        path="Pure"
        setSchema={(props) => {
          setMySchema({
            ...props,
          });
        }}
        schema={mySchema}
        disableImport
        disableExport
      />
    </div>
  );
};
Pure.description = "Empty GraphQL Schema.";
