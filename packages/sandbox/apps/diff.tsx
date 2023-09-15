import React from "react";
import { DiffSchema, GraphQLEditor } from "graphql-editor";
import * as schemas from "../schema";

export type SchemasVersions = [DiffSchema, DiffSchema];

const mockData: SchemasVersions = [
  { content: schemas.versionedUsersLibrary01, name: "oldVersion" },
  { content: schemas.versionedUsersLibraryLatest, name: "latest" },
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
        schema={{
          code: schemas.versionedUsersLibraryLatest,
          source: "outside",
        }}
        setSchema={() => {}}
        diffSchemas={mockData}
      />
    </div>
  );
};

diff.description = "User Auth GraphQL Schema with diffs";
