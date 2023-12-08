import React from "react";
import { Editor, EditorProps, ExternalEditorAPI } from "./Editor";
import {
  TreesStateProvider,
  ErrorsStateProvider,
  ThemeProvider,
  RelationsProvider,
  RelationNodesProvider,
  useErrorsState,
} from "@/state/containers";
import { ThemeProvider as ScThemeProvider } from "@emotion/react";
import { LayoutStateProvider } from "@/state/containers/layout";
import { SortStateProvider } from "@/state/containers/sort";
import { GqlEditor, GqlEditorProps } from "@/editor/GqlEditor";
import { MainTheme } from "@/gshared/theme/MainTheme";
import { RouterProvider, EditorRoutes } from "@/state/containers/router";
import { EmbeddedEditor, EmbeddedEditorProps } from "@/editor/EmbeddedEditor";
import { themeColors, ToastsProvider } from "@aexol-studio/styling-system";
import { CodePane, CodePaneApi, CodePaneProps } from "@/editor/code";
import { ErrorsList } from "@/shared/errors/ErrorsList";

export { ExternalEditorAPI };

export { DiffSchema } from "@/editor/code/DiffEditorPane";

export const GraphQLEditor = React.forwardRef<ExternalEditorAPI, EditorProps>(
  ({ ...props }, ref) => {
    const baseITheme = themeColors("graphqleditor", "dark");
    const combinedTheme = {
      ...MainTheme,
      ...baseITheme,
      ...(props.fontFamily && { fontFamily: props.fontFamily }),
      ...(props.fontFamilySans && { fontFamilySans: props.fontFamilySans }),
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
                        <ToastsProvider>
                          <Editor {...props} ref={ref} />
                        </ToastsProvider>
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
  }
);

export const EmbeddedGraphQLEditor = ({ ...props }: EmbeddedEditorProps) => {
  const baseITheme = themeColors("graphqleditor", "dark");
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
                      <ToastsProvider>
                        <EmbeddedEditor {...props} />
                      </ToastsProvider>
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
  const baseITheme = themeColors("graphqleditor", "dark");
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

const SdlEditor = React.forwardRef<CodePaneApi, CodePaneProps>((props, ref) => {
  const { errorsItems } = useErrorsState();
  return (
    <>
      <CodePane {...props} ref={ref} />
      {!!errorsItems?.length && <ErrorsList>{errorsItems}</ErrorsList>}
    </>
  );
});

export const GraphQLSdlCodeDisplay = React.forwardRef<
  CodePaneApi,
  Pick<EditorProps, "path" | "schema" | "theme">
>(({ ...props }, ref) => {
  const baseITheme = themeColors("graphqleditor", "dark");
  const combinedTheme = {
    ...MainTheme,
    ...baseITheme,
  };
  const theme = props.theme || combinedTheme;
  return (
    <ThemeProvider initialState={theme}>
      <ErrorsStateProvider>
        <TreesStateProvider>
          <ScThemeProvider theme={theme}>
            <ToastsProvider>
              <SdlEditor
                schema={props.schema}
                onChange={() => {
                  //noop readonly
                }}
                size={500}
                readonly
                fullScreen
                ref={ref}
              />
            </ToastsProvider>
          </ScThemeProvider>
        </TreesStateProvider>
      </ErrorsStateProvider>
    </ThemeProvider>
  );
});
export { EditorRoutes };
