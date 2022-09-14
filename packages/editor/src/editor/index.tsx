import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  IOStateProvider,
  ThemeProvider,
  RelationsProvider,
} from '@/state/containers';
import { ThemeProvider as ScThemeProvider } from '@emotion/react';
import { LayoutStateProvider } from '@/state/containers/layout';
import { SortStateProvider } from '@/state/containers/sort';
import { GqlEditor, GqlEditorProps } from '@/editor/GqlEditor';
import { MainTheme } from '@/gshared/theme/MainTheme';
import { RouterProvider, EditorRoutes } from '@/state/containers/router';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  const theme = props.theme || MainTheme;
  return (
    <ThemeProvider initialState={theme}>
      <RouterProvider>
        <ErrorsStateProvider>
          <TreesStateProvider>
            <RelationsProvider>
              <SortStateProvider>
                <LayoutStateProvider>
                  <IOStateProvider>
                    <ScThemeProvider theme={theme}>
                      <Editor {...props} />
                    </ScThemeProvider>
                  </IOStateProvider>
                </LayoutStateProvider>
              </SortStateProvider>
            </RelationsProvider>
          </TreesStateProvider>
        </ErrorsStateProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};

export const GraphQLGqlEditor = ({ ...props }: GqlEditorProps) => {
  const theme = props.theme || MainTheme;

  return (
    <ThemeProvider initialState={theme}>
      <RouterProvider>
        <ErrorsStateProvider>
          <TreesStateProvider>
            <SortStateProvider>
              <LayoutStateProvider>
                <IOStateProvider>
                  <ScThemeProvider theme={theme}>
                    <GqlEditor {...props} />
                  </ScThemeProvider>
                </IOStateProvider>
              </LayoutStateProvider>
            </SortStateProvider>
          </TreesStateProvider>
        </ErrorsStateProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};
export { EditorRoutes };
