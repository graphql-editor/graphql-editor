import React from "react";
import { EmbeddedGraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";

export const embeddedEditor = () => {
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
      <EmbeddedGraphQLEditor
        schema={{
          code: schemas.googleDirectionsNew,
          libraries: "",
          source: "outside",
        }}
      />
    </div>
  );
};

embeddedEditor.description =
  "Embedded Editor with Google Directions Graphql Schema.";
