import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  NavigationStateProvider,
  IOStateProvider,
  ThemeProvider,
} from '@/state/containers';
import { LayoutStateProvider } from '@/state/containers/layout';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  return (
    <ThemeProvider initialState={props.theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <LayoutStateProvider>
            <NavigationStateProvider>
              <IOStateProvider>
                <Editor {...props} />
              </IOStateProvider>
            </NavigationStateProvider>
          </LayoutStateProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
};
