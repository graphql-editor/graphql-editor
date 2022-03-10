import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  NavigationStateProvider,
  IOStateProvider,
  ThemeProvider,
} from '@/state/containers';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  return (
    <ThemeProvider initialState={props.theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <NavigationStateProvider>
            <IOStateProvider>
              <Editor {...props} />
            </IOStateProvider>
          </NavigationStateProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
};
