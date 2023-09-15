import React, { useState } from "react";
import { PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
import { GraphQLEditor } from "graphql-editor";

export const VeryLongSchema = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.VeryLongSchema,
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
        path="verlong"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

VeryLongSchema.description = "GraphQL schema of a very big service.";
