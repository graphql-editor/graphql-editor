import React, { useState } from "react";
import { PassedSchema, GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";

export const limitSupportedNodes = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.billabeeSchema,
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
        path="billabee"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
        numberOfSupportedNodes={20}
      />
    </div>
  );
};

limitSupportedNodes.description =
  "Part schema of a big delivery service Deliverer with limited supported number of Nodes";
