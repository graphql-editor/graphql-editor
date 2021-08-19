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
      <TreesStateProvider>
        <ErrorsStateProvider>
          <NavigationStateProvider>
            <IOStateProvider>
              <Editor {...props} />
            </IOStateProvider>
          </NavigationStateProvider>
        </ErrorsStateProvider>
      </TreesStateProvider>
    </ThemeProvider>
  );
};
