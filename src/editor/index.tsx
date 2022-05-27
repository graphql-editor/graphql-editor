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
import { SortStateProvider } from '@/state/containers/sort';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  return (
    <ThemeProvider initialState={props.theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <SortStateProvider>
            <NavigationStateProvider>
              <LayoutStateProvider>
                <IOStateProvider>
                  <Editor {...props} />
                </IOStateProvider>
              </LayoutStateProvider>
            </NavigationStateProvider>
          </SortStateProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
};
