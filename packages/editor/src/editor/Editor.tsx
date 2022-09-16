import React, { useEffect } from 'react';
import { Menu } from './menu/Menu';
import { CodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { ParserTree } from 'graphql-js-tree';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import {
  useErrorsState,
  useTreesState,
  useTheme,
  VisualStateProvider,
  useLayoutState,
} from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { DiffEditor } from '@/DiffEditor';
import { Relation } from '@/Relation/Relation';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { Docs } from '@/Docs/Docs';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { useRouter, EditorRoutes } from '@/state/containers/router';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) =>
    `${theme.background.mainClose} ${theme.background.mainFurthest}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.background.mainClose};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.background.mainClose};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background.mainFurthest};
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
  background: ${({ theme }) => theme.background.mainFurthest};
`;

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow: ${({ isOverflow }) => isOverflow && 'auto'};
`;

export interface EditorProps extends Theming {
  // Code in editor is readonly
  readonly?: boolean;
  // Code and libraries
  schema: PassedSchema;
  // force expand/hide sidebar
  sidebarExpanded?: boolean;
  // Record containing graphql schemas with "name" as a key and graphql schema as a "value"
  diffSchemas?: Record<string, string>;
  // Function to be called when schema is set by the editor
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  // Function that could be fired if tree changes
  onTreeChange?: (tree: ParserTree) => void;
  // Editor theme
  theme?: EditorTheme;
  // Override current route
  routeState?: EditorRoutes;
  // listen to route changes. Don't bind it with routeState though! You will get Maximum depth exceeded
  onRouteChange?: (r: EditorRoutes) => void;
}

export const Editor = ({
  schema = {
    code: '',
    libraries: '',
  },
  setSchema,
  diffSchemas,
  onTreeChange,
  readonly: editorReadOnly,
  theme,
  sidebarExpanded,
  routeState,
  onRouteChange,
}: EditorProps) => {
  const { setTheme } = useTheme();
  const {
    grafErrors,
    setGrafErrors,
    setLockGraf,
    setLockCode,
    setGrafEditorErrors,
    setGrafErrorSchema,
  } = useErrorsState();
  const {
    tree,
    libraryTree,
    setTree,
    setSnapshots,
    setUndos,
    setLibraryTree,
    setReadonly,
    schemaType,
    generateTreeFromSchema,
    selectedNode,
    setSelectedNode,
    readonly,
  } = useTreesState();
  const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } =
    useSortState();
  const { setSidebarSize, sidebarSize } = useLayoutState();
  const { routes, set, initialRoutingDone, setInitialRoutingDone } =
    useRouter();
  const selectedNodeFromQuery = routes.n;
  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };
  useEffect(() => {
    if (!selectedNodeFromQuery) {
      setInitialRoutingDone(true);
      return;
    }
    if (
      selectedNodeFromQuery === selectedNode?.field?.id ||
      initialRoutingDone
    ) {
      return;
    }
    const field = tree.nodes
      .concat(libraryTree.nodes)
      .find((n) => n.id === selectedNodeFromQuery);
    if (field) {
      setSelectedNode({
        source: 'routing',
        field,
      });
      setInitialRoutingDone(true);
    }
    if (!field && tree.nodes.length > 0 && libraryTree.nodes.length > 0) {
      setInitialRoutingDone(true);
    }
  }, [tree, libraryTree, selectedNodeFromQuery, initialRoutingDone]);

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
    if (schemaType === 'library') {
      setReadonly(true);
      return;
    }
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly, schemaType]);

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
      setSchema({ ...schema, isTree: true, code: '' });
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
                ].join('\n\n');
                setGrafErrors(msg);
                setGrafEditorErrors(errors);
                setGrafErrorSchema(graphql);
                setLockCode(msg);
                return;
              }
              setLockCode(undefined);
              setGrafErrors(undefined);
              setGrafEditorErrors([]);
              setSchema({ ...schema, code: graphql, isTree: true });
            },
          );
        }
      });
    } catch (error) {
      const msg = (error as any).message;
      setLockCode(msg);
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
    if (tree.initial || selectedNode?.source === 'routing') {
      return;
    }
    set({
      n: selectedNode?.field?.id,
    });
  }, [selectedNode]);

  useEffect(() => {
    if (routeState) {
      set(routeState);
    }
  }, [routeState]);

  useEffect(() => {
    if (onRouteChange) {
      onRouteChange(routes);
    }
  }, [routes, onRouteChange]);

  return (
    <Main
      data-cy={GraphQLEditorDomStructure.tree.editor}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <Menu
        toggleCode={routes.code === 'on'}
        sidebarExpanded={sidebarExpanded}
        setToggleCode={(e) =>
          set({
            ...routes,
            code: routes.code === 'off' ? 'on' : 'off',
          })
        }
        activePane={routes.pane}
        excludePanes={diffSchemas ? undefined : ['diff']}
        setActivePane={(p) => {
          const newState: typeof routes = { ...routes, pane: p };
          set(newState);
        }}
      />
      {routes.code === 'on' && routes.pane !== 'diff' && (
        <DynamicResize
          enable={{ right: true }}
          disabledClass={!routes.pane ? 'full-screen-container' : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={!routes.pane ? '100%' : sidebarSize}
        >
          <Sidebar
            className={!routes.pane ? 'full-screen-container' : undefined}
            data-cy={GraphQLEditorDomStructure.tree.sidebar.name}
          >
            <CodePane
              size={!routes.pane ? 100000 : sidebarSize}
              onChange={(v, isInvalid) => {
                if (isInvalid) {
                  setLockGraf(isInvalid);
                  return;
                }
                setSchema({ ...schema, code: v, isTree: false }, !!isInvalid);
              }}
              schema={
                schema.libraries && schemaType === 'library'
                  ? schema.libraries
                  : schema.code
              }
              fullScreen={!routes.pane}
              libraries={schemaType === 'library' ? '' : schema.libraries}
              readonly={readonly}
            />
          </Sidebar>
        </DynamicResize>
      )}
      {routes.pane === 'diagram' && (
        <ErrorOuterContainer isOverflow>
          <VisualStateProvider>
            <Graf />
          </VisualStateProvider>
        </ErrorOuterContainer>
      )}
      {routes.pane === 'relation' && (
        <ErrorOuterContainer>
          <VisualStateProvider>
            <Relation />
          </VisualStateProvider>
        </ErrorOuterContainer>
      )}
      {routes.pane === 'docs' && (
        <ErrorOuterContainer>
          <Docs />
        </ErrorOuterContainer>
      )}
      {routes.pane === 'diff' && diffSchemas && (
        <DiffEditor schemas={diffSchemas} />
      )}
    </Main>
  );
};
