import React from 'react';
import { Editor, EditorProps } from './Editor';
import { TreesStateProvider, ErrorsStateProvider } from '@/state/containers';

export const GraphQLEditor = (props: EditorProps) => {
  return (
    <TreesStateProvider>
      <ErrorsStateProvider>
        <Editor {...props} />
      </ErrorsStateProvider>
    </TreesStateProvider>
  );
};
