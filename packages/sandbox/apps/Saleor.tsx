import React, { useState } from "react";
import { PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
import { GraphQLEditor } from "graphql-editor";

export const Saleor = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.saleor,
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
        path="saleor"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

Saleor.description = "GraphQL schema of a big e-commerce service Saleor.";
