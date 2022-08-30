import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  NavigationStateProvider,
  IOStateProvider,
  ThemeProvider,
} from '@/state/containers';
import { ThemeProvider as ScThemeProvider } from '@emotion/react';
import { LayoutStateProvider } from '@/state/containers/layout';
import { SortStateProvider } from '@/state/containers/sort';
import { GqlEditor, GqlEditorProps } from '@/editor/GqlEditor';
import { MainTheme } from '@/gshared/theme/MainTheme';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  const theme = props.theme || MainTheme;

  return (
    <ThemeProvider initialState={theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <SortStateProvider>
            <NavigationStateProvider>
              <LayoutStateProvider>
                <IOStateProvider>
                  <ScThemeProvider theme={theme}>
                    <Editor {...props} />
                  </ScThemeProvider>
                </IOStateProvider>
              </LayoutStateProvider>
            </NavigationStateProvider>
          </SortStateProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
};

export const GraphQLGqlEditor = ({ ...props }: GqlEditorProps) => {
  const theme = props.theme || MainTheme;

  return (
    <ThemeProvider initialState={theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <SortStateProvider>
            <NavigationStateProvider>
              <LayoutStateProvider>
                <IOStateProvider>
                  <ScThemeProvider theme={theme}>
                    <GqlEditor {...props} />
                  </ScThemeProvider>
                </IOStateProvider>
              </LayoutStateProvider>
            </NavigationStateProvider>
          </SortStateProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
};
