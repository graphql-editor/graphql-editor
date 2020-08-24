import React from 'react';
import { Editor, EditorProps } from './Editor';
import { TreesStateProvider } from '@state/containers/trees';

export const GraphQLEditor = (props: EditorProps) => {
  return (
    <TreesStateProvider>
      <Editor {...props} />
    </TreesStateProvider>
  );
};
