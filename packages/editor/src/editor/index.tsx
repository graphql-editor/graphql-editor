import React from 'react';
import { Editor, EditorProps } from './Editor';
import {
  TreesStateProvider,
  ErrorsStateProvider,
  ThemeProvider,
  RelationsProvider,
  RelationNodesProvider,
} from '@/state/containers';
import { ThemeProvider as ScThemeProvider } from '@emotion/react';
import { LayoutStateProvider } from '@/state/containers/layout';
import { SortStateProvider } from '@/state/containers/sort';
import { GqlEditor, GqlEditorProps } from '@/editor/GqlEditor';
import { MainTheme } from '@/gshared/theme/MainTheme';
import { RouterProvider, EditorRoutes } from '@/state/containers/router';
import { EmbeddedEditor, EmbeddedEditorProps } from '@/editor/EmbeddedEditor';
import { themeColors } from '@aexol-studio/styling-system';

export const GraphQLEditor = ({ ...props }: EditorProps) => {
  const baseITheme = themeColors('graphqleditor', 'dark');
  const combinedTheme = {
    ...MainTheme,
    ...baseITheme,
  };
  const theme = props.theme || combinedTheme;
  return (
    <ThemeProvider initialState={theme}>
      <RouterProvider>
        <ErrorsStateProvider>
          <TreesStateProvider>
            <RelationsProvider>
              <SortStateProvider>
                <LayoutStateProvider>
                  <RelationNodesProvider>
                    <ScThemeProvider theme={theme}>
                      <Editor {...props} />
                    </ScThemeProvider>
                  </RelationNodesProvider>
                </LayoutStateProvider>
              </SortStateProvider>
            </RelationsProvider>
          </TreesStateProvider>
        </ErrorsStateProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};

export const EmbeddedGraphQLEditor = ({ ...props }: EmbeddedEditorProps) => {
  const baseITheme = themeColors('graphqleditor', 'dark');
  const combinedTheme = {
    ...MainTheme,
    ...baseITheme,
  };
  const theme = props.theme || combinedTheme;
  return (
    <ThemeProvider initialState={theme}>
      <RouterProvider>
        <ErrorsStateProvider>
          <TreesStateProvider>
            <RelationsProvider>
              <SortStateProvider>
                <LayoutStateProvider>
                  <RelationNodesProvider>
                    <ScThemeProvider theme={theme}>
                      <EmbeddedEditor {...props} />
                    </ScThemeProvider>
                  </RelationNodesProvider>
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
  const baseITheme = themeColors('graphqleditor', 'dark');
  const combinedTheme = {
    ...MainTheme,
    ...baseITheme,
  };
  const theme = props.theme || combinedTheme;

  return (
    <ThemeProvider initialState={theme}>
      <RouterProvider>
        <ErrorsStateProvider>
          <TreesStateProvider>
            <SortStateProvider>
              <LayoutStateProvider>
                <ScThemeProvider theme={theme}>
                  <GqlEditor {...props} />
                </ScThemeProvider>
              </LayoutStateProvider>
            </SortStateProvider>
          </TreesStateProvider>
        </ErrorsStateProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};
export { EditorRoutes };
