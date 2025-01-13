import React from "react";
import GraphQLCodeEditor from "graphql-editor/lib/GraphQLCodeEditor/GraphQLCodeEditor";
import { googleDirections } from "schema";

export const graphqlcode = () => {
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
      <GraphQLCodeEditor value={googleDirections} />
    </div>
  );
};

graphqlcode.description = "User Auth GraphQL Schema with diffs";
