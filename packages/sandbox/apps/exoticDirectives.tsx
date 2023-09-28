import React, { useState } from "react";
import { PassedSchema, GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";

export const exoticDirectives = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.exoticDirectives,
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
        path="exotic"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

exoticDirectives.description =
  "Editor should work and show warnings for exotic directives";
