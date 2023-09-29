import React, { useRef } from "react";
import * as schemas from "../schema";
import { ExternalEditorAPI, GraphQLSdlCodeDisplay } from "graphql-editor";

export const justcode = () => {
  const ref = useRef<ExternalEditorAPI>(null);
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
      <GraphQLSdlCodeDisplay
        path="googlediff"
        ref={ref}
        schema={{ code: schemas.exoticDirectives, source: "outside" }}
      />
    </div>
  );
};

justcode.description = "Google Directions GraphQL Schema, SDL Editor only";
