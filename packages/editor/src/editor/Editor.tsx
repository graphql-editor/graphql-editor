import React, { useEffect, useImperativeHandle } from "react";
import { Menu } from "./menu/Menu";
import { CodePane, CodePaneApi, CodePaneProps, DiffSchema } from "./code";
import { PassedSchema } from "@/Models";
import { DynamicResize } from "./code/Components";
import { ParserTree } from "graphql-js-tree";
import { GraphQLEditorWorker } from "graphql-editor-worker";
import {
  useErrorsState,
  useTreesState,
  useTheme,
  useLayoutState,
} from "@/state/containers";

import { DiffEditor } from "@/DiffEditor";
import { Relation } from "@/Relation/Relation";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import { Docs } from "@/Docs/Docs";
import { useSortState } from "@/state/containers/sort";
import styled from "@emotion/styled";
import { useRouter, EditorRoutes } from "@/state/containers/router";
import { ErrorsList } from "@/shared/errors/ErrorsList";
import { NodeNavigation } from "@/shared/NodeNavigation";
import type * as monaco from "monaco-editor";
import { FileTree, FTree } from "@/editor/files/FileTree";
import { BackgroundFTUXNoFileSelected } from "@/Relation/FTUX/BackgroundFTUXNoFileSelected";

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) =>
    `${theme.neutrals.L5} ${theme.neutrals.L6}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutrals.L6};
  }

  .full-screen-container {
    flex: 1;
    align-self: stretch;
    height: 100%;
  }
`;

const Sidebar = styled.div`
  align-self: stretch;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.neutrals.L6};
`;

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && "auto"};
  overflow-x: hidden;
`;

export interface EditorProps
  extends Pick<CodePaneProps, "onContentChange" | "onEditorMount"> {
  // Code in editor is readonly
  readonly?: boolean;
  // Code and libraries
  schema: PassedSchema;
  leafs?: {
    schemas: FTree[];
    onClick: (t: FTree) => void;
    onCopy: (t: FTree) => void;
    onPaste: (t: FTree) => void;
    onRename: (oldTree: FTree, newTree: FTree) => void;
    onDelete: (t: FTree) => void;
    onAdd: (t: FTree) => void;
    onMove: (source: FTree, target: FTree) => void;
    current?: string;
    copiedFile: string;
    schemasLabel?: string;
  };
  // force expand/hide sidebar
  // schemas to compare usually latest its the first schema second one is compared
  diffSchemas?: [DiffSchema, DiffSchema];
  // Function to be called when schema is set by the editor
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  // Function that could be fired if tree changes
  onTreeChange?: (tree: ParserTree) => void;
  // Editor theme
  theme?: EditorTheme;
  // listen to route changes. Don't bind it with routeState though! You will get Maximum depth exceeded
  onRouteChange?: (r: EditorRoutes) => void;
  onNodeSelect?: (selectedNodeId?: string) => void;
  // name of the schema file
  path: string;
  title?: React.ReactNode;
  // Editor custom fonts without whole theme needed to be passed
  fontFamily?: string;
  fontFamilySans?: string;
  disableExport?: boolean;
  disableImport?: boolean;
  disableCodePaneContextMenu?: boolean;
}

export interface ExternalEditorAPI {
  selectNode: (selectedNodeId?: string) => void;
  route: (r: EditorRoutes) => void;
  currentRoute: EditorRoutes;
  receive: (change: monaco.editor.IModelContentChangedEvent) => void;
}

export const Editor = React.forwardRef<ExternalEditorAPI, EditorProps>(
  (
    {
      schema = {
        code: "",
        libraries: "",
        source: "outside",
      },
      setSchema,
      diffSchemas,
      onTreeChange,
      path,
      readonly: editorReadOnly,
      theme,
      onRouteChange,
      onNodeSelect,
      onContentChange,
      title,
      disableExport,
      disableImport,
      onEditorMount,
      leafs,
      disableCodePaneContextMenu,
    },
    ref
  ) => {
    const { setTheme } = useTheme();
    const { codeErrors, errorsItems, setCodeErrors } = useErrorsState();
    const {
      tree,
      setTree,
      setSnapshots,
      setUndos,
      setLibraryTree,
      setReadonly,
      generateTreeFromSchema,
      readonly,
      allNodes,
      selectedNodeId,
      setSelectedNodeId,
    } = useTreesState();
    const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } =
      useSortState();
    const { setSidebarSize, sidebarSize } = useLayoutState();
    const { routes, set } = useRouter();

    const codePaneApi: React.ForwardedRef<CodePaneApi> = React.createRef();

    const reset = () => {
      setSnapshots([]);
      setUndos([]);
      setCodeErrors([]);
    };

    useImperativeHandle(
      ref,
      () => ({
        selectNode: (nId) => {
          if (nId === selectedNodeId?.value?.id) return;
          const n = allNodes.nodes.find((an) => an.id === nId);
          setSelectedNodeId({
            source: "routing",
            value: nId
              ? {
                  id: nId,
                  name: n?.name || "",
                }
              : undefined,
            justCreated: selectedNodeId?.justCreated,
          });
        },
        route: (routes) => {
          set({
            ...routes,
          });
        },
        receive: (e) => {
          codePaneApi.current?.receive(e);
        },
        currentRoute: routes,
      }),
      [set, setSelectedNodeId, allNodes, codePaneApi, routes]
    );
    useEffect(() => {
      if (
        onNodeSelect &&
        selectedNodeId &&
        selectedNodeId.source !== "routing"
      ) {
        onNodeSelect(selectedNodeId?.value?.id);
      }
    }, [selectedNodeId?.value?.id]);

    useEffect(() => {
      isSortAlphabetically &&
        !isUserOrder &&
        setTree({
          nodes: tree.nodes.sort(sortByTypes),
        });
    }, [isSortAlphabetically, orderTypes]);

    useEffect(() => {
      if (theme) {
        setTheme(theme);
      }
    }, [theme]);

    useEffect(() => {
      setReadonly(!!editorReadOnly);
    }, [editorReadOnly]);

    useEffect(() => {
      if (schema.libraries) {
        GraphQLEditorWorker.generateTree({
          schema: schema.libraries,
          cutSchemaDefinition: true,
        }).then(setLibraryTree);
      } else {
        setLibraryTree({ nodes: [] });
      }
      reset();
    }, [schema.libraries]);

    useEffect(() => {
      if (!tree || !!tree.schema) {
        return;
      }
      if (tree.nodes.length === 0) {
        if (tree.initial) {
          return;
        }
        setSchema({ ...schema, source: "tree", code: "" });
        return;
      }
      try {
        GraphQLEditorWorker.generateCode(tree).then((graphql) => {
          if (graphql !== schema.code) {
            GraphQLEditorWorker.validate(graphql, schema.libraries).then(
              (errors) => {
                setCodeErrors(errors);
                setSchema({ ...schema, code: graphql, source: "tree" });
              }
            );
          }
        });
      } catch (error) {
        const msg = (error as Error).message;
        setCodeErrors([{ text: msg, __typename: "global" }]);
        return;
      }
      onTreeChange?.(tree);
    }, [tree]);

    useEffect(() => {
      if (schema.source === "tree") {
        return;
      }
      generateTreeFromSchema(schema);
    }, [schema]);

    useEffect(() => {
      if (onRouteChange && routes.source === "internal") {
        onRouteChange({
          ...routes,
        });
      }
    }, [routes.code, routes.pane]);

    const leafSchemaSelected = leafs ? !!leafs.current : true;

    return (
      <Main
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
          }
        }}
      >
        {!!leafs && routes.files !== "off" && <FileTree {...leafs} />}
        {leafSchemaSelected ? (
          <>
            <Menu
              schema={schema.code}
              libraries={schema.libraries}
              path={path}
              toggleCode={routes.code === "on"}
              setSchema={setSchema}
              readOnly={readonly}
              toggleFiles={routes.files !== "off"}
              setToggleFiles={
                leafs
                  ? () =>
                      set(
                        {
                          ...routes,
                          files: routes.files === "off" ? undefined : "off",
                          source: "internal",
                        },
                        "internal"
                      )
                  : undefined
              }
              setToggleCode={() =>
                set(
                  {
                    ...routes,
                    code: routes.code === "off" ? "on" : "off",
                    source: "internal",
                  },
                  "internal"
                )
              }
              activePane={routes.pane}
              excludePanes={diffSchemas ? undefined : ["diff"]}
              setActivePane={(p) => {
                const newState: typeof routes = { ...routes, pane: p };
                set(newState, "internal");
              }}
              disableExport={disableExport}
              disableImport={disableImport}
            />
            {routes.pane !== "diff" && (
              <DynamicResize
                enable={{ right: true }}
                disabledClass={
                  !routes.pane ? "full-screen-container" : undefined
                }
                resizeCallback={(e, r, c) => {
                  setSidebarSize(c.getBoundingClientRect().width);
                }}
                width={
                  !routes.pane ? "100%" : routes.code === "on" ? sidebarSize : 0
                }
              >
                <Sidebar
                  className={!routes.pane ? "full-screen-container" : undefined}
                >
                  <CodePane
                    size={
                      !routes.pane
                        ? 100000
                        : routes.code === "on"
                        ? sidebarSize
                        : 0
                    }
                    onChange={(v, passGraphValidation) => {
                      setSchema({
                        ...schema,
                        code: v,
                        source: "code",
                        passGraphValidation,
                      });
                    }}
                    onEditorMount={onEditorMount}
                    ref={codePaneApi}
                    onContentChange={onContentChange}
                    schema={schema}
                    fullScreen={!routes.pane}
                    readonly={readonly}
                    disableCodePaneContextMenu={disableCodePaneContextMenu}
                  />
                </Sidebar>
              </DynamicResize>
            )}
            {(routes.pane === "relation" || routes.pane === "docs") && (
              <ErrorOuterContainer>
                {routes.pane === "relation" && (
                  <Relation
                    title={title}
                    setInitialSchema={(s) =>
                      setSchema({
                        code: s,
                        libraries: schema.libraries,
                        source: "outside",
                      })
                    }
                    schema={schema.code}
                  />
                )}
                {routes.pane === "docs" && <Docs />}
                <NodeNavigation
                  isCollapsed={routes.navigationCollapsed}
                  setIsCollapsed={(collapsed) => {
                    set({
                      ...routes,
                      navigationCollapsed: collapsed,
                    });
                  }}
                />
                {!!codeErrors.length &&
                  (routes.pane === "docs" || routes.pane === "relation") && (
                    <ErrorsList>{errorsItems}</ErrorsList>
                  )}
              </ErrorOuterContainer>
            )}
            {routes.pane === "diff" && diffSchemas && (
              <DiffEditor schemas={diffSchemas} />
            )}
          </>
        ) : (
          <BackgroundFTUXNoFileSelected
            onStartCoding={() => {
              const mainDirSchemaFileName = "schema.graphql";
              const doesSchemaAlreadyExist = leafs?.schemas.find(
                (el) => el.dir === mainDirSchemaFileName
              );
              if (doesSchemaAlreadyExist) {
                const numberOfGraphqlFiles = leafs?.schemas.filter(
                  (el) =>
                    !el.dir.includes("/") &&
                    !el.isFolder &&
                    el.dir.includes(".graphql")
                ).length;
                leafs?.onAdd({
                  dir: `schema_${numberOfGraphqlFiles || 0 + 1}.graphql`,
                });
              } else {
                leafs?.onAdd({ dir: mainDirSchemaFileName });
              }
            }}
          />
        )}
      </Main>
    );
  }
);
Editor.displayName = "Editor";
