import React, { useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";
import { PassedSchema } from "graphql-editor";
import { Typography } from "@aexol-studio/styling-system";

export const googlediff = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: schemas.googleDirectionsNew,
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
        path="googlediff"
        schema={currentSchema}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
        title={
          <Typography css={{ marginLeft: 0 }}>
            https://schema.google.com/graphql
          </Typography>
        }
        diffSchemas={[
          { name: "new schema", content: schemas.googleDirectionsNew },
          { content: schemas.googleDirectionsOld, name: "Old schema" },
        ]}
      />
    </div>
  );
};

googlediff.description = "Google Directions GraphQL Schema.";
