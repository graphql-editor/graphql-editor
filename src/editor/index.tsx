import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  NavigationStateProvider,
  IOStateProvider,
  ThemeProvider,
} from '@/state/containers';

export const GraphQLEditor = (props: EditorProps) => {
  return (
    <TreesStateProvider>
      <ErrorsStateProvider>
        <NavigationStateProvider>
          <IOStateProvider>
            <ThemeProvider>
              <Editor {...props} />
            </ThemeProvider>
          </IOStateProvider>
        </NavigationStateProvider>
      </ErrorsStateProvider>
    </TreesStateProvider>
  );
};
