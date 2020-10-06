import React from 'react';
import { Editor, EditorProps } from './Editor';
import { TreesStateProvider, ErrorsStateProvider, NavigationStateProvider, IOStateProvider } from '@/state/containers';

export const GraphQLEditor = (props: EditorProps) => {
  return (
    <TreesStateProvider>
      <ErrorsStateProvider>
        <NavigationStateProvider>
          <IOStateProvider>
            <Editor {...props} />
          </IOStateProvider>
        </NavigationStateProvider>
      </ErrorsStateProvider>
    </TreesStateProvider>
  );
};
