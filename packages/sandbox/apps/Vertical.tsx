import React, { useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import { verticalSchema } from "schema/vertical";

export const Vertical = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: verticalSchema,
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
      />
    </div>
  );
};
Vertical.description = "Vertical GraphQL Schema.";
