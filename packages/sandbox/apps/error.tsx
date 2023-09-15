import React, { useState } from "react";
import { GraphQLEditor, PassedSchema } from "graphql-editor";
import * as schemas from "../schema";

export const error = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.errorSchema,
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
        path="error"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

error.description = "GraphQL schema that contains errors.";
