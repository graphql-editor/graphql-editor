import React from "react";
import { GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";

export type SchemasVersions = [string, string];

const mockData: SchemasVersions = [
  schemas.versionedUsersLibraryLatest,
  schemas.versionedUsersLibrary01,
];
export const diff = () => {
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
        path="diff"
        schema={{ code: schemas.versionedUsersLibraryLatest }}
        setSchema={() => {}}
        diffSchemas={mockData}
      />
    </div>
  );
};

diff.description = "User Auth GraphQL Schema with diffs";
