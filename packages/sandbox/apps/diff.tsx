import React from 'react';
import { GraphQLEditor } from 'graphql-editor';
import * as schemas from '../schema';

export type SchemasVersions = Record<string, string>;

const mockData: SchemasVersions = {
  '1.0.31': '',
  '1.0.32': '',
  '1.0.33': schemas.versionedUsersLibraryLatest,
  '1.0.34': schemas.versionedUsersLibrary01,
};

export const diff = () => {
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
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

diff.description = 'User Auth GraphQL Schema with diffs';
