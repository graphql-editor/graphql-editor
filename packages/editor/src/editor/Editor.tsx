import React, { useEffect, useImperativeHandle } from "react";
import { Menu } from "./menu/Menu";
import { CodePane, DiffSchema } from "./code";
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

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) =>
    `${theme.neutral[500]} ${theme.neutral[600]}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.neutral[500]};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutral[500]};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutral[600]};
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
  background: ${({ theme }) => theme.neutral[600]};
`;

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && "auto"};
  overflow-x: hidden;
`;

export interface EditorProps {
  // Code in editor is readonly
  readonly?: boolean;
  // Code and libraries
  schema: PassedSchema;
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
}

export interface ExternalEditorAPI {
  selectNode: (selectedNodeId?: string) => void;
  route: (r: EditorRoutes) => void;
}

export const Editor = React.forwardRef<ExternalEditorAPI, EditorProps>(
  (
    {
      schema = {
        code: "",
        libraries: "",
      },
      setSchema,
      diffSchemas,
      onTreeChange,
      path,
      readonly: editorReadOnly,
      theme,
      onRouteChange,
      onNodeSelect,
    }: EditorProps,
    ref
  ) => {
    const { setTheme } = useTheme();
    const {
      grafErrors,
      codeErrors,
      setGrafErrors,
      setGrafEditorErrors,
      setGrafErrorSchema,
      errorsItems,
    } = useErrorsState();
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

    const reset = () => {
      setSnapshots([]);
      setUndos([]);
      setGrafErrors(undefined);
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
      }),
      [set, setSelectedNodeId, allNodes]
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
        GraphQLEditorWorker.generateTree(schema.libraries).then(setLibraryTree);
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
        setSchema({ ...schema, isTree: true, code: "" });
        return;
      }
      try {
        GraphQLEditorWorker.generateCode(tree).then((graphql) => {
          if (graphql !== schema.code || (grafErrors?.length || 0) > 0) {
            GraphQLEditorWorker.validate(graphql, schema.libraries).then(
              (errors) => {
                if (errors.length > 0) {
                  const mapErrors = errors.map((e) => e.text);
                  const msg = [
                    ...mapErrors.filter((e, i) => mapErrors.indexOf(e) === i),
                  ].join("\n\n");
                  setGrafErrors(msg);
                  setGrafEditorErrors(errors);
                  setGrafErrorSchema(graphql);
                  return;
                }
                setGrafErrors(undefined);
                setGrafEditorErrors([]);
                setSchema({ ...schema, code: graphql, isTree: true });
              }
            );
          }
        });
      } catch (error) {
        const msg = (error as Error).message;
        setGrafErrors(msg);
        return;
      }
      onTreeChange?.(tree);
    }, [tree]);

    useEffect(() => {
      if (schema.isTree) {
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
    return (
      <Main
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
          }
        }}
      >
        <Menu
          schema={schema.code}
          libraries={schema.libraries}
          path={path}
          toggleCode={routes.code === "on"}
          setSchema={setSchema}
          readOnly={readonly}
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
        />
        {routes.code === "on" && routes.pane !== "diff" && (
          <DynamicResize
            enable={{ right: true }}
            disabledClass={!routes.pane ? "full-screen-container" : undefined}
            resizeCallback={(e, r, c) => {
              setSidebarSize(c.getBoundingClientRect().width);
            }}
            width={!routes.pane ? "100%" : sidebarSize}
          >
            <Sidebar
              className={!routes.pane ? "full-screen-container" : undefined}
            >
              <CodePane
                size={!routes.pane ? 100000 : sidebarSize}
                onChange={(v, passGraphValidation) => {
                  setSchema({
                    ...schema,
                    code: v,
                    isTree: false,
                    passGraphValidation,
                  });
                }}
                schema={schema.code}
                fullScreen={!routes.pane}
                libraries={schema.libraries}
                readonly={readonly}
              />
            </Sidebar>
          </DynamicResize>
        )}
        {(routes.pane === "relation" || routes.pane === "docs") && (
          <ErrorOuterContainer>
            {routes.pane === "relation" && <Relation />}
            {routes.pane === "docs" && <Docs />}
            <NodeNavigation />
          </ErrorOuterContainer>
        )}
        {routes.pane === "diff" && diffSchemas && (
          <DiffEditor schemas={diffSchemas} />
        )}
        {codeErrors.length && <ErrorsList>{errorsItems}</ErrorsList>}
      </Main>
    );
  }
);
Editor.displayName = "Editor";
