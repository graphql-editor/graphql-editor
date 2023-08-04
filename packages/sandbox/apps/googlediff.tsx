import React, { useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";
import { PassedSchema } from "graphql-editor";

export const googlediff = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
    libraries: "",
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
        path="googlediff"
        schema={currentSchema}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
        diffSchemas={[
          { name: "new schema", content: schemas.googleDirectionsNew },
          { content: schemas.googleDirectionsOld, name: "Old schema" },
        ]}
      />
    </div>
  );
};

googlediff.description = "Google Directions GraphQL Schema.";
